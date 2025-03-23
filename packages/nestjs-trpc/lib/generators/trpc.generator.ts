import * as path from 'node:path';
import {
  ConsoleLogger,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Project, SourceFile } from 'ts-morph';
import { saveOrOverrideFile } from '../utils/ts-morph.util';
import { RouterGenerator } from './router.generator';
import { SchemaImports, TRPCContext } from '../interfaces';
import { MiddlewareGenerator } from './middleware.generator';
import type { Class } from 'type-fest';
import { ContextGenerator } from './context.generator';
import { RouterFactory } from '../factories/router.factory';
import { MiddlewareFactory } from '../factories/middleware.factory';
import { ProcedureFactory } from '../factories/procedure.factory';
import { TRPC_MODULE_CALLER_FILE_PATH } from '../trpc.constants';
import { SourceFileImportsMap } from '../interfaces/generator.interface';
import { StaticGenerator } from './static.generator';
import { ImportsScanner } from '../scanners/imports.scanner';
import {
  TYPESCRIPT_APP_ROUTER_SOURCE_FILE,
  TYPESCRIPT_PROJECT,
} from './generator.constants';
import * as process from 'node:process';

@Injectable()
export class TRPCGenerator implements OnModuleInit {
  private rootModuleImportsMap!: Map<string, SourceFileImportsMap>;
  private readonly HELPER_TYPES_OUTPUT_FILE = 'index.ts';
  private readonly HELPER_TYPES_OUTPUT_PATH = path.join(__dirname, 'types');

  @Inject(TRPC_MODULE_CALLER_FILE_PATH)
  private readonly moduleCallerFilePath!: string;

  @Inject(TYPESCRIPT_PROJECT)
  private readonly project!: Project;

  @Inject(TYPESCRIPT_APP_ROUTER_SOURCE_FILE)
  private readonly appRouterSourceFile!: SourceFile;

  @Inject(ConsoleLogger)
  private readonly consoleLogger!: ConsoleLogger;

  @Inject(StaticGenerator)
  private readonly staticGenerator!: StaticGenerator;

  @Inject(MiddlewareGenerator)
  private readonly middlewareHandler!: MiddlewareGenerator;

  @Inject(ContextGenerator)
  private readonly contextHandler!: ContextGenerator;

  @Inject(RouterGenerator)
  private readonly serializerHandler!: RouterGenerator;

  @Inject(RouterFactory)
  private readonly routerFactory!: RouterFactory;

  @Inject(ProcedureFactory)
  private readonly procedureFactory!: ProcedureFactory;

  @Inject(MiddlewareFactory)
  private readonly middlewareFactory!: MiddlewareFactory;

  @Inject(ImportsScanner)
  private readonly importsScanner!: ImportsScanner;

  onModuleInit() {
    this.consoleLogger.log('Initializing TRPC Generator...', 'TRPC Generator');
    try {
      this.rootModuleImportsMap = this.buildRootImportsMap();
      this.consoleLogger.log(
        'Root imports map built successfully',
        'TRPC Generator',
      );
    } catch (error) {
      this.consoleLogger.error(
        `Failed to build root imports map: ${error}`,
        'TRPC Generator',
      );
    }
  }

  public async generateSchemaFile(
    schemaImports?: Array<SchemaImports> | undefined,
  ): Promise<void> {
    try {
      this.consoleLogger.log(
        'Starting schema file generation...',
        'TRPC Generator',
      );
      this.consoleLogger.log(
        `Module caller file path: ${this.moduleCallerFilePath}`,
        'TRPC Generator',
      );

      const routers = this.routerFactory.getRouters();
      this.consoleLogger.log(
        `Found ${routers.length} routers`,
        'TRPC Generator',
      );

      const mappedRoutesAndProcedures = routers.map((route) => {
        const { instance, name, alias, path } = route;
        this.consoleLogger.log(
          `Processing router: ${name}, alias: ${alias}, path: ${path}`,
          'TRPC Generator',
        );

        const prototype = Object.getPrototypeOf(instance);
        const procedures = this.procedureFactory.getProcedures(
          instance,
          prototype,
        );

        this.consoleLogger.log(
          `Found ${procedures.length} procedures for router: ${name}`,
          'TRPC Generator',
        );
        return { name, path, alias, instance: { ...route }, procedures };
      });

      this.consoleLogger.log(
        'Generating static declaration...',
        'TRPC Generator',
      );
      this.staticGenerator.generateStaticDeclaration(this.appRouterSourceFile);

      if (schemaImports != null && schemaImports.length > 0) {
        this.consoleLogger.log(
          `Adding ${schemaImports.length} schema imports...`,
          'TRPC Generator',
        );
        const schemaImportNames: Array<string> = schemaImports.map(
          (schemaImport) => (schemaImport as any).name,
        );
        this.consoleLogger.log(
          `Schema import names: ${schemaImportNames.join(', ')}`,
          'TRPC Generator',
        );

        this.staticGenerator.addSchemaImports(
          this.appRouterSourceFile,
          schemaImportNames,
          this.rootModuleImportsMap,
        );
      } else {
        this.consoleLogger.log('No schema imports provided', 'TRPC Generator');
      }

      this.consoleLogger.log('Serializing routers...', 'TRPC Generator');
      const routersMetadata = this.serializerHandler.serializeRouters(
        mappedRoutesAndProcedures,
        this.project,
      );

      this.consoleLogger.log(
        'Generating routers string from metadata...',
        'TRPC Generator',
      );
      const routersStringDeclarations =
        this.serializerHandler.generateRoutersStringFromMetadata(
          routersMetadata,
        );

      this.consoleLogger.log(
        'Adding router statements to app router source file...',
        'TRPC Generator',
      );
      this.appRouterSourceFile.addStatements(/* ts */ `
        const appRouter = t.router({${routersStringDeclarations}});
        export type AppRouter = typeof appRouter;
      `);

      this.consoleLogger.log(
        'Saving app router source file...',
        'TRPC Generator',
      );
      await saveOrOverrideFile(this.appRouterSourceFile);

      this.consoleLogger.log(
        `AppRouter has been updated successfully at "./${path.relative(process.cwd(), this.appRouterSourceFile.getFilePath())}".`,
        'TRPC Generator',
      );
    } catch (error: unknown) {
      this.consoleLogger.error(
        `Failed to generate schema file: ${error}`,
        'TRPC Generator',
      );
      if (error instanceof Error) {
        this.consoleLogger.error(
          `Stack trace: ${error.stack}`,
          'TRPC Generator',
        );
      }
    }
  }

  public async generateHelpersFile(
    context?: Class<TRPCContext>,
  ): Promise<void> {
    try {
      this.consoleLogger.log(
        'Starting helpers file generation...',
        'TRPC Generator',
      );

      const middlewares = this.middlewareFactory.getMiddlewares();
      this.consoleLogger.log(
        `Found ${middlewares.length} middlewares`,
        'TRPC Generator',
      );

      const helperTypesPath = path.resolve(
        this.HELPER_TYPES_OUTPUT_PATH,
        this.HELPER_TYPES_OUTPUT_FILE,
      );
      this.consoleLogger.log(
        `Creating source file at: ${helperTypesPath}`,
        'TRPC Generator',
      );

      const helperTypesSourceFile = this.project.createSourceFile(
        helperTypesPath,
        undefined,
        { overwrite: true },
      );

      if (context != null) {
        this.consoleLogger.log(
          `Processing context: ${context.name}`,
          'TRPC Generator',
        );
        const contextImport = this.rootModuleImportsMap.get(context.name);

        if (contextImport == null) {
          this.consoleLogger.error(
            `Could not find context import declaration for: ${context.name}`,
            'TRPC Generator',
          );
          throw new Error('Could not find context import declaration.');
        }

        this.consoleLogger.log(
          `Getting context interface for: ${context.name}`,
          'TRPC Generator',
        );
        const contextType = await this.contextHandler.getContextInterface(
          contextImport.sourceFile,
          context,
        );

        helperTypesSourceFile.addTypeAlias({
          isExported: true,
          name: 'Context',
          type: contextType ?? '{}',
        });
        this.consoleLogger.log(
          'Context type alias added to helper types file',
          'TRPC Generator',
        );
      } else {
        this.consoleLogger.log('No context provided', 'TRPC Generator');
      }

      for (const middleware of middlewares) {
        this.consoleLogger.log(
          `Processing middleware: ${middleware.instance.name} from path: ${middleware.path}`,
          'TRPC Generator',
        );
        const middlewareInterface =
          await this.middlewareHandler.getMiddlewareInterface(
            middleware.path,
            middleware.instance,
            this.project,
          );

        if (middlewareInterface != null) {
          this.consoleLogger.log(
            `Adding middleware interface for: ${middlewareInterface.name}`,
            'TRPC Generator',
          );
          helperTypesSourceFile.addInterface({
            isExported: true,
            name: `${middlewareInterface.name}Context`,
            extends: ['Context'],
            properties: middlewareInterface.properties,
          });
        } else {
          this.consoleLogger.warn(
            `Could not get middleware interface for: ${middleware.instance.name}`,
            'TRPC Generator',
          );
        }
      }

      this.consoleLogger.log('Saving helper types file...', 'TRPC Generator');
      await saveOrOverrideFile(helperTypesSourceFile);

      this.consoleLogger.log(
        `Helper types has been updated successfully at "nestjs-trpc/types".`,
        'TRPC Generator',
      );
    } catch (e: unknown) {
      this.consoleLogger.error(
        `Failed to generate helpers file: ${e}`,
        'TRPC Generator',
      );
      if (e instanceof Error) {
        this.consoleLogger.error(`Stack trace: ${e.stack}`, 'TRPC Generator');
      }
    }
  }

  private buildRootImportsMap(): Map<string, SourceFileImportsMap> {
    this.consoleLogger.log(
      `Building root imports map from: ${this.moduleCallerFilePath}`,
      'TRPC Generator',
    );
    const rootModuleSourceFile = this.project.addSourceFileAtPathIfExists(
      this.moduleCallerFilePath,
    );

    if (rootModuleSourceFile == null) {
      this.consoleLogger.error(
        `Could not access root module file at: ${this.moduleCallerFilePath}`,
        'TRPC Generator',
      );
      throw new Error('Could not access root module file.');
    }

    this.consoleLogger.log(
      'Root module source file loaded, building imports map...',
      'TRPC Generator',
    );
    return this.importsScanner.buildSourceFileImportsMap(
      rootModuleSourceFile,
      this.project,
    );
  }
}

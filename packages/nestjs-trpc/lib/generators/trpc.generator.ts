import * as path from 'node:path';
import * as fs from 'node:fs';
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
    try {
      this.consoleLogger.log(
        `[TRPC Debug] Module caller file path: ${this.moduleCallerFilePath}`,
        'TRPC Generator',
      );

      if (!this.moduleCallerFilePath) {
        this.consoleLogger.warn(
          '[TRPC Debug] Module caller file path is not set. This will cause issues with imports.',
          'TRPC Generator',
        );
      } else if (!fs.existsSync(this.moduleCallerFilePath)) {
        this.consoleLogger.warn(
          `[TRPC Debug] Module caller file does not exist at: ${this.moduleCallerFilePath}`,
          'TRPC Generator',
        );
      }

      this.rootModuleImportsMap = this.buildRootImportsMap();
    } catch (error) {
      this.consoleLogger.error(
        `[TRPC Debug] Error in onModuleInit: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
        'TRPC Generator',
      );
      // Don't rethrow - we want to gracefully handle this
    }
  }

  public async generateSchemaFile(
    schemaImports?: Array<SchemaImports> | undefined,
    schemaPackageName?: string,
  ): Promise<void> {
    try {
      this.consoleLogger.log(
        '[TRPC Debug] Starting AppRouter schema generation...',
        'TRPC Generator',
      );

      // Add file path debugging
      this.consoleLogger.log(
        `[TRPC Debug] AppRouter file path: ${this.appRouterSourceFile.getFilePath()}`,
        'TRPC Generator',
      );
      this.consoleLogger.log(
        `[TRPC Debug] File exists: ${fs.existsSync(this.appRouterSourceFile.getFilePath())}`,
        'TRPC Generator',
      );
      this.consoleLogger.log(
        `[TRPC Debug] Directory exists: ${fs.existsSync(path.dirname(this.appRouterSourceFile.getFilePath()))}`,
        'TRPC Generator',
      );

      const routers = this.routerFactory.getRouters();
      this.consoleLogger.log(
        `Found ${routers.length} router(s) for schema generation`,
        'TRPC Generator',
      );

      const mappedRoutesAndProcedures = routers.map((route) => {
        const { instance, name, alias, path } = route;
        const prototype = Object.getPrototypeOf(instance);
        const procedures = this.procedureFactory.getProcedures(
          instance,
          prototype,
        );

        this.consoleLogger.log(
          `Processing router "${name}" with ${procedures.length} procedure(s)`,
          'TRPC Generator',
        );

        return { name, path, alias, instance: { ...route }, procedures };
      });

      this.consoleLogger.log(
        'Generating static declarations...',
        'TRPC Generator',
      );
      this.staticGenerator.generateStaticDeclaration(this.appRouterSourceFile);

      if (schemaImports != null && schemaImports.length > 0) {
        this.consoleLogger.log(
          `Adding ${schemaImports.length} schema import(s)...`,
          'TRPC Generator',
        );

        if (schemaPackageName) {
          this.consoleLogger.log(
            `Using schema package name: ${schemaPackageName}`,
            'TRPC Generator',
          );
        }

        const schemaImportNames: Array<string> = schemaImports.map(
          (schemaImport) => (schemaImport as any).name,
        );
        this.staticGenerator.addSchemaImports(
          this.appRouterSourceFile,
          schemaImportNames,
          this.rootModuleImportsMap,
          schemaPackageName,
        );
      }

      this.consoleLogger.log(
        'Serializing router metadata...',
        'TRPC Generator',
      );
      const routersMetadata = this.serializerHandler.serializeRouters(
        mappedRoutesAndProcedures,
        this.project,
      );

      this.consoleLogger.log(
        'Generating router string declarations...',
        'TRPC Generator',
      );
      const routersStringDeclarations =
        this.serializerHandler.generateRoutersStringFromMetadata(
          routersMetadata,
        );

      this.consoleLogger.log(
        'Adding router statements to source file...',
        'TRPC Generator',
      );
      this.appRouterSourceFile.addStatements(/* ts */ `
        const appRouter = t.router({${routersStringDeclarations}});
        export type AppRouter = typeof appRouter;
      `);

      this.consoleLogger.log(
        `Saving AppRouter to "${this.appRouterSourceFile.getFilePath()}"...`,
        'TRPC Generator',
      );
      await saveOrOverrideFile(this.appRouterSourceFile);

      this.consoleLogger.log(
        `AppRouter has been updated successfully at "./${path.relative(process.cwd(), this.appRouterSourceFile.getFilePath())}".`,
        'TRPC Generator',
      );
    } catch (error: unknown) {
      this.consoleLogger.error(
        'TRPC Generator encountered an error while generating schema file.',
        error instanceof Error ? error.stack : String(error),
        'TRPC Generator',
      );
    }
  }

  public async generateHelpersFile(
    context?: Class<TRPCContext>,
  ): Promise<void> {
    try {
      this.consoleLogger.log(
        'Starting helper types generation...',
        'TRPC Generator',
      );

      const middlewares = this.middlewareFactory.getMiddlewares();
      this.consoleLogger.log(
        `Found ${middlewares.length} middleware(s) for helper generation`,
        'TRPC Generator',
      );

      const outputPath = path.resolve(
        this.HELPER_TYPES_OUTPUT_PATH,
        this.HELPER_TYPES_OUTPUT_FILE,
      );

      this.consoleLogger.log(
        `Creating helper types source file at "${outputPath}"...`,
        'TRPC Generator',
      );

      const helperTypesSourceFile = this.project.createSourceFile(
        outputPath,
        undefined,
        { overwrite: true },
      );

      if (context != null) {
        this.consoleLogger.log(
          `Processing context type "${context.name}"...`,
          'TRPC Generator',
        );

        const contextImport = this.rootModuleImportsMap.get(context.name);

        if (contextImport == null) {
          throw new Error('Could not find context import declaration.');
        }

        const contextType = await this.contextHandler.getContextInterface(
          contextImport.sourceFile,
          context,
        );

        this.consoleLogger.log(
          'Adding Context type alias to helper file...',
          'TRPC Generator',
        );

        helperTypesSourceFile.addTypeAlias({
          isExported: true,
          name: 'Context',
          type: contextType ?? '{}',
        });
      }

      for (const middleware of middlewares) {
        this.consoleLogger.log(
          `Processing middleware "${middleware}"...`,
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
            `Adding middleware interface "${middlewareInterface.name}Context" to helper file...`,
            'TRPC Generator',
          );

          helperTypesSourceFile.addInterface({
            isExported: true,
            name: `${middlewareInterface.name}Context`,
            extends: ['Context'],
            properties: middlewareInterface.properties,
          });
        }
      }

      this.consoleLogger.log(
        `Saving helper types to "${outputPath}"...`,
        'TRPC Generator',
      );

      await saveOrOverrideFile(helperTypesSourceFile);

      this.consoleLogger.log(
        `Helper types has been updated successfully at "nestjs-trpc/types".`,
        'TRPC Generator',
      );
    } catch (e: unknown) {
      this.consoleLogger.error(
        'TRPC Generator encountered an error while generating helper file.',
        e instanceof Error ? e.stack : String(e),
        'TRPC Generator',
      );
    }
  }

  private buildRootImportsMap(): Map<string, SourceFileImportsMap> {
    try {
      this.consoleLogger.log(
        `[TRPC Debug] Building root imports map using file: ${this.moduleCallerFilePath}`,
        'TRPC Generator',
      );

      // Check if file exists before trying to add it
      if (!fs.existsSync(this.moduleCallerFilePath)) {
        this.consoleLogger.warn(
          `[TRPC Debug] Root module file does not exist at: ${this.moduleCallerFilePath}`,
          'TRPC Generator',
        );
        // Return empty map instead of throwing - this allows the app to continue
        return new Map<string, SourceFileImportsMap>();
      }

      const rootModuleSourceFile = this.project.addSourceFileAtPathIfExists(
        this.moduleCallerFilePath,
      );

      if (rootModuleSourceFile == null) {
        this.consoleLogger.error(
          `[TRPC Debug] Failed to load root module file: ${this.moduleCallerFilePath}`,
          'TRPC Generator',
        );
        // Return empty map instead of throwing
        return new Map<string, SourceFileImportsMap>();
      }

      this.consoleLogger.log(
        `[TRPC Debug] Successfully loaded root module file`,
        'TRPC Generator',
      );

      return this.importsScanner.buildSourceFileImportsMap(
        rootModuleSourceFile,
        this.project,
      );
    } catch (error) {
      this.consoleLogger.error(
        `[TRPC Debug] Error building root imports map: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
        'TRPC Generator',
      );
      // Return empty map instead of throwing
      return new Map<string, SourceFileImportsMap>();
    }
  }
}

import { ConsoleLogger, Inject, Module } from '@nestjs/common';
import { DynamicModule, OnModuleInit } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import * as fs from 'node:fs';
import * as path from 'path';

import { LOGGER_CONTEXT, TRPC_MODULE_OPTIONS } from './trpc.constants';

import { TRPCModuleOptions } from './interfaces';
import { TRPCDriver } from './trpc.driver';
import { AppRouterHost } from './app-router.host';
import { ExpressDriver, FastifyDriver } from './drivers';
import { FileScanner } from './scanners/file.scanner';
import { GeneratorModule } from './generators/generator.module';
import { FactoryModule } from './factories/factory.module';
import { ScannerModule } from './scanners/scanner.module';
import { StaticGenerator } from './generators/static.generator';

@Module({
  imports: [FactoryModule, ScannerModule],
  providers: [
    // NestJS Providers
    ConsoleLogger,

    // Drivers
    TRPCDriver,
    FastifyDriver,
    ExpressDriver,

    // Exports
    AppRouterHost,
    // Add StaticGenerator directly to make sure it gets initialized
    StaticGenerator,
  ],
  exports: [AppRouterHost],
})
export class TRPCModule implements OnModuleInit {
  @Inject(TRPC_MODULE_OPTIONS)
  private readonly options!: TRPCModuleOptions;

  @Inject(ConsoleLogger)
  private readonly consoleLogger!: ConsoleLogger;

  @Inject(HttpAdapterHost)
  private readonly httpAdapterHost!: HttpAdapterHost;

  @Inject(TRPCDriver)
  private readonly trpcDriver!: TRPCDriver;

  @Inject(AppRouterHost)
  private readonly appRouterHost!: AppRouterHost;

  static forRoot(options: TRPCModuleOptions = {}): DynamicModule {
    const imports: Array<DynamicModule> = [];

    if (options.autoSchemaFile != null) {
      // Set the environment variable for StaticGenerator to use
      process.env.TRPC_SCHEMA_FILE_PATH = options.autoSchemaFile;
      console.log(
        `[TRPC Debug] Set TRPC_SCHEMA_FILE_PATH to: ${options.autoSchemaFile}`,
      );

      // Resolve the schema output path to absolute if it's relative
      const resolvedPath = path.isAbsolute(options.autoSchemaFile)
        ? options.autoSchemaFile
        : path.resolve(process.cwd(), options.autoSchemaFile);
      console.log(`[TRPC Debug] Resolved schema output path: ${resolvedPath}`);

      // Create the directory if it doesn't exist
      try {
        const outputDir = path.dirname(resolvedPath);
        if (!fs.existsSync(outputDir)) {
          console.log(`[TRPC Debug] Creating output directory: ${outputDir}`);
          fs.mkdirSync(outputDir, { recursive: true });
        }
      } catch (error) {
        console.error(
          `[TRPC Debug] Error creating directory: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      const fileScanner = new FileScanner();
      const callerFilePath = fileScanner.getCallerFilePath();

      console.log(`[TRPC Debug] Caller file path: ${callerFilePath}`);

      // Store the caller file path in an env var for access in containers
      process.env.TRPC_MODULE_CALLER_FILE_PATH = callerFilePath;

      imports.push(
        GeneratorModule.forRoot({
          outputDirPath: options.autoSchemaFile,
          rootModuleFilePath: callerFilePath,
          schemaFileImports: options.schemaFileImports,
          context: options.context,
          schemaPackageName: options.schemaPackageName,
        }),
      );
    }

    return {
      module: TRPCModule,
      imports,
      providers: [
        { provide: TRPC_MODULE_OPTIONS, useValue: options },
        // Add StaticGenerator provider at the module level
        StaticGenerator,
      ],
      global: true, // Make the module global to ensure StaticGenerator is available everywhere
    };
  }

  async onModuleInit() {
    const httpAdapter = this.httpAdapterHost?.httpAdapter;
    if (!httpAdapter) {
      return;
    }

    this.consoleLogger.setContext(LOGGER_CONTEXT);

    await this.trpcDriver.start(this.options);

    const platformName = httpAdapter.getType();
    if (this.appRouterHost.appRouter != null) {
      this.consoleLogger.log(
        `Server has been initialized successfully using the ${platformName} driver.`,
        'TRPC Server',
      );
    }
  }
}

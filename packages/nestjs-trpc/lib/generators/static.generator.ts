import {
  ImportDeclarationStructure,
  SourceFile,
  StructureKind,
  Type,
  VariableDeclarationKind,
} from 'ts-morph';
import { ConsoleLogger, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SourceFileImportsMap } from '../interfaces/generator.interface';
import * as path from 'node:path';
import * as fs from 'fs/promises';

@Injectable()
export class StaticGenerator implements OnModuleInit {
  @Inject(ConsoleLogger)
  private readonly consoleLogger!: ConsoleLogger;

  async onModuleInit() {
    this.consoleLogger.log('StaticGenerator initializing', 'StaticGenerator');
    try {
      // Instead of calling generate, directly create the server.ts file
      await this.createServerFile();
    } catch (error) {
      this.consoleLogger.error(`StaticGenerator initialization error: ${error}`, 'StaticGenerator');
      if (error instanceof Error) {
        this.consoleLogger.error(`Stack trace: ${error.stack}`, 'StaticGenerator');
      }
    }
  }

  // New method that directly creates the server.ts file without complex logic
  private async createServerFile() {
    try {
      const schemaPath = process.env.TRPC_SCHEMA_FILE_PATH;
      
      if (!schemaPath) {
        this.consoleLogger.warn(
          'No TRPC_SCHEMA_FILE_PATH environment variable set, skipping server.ts generation',
          'StaticGenerator'
        );
        return;
      }
      
      this.consoleLogger.log(`Creating server.ts in: ${schemaPath}`, 'StaticGenerator');
      
      // Resolve absolute path
      const targetPath = path.isAbsolute(schemaPath) 
        ? schemaPath 
        : path.resolve(process.cwd(), schemaPath);
      
      this.consoleLogger.log(`Resolved target path: ${targetPath}`, 'StaticGenerator');
      
      // Create directory if it doesn't exist
      await fs.mkdir(targetPath, { recursive: true });
      
      // Create the server.ts file with corrected tRPC initialization
      const serverContent = `// This file is auto-generated by nestjs-trpc. Do not edit manually.
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
export const t = initTRPC.create();

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
`;
      
      const serverFilePath = path.join(targetPath, 'server.ts');
      this.consoleLogger.log(`Writing to: ${serverFilePath}`, 'StaticGenerator');
      
      await fs.writeFile(serverFilePath, serverContent);
      this.consoleLogger.log(`Successfully created server.ts at: ${serverFilePath}`, 'StaticGenerator');
    } catch (error) {
      this.consoleLogger.error(`Failed to create server.ts: ${error}`, 'StaticGenerator');
      if (error instanceof Error) {
        this.consoleLogger.error(`Stack trace: ${error.stack}`, 'StaticGenerator');
      }
    }
  }

  public async generate(): Promise<void> {
    try {
      this.consoleLogger.log('Beginning static file generation...', 'StaticGenerator');
      // Log environment variables to help debug
      this.consoleLogger.log(`TRPC_SCHEMA_FILE_PATH: ${process.env.TRPC_SCHEMA_FILE_PATH || 'undefined'}`, 'StaticGenerator');
      this.consoleLogger.log(`Current working directory: ${process.cwd()}`, 'StaticGenerator');
      
      await this.generateServerFile();
      this.consoleLogger.log('Static file generation completed successfully', 'StaticGenerator');
    } catch (error) {
      this.consoleLogger.error(`Error during static file generation: ${error}`, 'StaticGenerator');
      if (error instanceof Error) {
        this.consoleLogger.error(`Stack trace: ${error.stack}`, 'StaticGenerator');
      }
    }
  }

  public async generateServerFile(): Promise<void> {
    try {
      this.consoleLogger.log('Starting generateServerFile method', 'StaticGenerator');
      const options = this.getTRPCOptions();
      
      this.consoleLogger.log(`TRPC options: ${JSON.stringify(options)}`, 'StaticGenerator');
      
      if (!options || !options.autoSchemaFile) {
        this.consoleLogger.warn(
          'No autoSchemaFile option provided, skipping server.ts generation',
          'StaticGenerator',
        );
        return;
      }

      this.consoleLogger.log(
        `Generating server.ts in directory: ${options.autoSchemaFile}`,
        'Static Generator',
      );

      // Resolve the target directory
      const targetDir = this.resolveTargetDirectory(options.autoSchemaFile);
      this.consoleLogger.log(
        `Resolved target directory: ${targetDir}`,
        'Static Generator',
      );

      // Ensure the directory exists
      await this.ensureDirectoryExists(targetDir);

      // Generate the server.ts file
      const serverFilePath = path.join(targetDir, 'server.ts');
      this.consoleLogger.log(
        `Writing server.ts file to: ${serverFilePath}`,
        'Static Generator',
      );

      const serverContent = this.generateServerContent(options);
      await fs.writeFile(serverFilePath, serverContent);

      this.consoleLogger.log(
        `server.ts generated successfully at: ${serverFilePath}`,
        'Static Generator',
      );
    } catch (error) {
      this.consoleLogger.error(
        `Failed to generate server.ts: ${error}`,
        'Static Generator',
      );
      if (error instanceof Error) {
        this.consoleLogger.error(
          `Stack trace: ${error.stack}`,
          'Static Generator',
        );
      }
    }
  }

  private getTRPCOptions() {
    this.consoleLogger.log('Getting TRPC module options', 'StaticGenerator');
    try {
      // Log all environment variables to debug
      this.consoleLogger.log(`All env vars: ${JSON.stringify(process.env)}`, 'StaticGenerator');
      
      // Try to get options from multiple possible sources
      const schemaPath = process.env.TRPC_SCHEMA_FILE_PATH || 
                         process.env.TRPC_AUTO_SCHEMA_PATH || 
                         './src/trpc/generated';
      
      this.consoleLogger.log(`Using schema path: ${schemaPath}`, 'StaticGenerator');
      
      return { 
        autoSchemaFile: schemaPath,
        schemaFileImports: [] // Add default empty array
      };
    } catch (error) {
      this.consoleLogger.error(
        `Failed to get TRPC options: ${error}`,
        'StaticGenerator',
      );
      return null;
    }
  }

  private resolveTargetDirectory(autoSchemaFile: string): string {
    this.consoleLogger.log(
      `Resolving target directory for: ${autoSchemaFile}`,
      'Static Generator',
    );
    if (path.isAbsolute(autoSchemaFile)) {
      this.consoleLogger.log(
        `Using absolute path: ${autoSchemaFile}`,
        'Static Generator',
      );
      return autoSchemaFile;
    }

    const cwd = process.cwd();
    const resolved = path.resolve(cwd, autoSchemaFile);
    this.consoleLogger.log(
      `Resolved relative path ${autoSchemaFile} to absolute path: ${resolved}`,
      'Static Generator',
    );
    return resolved;
  }

  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      this.consoleLogger.log(
        `Ensuring directory exists: ${dirPath}`,
        'Static Generator',
      );
      await fs.mkdir(dirPath, { recursive: true });
      this.consoleLogger.log(
        `Directory created/verified: ${dirPath}`,
        'Static Generator',
      );
    } catch (error) {
      this.consoleLogger.error(
        `Error creating directory ${dirPath}: ${error}`,
        'Static Generator',
      );
      throw error;
    }
  }

  private generateServerContent(options: any): string {
    this.consoleLogger.log('Generating server.ts content', 'Static Generator');

    // Build imports from schema registry if available
    let importStatements = '';
    if (options.schemaFileImports && options.schemaFileImports.length > 0) {
      this.consoleLogger.log(
        `Adding ${options.schemaFileImports.length} schema imports`,
        'Static Generator',
      );
      importStatements = options.schemaFileImports
        .map(
          (importItem: any) =>
            `import { ${importItem.name} } from '${importItem.path || '../schemas'}';`,
        )
        .join('\n');
    }

    // Basic server.ts template with corrected tRPC initialization
    return `// This file is auto-generated by nestjs-trpc. Do not edit manually.
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
${importStatements}

// Initialize tRPC
export const t = initTRPC.create();

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
`;
  }

  public generateStaticDeclaration(sourceFile: SourceFile): void {
    this.consoleLogger.log(
      `Generating static declaration in file: ${sourceFile.getFilePath()}`,
      'Static Generator',
    );

    sourceFile.addImportDeclaration({
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trpc/server',
      namedImports: ['initTRPC'],
    });
    this.consoleLogger.log('Added @trpc/server import', 'Static Generator');

    sourceFile.addImportDeclaration({
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: 'zod',
      namedImports: ['z'],
    });
    this.consoleLogger.log('Added zod import', 'Static Generator');

    sourceFile.addVariableStatements([
      {
        declarationKind: VariableDeclarationKind.Const,
        declarations: [{ name: 't', initializer: 'initTRPC.create()' }],
      },
      {
        declarationKind: VariableDeclarationKind.Const,
        declarations: [{ name: 'publicProcedure', initializer: 't.procedure' }],
      },
    ]);
    this.consoleLogger.log(
      'Added variable statements for t and publicProcedure',
      'Static Generator',
    );
  }

  public addSchemaImports(
    sourceFile: SourceFile,
    schemaImportNames: Array<string>,
    importsMap: Map<string, SourceFileImportsMap>,
  ): void {
    this.consoleLogger.log(
      `Adding schema imports to file: ${sourceFile.getFilePath()}`,
      'Static Generator',
    );
    this.consoleLogger.log(
      `Schema import names: ${schemaImportNames.join(', ')}`,
      'Static Generator',
    );

    const importDeclarations: ImportDeclarationStructure[] = [];

    for (const schemaImportName of schemaImportNames) {
      this.consoleLogger.log(
        `Processing schema import: ${schemaImportName}`,
        'Static Generator',
      );
      for (const [importMapKey, importMapMetadata] of importsMap.entries()) {
        if (schemaImportName == null || importMapKey !== schemaImportName) {
          continue;
        }

        const sourceFilePath = importMapMetadata.sourceFile.getFilePath();
        this.consoleLogger.log(
          `Found import source file: ${sourceFilePath}`,
          'Static Generator',
        );

        const relativePath = path.relative(
          path.dirname(sourceFile.getFilePath()),
          sourceFilePath.replace(/\.ts$/, ''),
        );

        const moduleSpecifier = relativePath.startsWith('.')
          ? relativePath
          : `./${relativePath}`;

        this.consoleLogger.log(
          `Adding import for ${schemaImportName} from ${moduleSpecifier}`,
          'Static Generator',
        );

        importDeclarations.push({
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: moduleSpecifier,
          namedImports: [schemaImportName],
        });
      }
    }

    if (importDeclarations.length > 0) {
      sourceFile.addImportDeclarations(importDeclarations);
      this.consoleLogger.log(
        `Added ${importDeclarations.length} import declarations`,
        'Static Generator',
      );
    } else {
      this.consoleLogger.warn(
        'No schema imports were added',
        'Static Generator',
      );
    }
  }

  public findCtxOutProperty(type: Type): string | undefined {
    this.consoleLogger.log(
      'Searching for ctx_out property in type',
      'Static Generator',
    );
    const typeText = type.getText();
    this.consoleLogger.log(`Type text: ${typeText}`, 'Static Generator');

    const ctxOutMatch = typeText.match(/_ctx_out:\s*{([^}]*)}/);

    if (ctxOutMatch) {
      this.consoleLogger.log(
        `Found ctx_out property: ${ctxOutMatch[1].trim()}`,
        'Static Generator',
      );
      return ctxOutMatch[1].trim();
    } else {
      this.consoleLogger.log('No ctx_out property found', 'Static Generator');
      return undefined;
    }
  }
}

import {
  ImportDeclarationStructure,
  SourceFile,
  StructureKind,
  Type,
  VariableDeclarationKind,
} from 'ts-morph';
import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { SourceFileImportsMap } from '../interfaces/generator.interface';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class StaticGenerator {
  @Inject(ConsoleLogger)
  private readonly consoleLogger!: ConsoleLogger;

  public generateStaticDeclaration(sourceFile: SourceFile): void {
    try {
      this.consoleLogger.log(
        `[TRPC Debug] Generating static declarations in file: ${sourceFile.getFilePath()}`,
        'StaticGenerator',
      );

      // Check if directory exists
      const dirPath = path.dirname(sourceFile.getFilePath());
      if (!fs.existsSync(dirPath)) {
        this.consoleLogger.log(
          `[TRPC Debug] Creating directory: ${dirPath}`,
          'StaticGenerator',
        );
        fs.mkdirSync(dirPath, { recursive: true });
      }

      this.consoleLogger.log(
        `[TRPC Debug] Adding import declarations for @trpc/server and zod`,
        'StaticGenerator',
      );

      sourceFile.addImportDeclaration({
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@trpc/server',
        namedImports: ['initTRPC'],
      });
      sourceFile.addImportDeclaration({
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: 'zod',
        namedImports: ['z'],
      });

      this.consoleLogger.log(
        `[TRPC Debug] Adding variable statements for t and publicProcedure`,
        'StaticGenerator',
      );

      sourceFile.addVariableStatements([
        {
          declarationKind: VariableDeclarationKind.Const,
          declarations: [{ name: 't', initializer: 'initTRPC.create()' }],
        },
        {
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            { name: 'publicProcedure', initializer: 't.procedure' },
          ],
        },
      ]);

      this.consoleLogger.log(
        `[TRPC Debug] Static declarations generated successfully`,
        'StaticGenerator',
      );
    } catch (error: unknown) {
      this.consoleLogger.error(
        `[TRPC Debug] Error generating static declarations: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
        'StaticGenerator',
      );
    }
  }

  public addSchemaImports(
    sourceFile: SourceFile,
    schemaImportNames: Array<string>,
    importsMap: Map<string, SourceFileImportsMap>,
    schemaPackageName?: string,
  ): void {
    try {
      this.consoleLogger.log(
        `[TRPC Debug] Adding schema imports to file: ${sourceFile.getFilePath()}`,
        'StaticGenerator',
      );

      // Log the current imports in the file
      const existingImports = sourceFile.getImportDeclarations();
      this.consoleLogger.log(
        `[TRPC Debug] File has ${existingImports.length} existing imports`,
        'StaticGenerator',
      );

      // Dump schema import names to debug
      this.consoleLogger.log(
        `[TRPC Debug] Schema import names (${schemaImportNames.length}): ${schemaImportNames.join(', ')}`,
        'StaticGenerator',
      );

      // Dump schema package name to debug
      this.consoleLogger.log(
        `[TRPC Debug] Schema package name: ${schemaPackageName || 'not provided'}`,
        'StaticGenerator',
      );

      // Direct package import handling - this should have priority
      if (schemaPackageName && schemaImportNames.length > 0) {
        this.consoleLogger.log(
          `[TRPC Debug] Will import ${schemaImportNames.length} schemas directly from package: ${schemaPackageName}`,
          'StaticGenerator',
        );

        // Create package import (don't attempt to remove existing imports as they may not exist yet)
        sourceFile.addImportDeclaration({
          moduleSpecifier: schemaPackageName,
          namedImports: schemaImportNames,
        });

        // Verify import was added
        const updatedImports = sourceFile.getImportDeclarations();
        for (const imp of updatedImports) {
          if (imp.getModuleSpecifierValue() === schemaPackageName) {
            const names = imp.getNamedImports().map((n) => n.getName());
            this.consoleLogger.log(
              `[TRPC Debug] Successfully added import from ${schemaPackageName} with ${names.length} schemas`,
              'StaticGenerator',
            );
          }
        }

        // If using package import, skip the regular import logic
        return;
      }

      // Original behavior for local file imports (this is what's failing)
      const importDeclarations: ImportDeclarationStructure[] = [];

      for (const schemaImportName of schemaImportNames) {
        this.consoleLogger.log(
          `[TRPC Debug] Processing schema import: ${schemaImportName}`,
          'StaticGenerator',
        );

        for (const [importMapKey, importMapMetadata] of importsMap.entries()) {
          if (schemaImportName == null || importMapKey !== schemaImportName) {
            continue;
          }

          const sourceFilePath = importMapMetadata.sourceFile.getFilePath();
          const targetDir = path.dirname(sourceFile.getFilePath());

          this.consoleLogger.log(
            `[TRPC Debug] Import source file: ${sourceFilePath}`,
            'StaticGenerator',
          );
          this.consoleLogger.log(
            `[TRPC Debug] Target directory: ${targetDir}`,
            'StaticGenerator',
          );

          const relativePath = path.relative(
            targetDir,
            sourceFilePath.replace(/\.ts$/, ''),
          );

          this.consoleLogger.log(
            `[TRPC Debug] Calculated relative path: ${relativePath}`,
            'StaticGenerator',
          );

          const moduleSpecifier = relativePath.startsWith('.')
            ? relativePath
            : `./${relativePath}`;

          this.consoleLogger.log(
            `[TRPC Debug] Final module specifier: ${moduleSpecifier}`,
            'StaticGenerator',
          );

          importDeclarations.push({
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: moduleSpecifier,
            namedImports: [schemaImportName],
          });
        }
      }

      this.consoleLogger.log(
        `[TRPC Debug] Adding ${importDeclarations.length} import declarations to source file`,
        'StaticGenerator',
      );

      if (importDeclarations.length > 0) {
        sourceFile.addImportDeclarations(importDeclarations);
      }

      this.consoleLogger.log(
        `[TRPC Debug] Schema imports added successfully`,
        'StaticGenerator',
      );
    } catch (error: unknown) {
      this.consoleLogger.error(
        `[TRPC Debug] Error adding schema imports: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
        'StaticGenerator',
      );
    }
  }

  public findCtxOutProperty(type: Type): string | undefined {
    try {
      const typeText = type.getText();
      this.consoleLogger.log(
        `[TRPC Debug] Finding ctx out property in type: ${typeText.substring(0, 100)}${typeText.length > 100 ? '...' : ''}`,
        'StaticGenerator',
      );

      const ctxOutMatch = typeText.match(/_ctx_out:\s*{([^}]*)}/);

      if (ctxOutMatch) {
        this.consoleLogger.log(
          `[TRPC Debug] Found ctx out property: ${ctxOutMatch[1].trim()}`,
          'StaticGenerator',
        );
        return ctxOutMatch[1].trim();
      } else {
        this.consoleLogger.log(
          `[TRPC Debug] No ctx out property found`,
          'StaticGenerator',
        );
        return undefined;
      }
    } catch (error: unknown) {
      this.consoleLogger.error(
        `[TRPC Debug] Error finding ctx out property: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
        'StaticGenerator',
      );
      return undefined;
    }
  }
}

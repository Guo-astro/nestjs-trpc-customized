import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { SourceMapping } from '../interfaces/scanner.interface';

/**
 * For this specific file, using a static reference is desirable since `getCallerFilePath` uses a stack-trace to figure out the caller.
 * If this class is injected through dependency injection, that stack-trace will vary!
 */
@Injectable()
export class FileScanner {
  public getCallerFilePath(): string {
    try {
      console.log('[TRPC Debug] Getting caller file path');

      // First try to get from environment variable (useful in containers)
      if (process.env.TRPC_MODULE_CALLER_FILE_PATH) {
        console.log(
          `[TRPC Debug] Using TRPC_MODULE_CALLER_FILE_PATH env var: ${process.env.TRPC_MODULE_CALLER_FILE_PATH}`,
        );
        return process.env.TRPC_MODULE_CALLER_FILE_PATH;
      }

      // Fallback to stack trace method
      const error = new Error();
      const stack = error.stack || '';
      const stackLines = stack.split('\n');

      // Log the stack for debugging
      console.log('[TRPC Debug] Stack trace for caller detection:');
      stackLines.slice(1, 10).forEach((line, index) => {
        console.log(`[TRPC Debug] Stack[${index}]: ${line}`);
      });

      // Try to find a path in the stack trace
      for (const line of stackLines) {
        const match = line.match(/\((.+?):[0-9]+:[0-9]+\)/);
        if (match && match[1] && !match[1].includes('node_modules')) {
          const filePath = match[1];
          if (fs.existsSync(filePath)) {
            console.log(`[TRPC Debug] Found caller file path: ${filePath}`);
            return filePath;
          }
        }
      }

      // Fallback to app module in current directory
      const appModulePath = path.resolve(process.cwd(), 'src', 'app.module.ts');
      console.log(
        `[TRPC Debug] Falling back to app module path: ${appModulePath}`,
      );

      if (fs.existsSync(appModulePath)) {
        return appModulePath;
      }

      // Last resort - return a fixed path but show warning
      console.warn(
        '[TRPC Debug] Could not determine caller file path, using fallback',
      );
      return './src/app.module.ts';
    } catch (error) {
      console.error(
        `[TRPC Debug] Error getting caller file path: ${error instanceof Error ? error.message : String(error)}`,
      );
      console.error(error instanceof Error ? error.stack : undefined);
      return './src/app.module.ts';
    }
  }

  private normalizePath(p: string): string {
    return path.resolve(p.replace(/\\/g, '/'));
  }

  private getPlatformPath(p: string): string {
    const exec = /^\/(\w*):(.*)/.exec(p);
    return /^win/.test(process.platform) && exec
      ? `${exec[1]}:\\${exec[2].replace(/\//g, '\\')}`
      : p;
  }

  private getSourceMapFromJSPath(sourcePath: string): SourceMapping {
    const SOURCE_MAP_REGEX = /\/\/# sourceMappingURL=(.*\.map)$/m;
    const filePath = this.getPlatformPath(sourcePath);

    let content: string;
    try {
      content = fs.readFileSync(filePath, { encoding: 'utf8' });
    } catch (error) {
      throw new Error(`Could not read source file at path: ${filePath}`);
    }

    const exec = SOURCE_MAP_REGEX.exec(content);
    if (exec == null) {
      throw new Error(
        `Could not find source map comment in file at path ${sourcePath}. Make sure "sourceMap" is enabled in your tsconfig.`,
      );
    }

    const sourceMapPath = path.resolve(filePath, '..', exec[1]);
    let sourceMapContent: string;
    try {
      sourceMapContent = fs.readFileSync(sourceMapPath, { encoding: 'utf8' });
    } catch (error) {
      throw new Error(
        `Could not read source map file at path: ${sourceMapPath}`,
      );
    }

    try {
      return JSON.parse(sourceMapContent);
    } catch (error) {
      throw new Error(
        `Failed to parse source map content from: ${sourceMapPath}`,
      );
    }
  }
}

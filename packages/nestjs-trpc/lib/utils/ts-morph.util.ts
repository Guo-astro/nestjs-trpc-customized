import { SourceFile } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function saveOrOverrideFile(
  sourceFile: SourceFile,
): Promise<void> {
  try {
    console.log(`[TRPC Debug] Saving file: ${sourceFile.getFilePath()}`);

    // Check the structure of the file
    const imports = sourceFile.getImportDeclarations();
    console.log(
      `[TRPC Debug] File has ${imports.length} imports before saving`,
    );

    for (const imp of imports) {
      console.log(
        `[TRPC Debug] Import: ${imp.getModuleSpecifierValue()} - ${imp
          .getNamedImports()
          .map((n) => n.getName())
          .join(', ')}`,
      );
    }

    // Ensure directory exists
    const dirPath = path.dirname(sourceFile.getFilePath());
    if (!fs.existsSync(dirPath)) {
      console.log(`[TRPC Debug] Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Format with specific options
    sourceFile.formatText({
      indentSize: 2,
      ensureNewLineAtEndOfFile: true,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
    });

    // Save the file
    await sourceFile.save();

    // Verify file was saved correctly
    console.log(`[TRPC Debug] File saved: success`);

    // Verify the file exists
    if (fs.existsSync(sourceFile.getFilePath())) {
      console.log(
        `[TRPC Debug] Verified file exists at: ${sourceFile.getFilePath()}`,
      );

      // Read the saved file to verify content
      const content = fs.readFileSync(sourceFile.getFilePath(), 'utf8');
      console.log(`[TRPC Debug] Saved file size: ${content.length} bytes`);
      console.log(`[TRPC Debug] First 200 chars: ${content.substring(0, 200)}`);
    } else {
      console.error(
        `[TRPC Debug] File does not exist after save: ${sourceFile.getFilePath()}`,
      );
    }
  } catch (error) {
    console.error(
      `[TRPC Debug] Error saving file: ${sourceFile.getFilePath()}`,
    );
    console.error(error instanceof Error ? error.stack : String(error));
  }
}

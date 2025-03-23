import { SourceFile } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function saveOrOverrideFile(
  sourceFile: SourceFile,
): Promise<void> {
  try {
    console.log(`[TRPC Debug] Saving file: ${sourceFile.getFilePath()}`);

    // Ensure directory exists
    const dirPath = path.dirname(sourceFile.getFilePath());
    if (!fs.existsSync(dirPath)) {
      console.log(`[TRPC Debug] Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }

    sourceFile.formatText({ indentSize: 2 });
    await sourceFile.save();

    console.log(
      `[TRPC Debug] File saved successfully: ${sourceFile.getFilePath()}`,
    );
  } catch (error) {
    console.error(
      `[TRPC Debug] Error saving file: ${sourceFile.getFilePath()}`,
    );
    console.error(error instanceof Error ? error.stack : String(error));
  }
}

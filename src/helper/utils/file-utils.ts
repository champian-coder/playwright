import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
  /**
   * Reads and parses a JSON file from an absolute path.
   * @param absolutePath Absolute path to the JSON file.
   * @returns Parsed JSON data as an object or array.
   */
  static readJsonFile<T>(absolutePath: string): T {
    try {
      if (!path.isAbsolute(absolutePath)) {
        throw new Error(`The provided path is not absolute: ${absolutePath}`);
      }

      const fileData = fs.readFileSync(absolutePath, 'utf-8');
      return JSON.parse(fileData) as T;
    } catch (error) {
      console.error(`Failed to read JSON file at ${absolutePath}:`, error);
      throw error;
    }
  }
}

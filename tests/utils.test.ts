import { generateTimestamp, ensureDirectoryExists } from '../src/utils'; // Adjust path if necessary
import { expect, jest } from '@jest/globals';

// Mock console.log
let consoleSpy: any;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  consoleSpy.mockRestore();
});

describe('Utils Module', () => {
  describe('generateTimestamp', () => {
    it('should return a number representing the current time', () => {
      const timestamp = generateTimestamp();
      expect(typeof timestamp).toBe('number');
      // Check if it's close to the current time (within a reasonable margin like 1 second)
      expect(timestamp).toBeCloseTo(Date.now(), -3); // -3 means precision to 1000ms (1 second)
    });
  });

  describe('ensureDirectoryExists', () => {
    it('should log a message indicating it checks the directory', () => {
      const testPath = './test-dir';
      ensureDirectoryExists(testPath);
      expect(consoleSpy).toHaveBeenCalledWith(`Ensuring directory exists: ${testPath}`);
      // In a real scenario, you'd mock 'fs' and check if fs.mkdirSync or similar was called
    });
  });
});

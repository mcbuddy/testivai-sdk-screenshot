/// <reference types="@types/jest" />
import { setupHooks, captureScreenshot, PlaywrightPage, PlaywrightTest } from '../src/hooks';
import { expect, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Helper function to create properly typed mocks
function createMockPage(): jest.Mocked<PlaywrightPage> {
  return {
    screenshot: jest.fn() as jest.MockedFunction<PlaywrightPage['screenshot']>
  };
}

function createMockTest(): jest.Mocked<PlaywrightTest> {
  return {
    info: jest.fn() as jest.MockedFunction<PlaywrightTest['info']>
  };
}

// Mock console.log to prevent output during tests
let consoleSpy: any;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
});

afterEach(() => {
  consoleSpy.mockRestore();
  // Clean up screenshots directory
  if (fs.existsSync('screenshots')) {
    fs.rmSync('screenshots', { recursive: true });
  }
});

describe('Hooks Module', () => {
  describe('setupHooks', () => {
    it('should log a message when called', () => {
      setupHooks();
      expect(consoleSpy).toHaveBeenCalledWith("Setting up test runner hooks...");
    });

    it('should apply Playwright hooks if Playwright is detected', () => {
      // Mock Playwright environment
      const mockPage = createMockPage();
      mockPage.screenshot.mockResolvedValue(Buffer.from('fake-screenshot'));
      const mockTest = createMockTest();
      mockTest.info.mockReturnValue({ title: 'test-case' });
      (global as any).playwright = { test: mockTest };

      setupHooks();
      expect(consoleSpy).toHaveBeenCalledWith("Setting up test runner hooks...");
      
      delete (global as any).playwright;
    });
  });

  describe('captureScreenshot', () => {
    it('should capture screenshot with Playwright', async () => {
      const mockPage = createMockPage();
      mockPage.screenshot.mockResolvedValue(Buffer.from('fake-screenshot'));
      const mockTest = createMockTest();
      mockTest.info.mockReturnValue({ title: 'test-case' });

      await captureScreenshot(mockPage as any, 'click', mockTest as any);

      // Verify screenshot was taken
      expect(mockPage.screenshot).toHaveBeenCalled();
      
      // Verify file was created with correct naming pattern
      const files = fs.readdirSync('screenshots');
      expect(files.length).toBe(1);
      expect(files[0]).toMatch(/test-case-click-\d+\.png/);
    });

    it('should handle screenshot capture errors', async () => {
      const mockPage = createMockPage();
      mockPage.screenshot.mockRejectedValue(new Error('Screenshot failed'));
      const mockTest = createMockTest();
      mockTest.info.mockReturnValue({ title: 'test-case' });

      await expect(captureScreenshot(mockPage as any, 'click', mockTest as any))
        .rejects.toThrow('Failed to capture screenshot: Screenshot failed');
    });

    it('should create screenshots directory if it does not exist', async () => {
      // Remove screenshots directory if it exists
      if (fs.existsSync('screenshots')) {
        fs.rmSync('screenshots', { recursive: true });
      }

      const mockPage = createMockPage();
      mockPage.screenshot.mockResolvedValue(Buffer.from('fake-screenshot'));
      const mockTest = createMockTest();
      mockTest.info.mockReturnValue({ title: 'test-case' });

      await captureScreenshot(mockPage as any, 'click', mockTest as any);

      expect(fs.existsSync('screenshots')).toBe(true);
    });
  });
});

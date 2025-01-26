import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { AllureReporter } from 'allure-playwright';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  testDir: './src/tests', // Directory containing test files
  use: {
    browserName: process.env.BROWSER as 'chromium' | 'firefox' | 'webkit' || 'chromium', // Browser from .env
    headless: process.env.HEAD === 'true', // Headless mode
    baseURL: process.env.BASEURL || 'https://example.com', // Base URL
    viewport: { width: 1280, height: 720 }, // Default viewport size
  },
  retries: 1, // Retry failed tests once
  timeout: 60000, // Set timeout to 60 seconds
  reporter: [
    ['list'], // Console output
    ['allure-playwright'], // Allure results
  ],
});

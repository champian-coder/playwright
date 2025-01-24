declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BROWSER: 'chromium' | 'firefox' | 'webkit';
        ENV: 'staging' | 'prod' | 'test';
        BASEURL: string;
        HEAD: 'true' | 'false';
      }
    }
  }
  
  export {};
  
import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./e2e',testMatch:'stage-four-static.spec.ts',timeout:60000,workers:1,reporter:'list',use:{baseURL:'http://127.0.0.1:4184/stacktrail/',headless:true},webServer:{command:'npm run preview -- --port 4184 --strictPort',url:'http://127.0.0.1:4184/stacktrail/',reuseExistingServer:false}});

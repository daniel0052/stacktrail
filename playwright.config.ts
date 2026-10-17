import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./e2e',testIgnore:/stage-three-static\.spec\.ts/,timeout:60_000,expect:{timeout:10_000},workers:2,
 fullyParallel:true,forbidOnly:!!process.env.CI,retries:0,
 reporter:[['list'],['json',{outputFile:'test-results/quality-results.json'}],['html',{outputFolder:'playwright-report',open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4177/stacktrail/',headless:true,actionTimeout:10_000,reducedMotion:'reduce',viewport:{width:1440,height:1000},trace:'retain-on-failure',screenshot:'only-on-failure'},
 webServer:[{command:'npm run dev -- --port 4177 --strictPort',url:'http://127.0.0.1:4177/stacktrail/',reuseExistingServer:!process.env.CI,timeout:30_000},{command:'node scripts/study-fixture-server.mjs',url:'http://127.0.0.1:5174',reuseExistingServer:!process.env.CI,timeout:30_000}],
});

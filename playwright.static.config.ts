import {defineConfig} from '@playwright/test';
import config from './playwright.config';
export default defineConfig({...config,testIgnore:[],outputDir:'test-results-static03',reporter:[['list'],['json',{outputFile:'test-results-static03/results.json'}],['html',{outputFolder:'playwright-report-static03',open:'never'}]],testMatch:/stage-three-static\.spec\.ts/,use:{...config.use,baseURL:'http://127.0.0.1:4178/stacktrail/'},webServer:{command:'npm run preview -- --port 4178 --strictPort',url:'http://127.0.0.1:4178/stacktrail/',reuseExistingServer:!process.env.CI,timeout:30_000}});

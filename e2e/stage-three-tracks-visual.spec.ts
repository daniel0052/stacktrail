import {test,expect} from '@playwright/test';
import {openRoute,font,audit} from './helpers';
for(const theme of ['dark','light'] as const)for(const width of [375,1440])test(`trilhas inspeção ${theme} ${width}`,async({page},info)=>{
 await page.setViewportSize({width,height:1000});await openRoute(page,'/etapas/03',theme);await font(page,150);
 const js=page.getByRole('button',{name:/^JavaScript\/TypeScript/});await js.focus();await page.keyboard.press('Enter');await expect(js).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('main a[href$="/js-valores"]')).toBeVisible();await expect(page.locator('main a[href$="/php-inicio"]')).toHaveCount(0);
 await audit(page,info);await page.screenshot({path:info.outputPath('dashboard-js.png'),fullPage:true});
 await openRoute(page,'/etapas/03/autoavaliacao',theme);await audit(page,info);await page.screenshot({path:info.outputPath('assessment-js.png'),fullPage:true});
});

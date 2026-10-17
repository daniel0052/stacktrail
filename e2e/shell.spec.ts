import {test,expect} from '@playwright/test';
import {openRoute,font} from './helpers';
for(const width of [320,375,768,1024,1440])for(const theme of ['dark','light'] as const){
 test(`shell ${width} ${theme}`,async({page},info)=>{
  await page.setViewportSize({width,height:900});await openRoute(page,'/',theme);await font(page,150);
  const clipped=await page.locator('.sidebar-content-inner, .brand, .brand > span, .topbar, .topbar-actions, .app-footer').evaluateAll(nodes=>nodes.filter(node=>node.scrollWidth>node.clientWidth+1).map(node=>({class:node.className,width:node.clientWidth,scroll:node.scrollWidth})));
  expect(clipped).toEqual([]);
  await info.attach('shell',{body:await page.screenshot({fullPage:true}),contentType:'image/png'});
 });
}

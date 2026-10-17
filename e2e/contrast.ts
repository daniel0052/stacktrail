import type {Locator} from '@playwright/test';
// Computed solid colors, alpha-composited through ancestors. Gradients/images and
// group opacity are explicit unresolved cases, never silently treated as passes.
export async function contrastSample(locator:Locator,pseudo?:'::placeholder'){
 return locator.evaluate((element,pseudo)=>{
  type Color=[number,number,number,number];
  const color=(value:string):Color=>{const parts=value.match(/[\d.]+/g)?.map(Number)??[];return [parts[0]??0,parts[1]??0,parts[2]??0,parts[3]??1];};
  const over=(fg:Color,bg:Color):Color=>{const a=fg[3]+bg[3]*(1-fg[3]);return [0,1,2].map(i=>(fg[i]*fg[3]+bg[i]*bg[3]*(1-fg[3]))/(a||1)).concat(a) as Color;};
  const luminance=(c:Color)=>c.slice(0,3).map(v=>{const n=v/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  const ratio=(a:Color,b:Color)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  const chain:Element[]=[];let current:Element|null=element;while(current){chain.unshift(current);current=current.parentElement;}
  let bg:Color=[255,255,255,1];let outside=bg;const unresolved:string[]=[];
  for(const node of chain){const style=getComputedStyle(node);if(style.backgroundImage!=='none')unresolved.push('background-image');if(style.filter!=='none')unresolved.push('filter');if(Number(style.opacity)!==1)unresolved.push('group-opacity');if(node===element)outside=bg;bg=over(color(style.backgroundColor),bg);}
  const style=getComputedStyle(element,pseudo);const fg=over(color(style.color),bg);const border=over(color(style.borderTopColor),bg);const outline=over(color(style.outlineColor),outside);
  return {foreground:style.color,background:bg,textRatio:ratio(fg,bg),borderRatio:Math.min(ratio(border,bg),ratio(border,outside)),outlineRatio:ratio(outline,outside),outlineStyle:style.outlineStyle,outlineWidth:style.outlineWidth,fontSize:style.fontSize,unresolved};
 },pseudo);
}

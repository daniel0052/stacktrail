import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import type { Block } from '../../features/flow/model';
export function BlockProperties({node,zoom,svg,children}:{node:Block;zoom:number;svg:RefObject<SVGSVGElement|null>;children:ReactNode}){
 const [portalTarget,setPortalTarget]=useState<Element>(document.body);
 useLayoutEffect(()=>{setPortalTarget(svg.current?.closest('.flow-canvas-shell')??document.body);},[svg,node.id]);
 const panel=useRef<HTMLDivElement>(null);const [position,setPosition]=useState({left:12,top:12,width:330,maxHeight:520,side:'right'});
 useLayoutEffect(()=>()=>{const block=[...(svg.current?.querySelectorAll<SVGElement>('.flow-block > g[role="button"]')??[])].find(element=>element.getAttribute('aria-label')?.startsWith(`${node.id}:`));requestAnimationFrame(()=>{if(document.activeElement===document.body)block?.focus({preventScroll:true});});},[node.id,svg]);
 useLayoutEffect(()=>{
  const update=()=>{const rect=svg.current?.getBoundingClientRect();if(!rect)return;const mobile=window.innerWidth<560;const width=mobile?window.innerWidth-24:Math.min(330,window.innerWidth-24),maxHeight=Math.min(520,window.innerHeight-24),height=Math.min(panel.current?.scrollHeight??maxHeight,maxHeight);const left=rect.left+node.x*zoom,right=left+190*zoom,top=rect.top+node.y*zoom;const side=mobile?'sheet':right+12+width<=window.innerWidth-12?'right':left-12-width>=12?'left':'floating';const x=mobile?12:side==='left'?left-width-12:side==='right'?right+12:Math.max(12,Math.min(window.innerWidth-width-12,right+12));const y=mobile?window.innerHeight-height-12:Math.max(12,Math.min(window.innerHeight-height-12,top));setPosition(previous=>{const next={left:x,top:y,width,maxHeight,side};return JSON.stringify(previous)===JSON.stringify(next)?previous:next;});};
  update();window.addEventListener('resize',update);window.addEventListener('scroll',update,true);const observer=typeof ResizeObserver==='undefined'?undefined:new ResizeObserver(update);if(panel.current)observer?.observe(panel.current);if(svg.current)observer?.observe(svg.current);return()=>{window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true);observer?.disconnect();};
 },[node.id,node.x,node.y,zoom,svg]);
 return createPortal(<div ref={panel} className="flow-inline-editor flow-floating-properties" data-block-editor="true" data-placement={position.side} style={{left:position.left,top:position.top,width:position.width,maxHeight:position.maxHeight}} onPointerDown={e=>e.stopPropagation()}>{children}</div>,portalTarget);
}

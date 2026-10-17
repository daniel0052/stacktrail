import {validFileName} from './projects.ts';
export function crc32(bytes:Uint8Array){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
/** ZIP STORE, UTF-8; trusted filenames, text only. No runtime or extraction is performed here. */
export function projectZip(files:Record<string,string>):ArrayBuffer{
 const encoder=new TextEncoder();const pieces:Uint8Array[]=[];const directory:Uint8Array[]=[];let offset=0;
 for(const [path,text] of Object.entries(files)){
  if(!validFileName(path))throw new Error('Nome de arquivo inválido.');
  const name=encoder.encode(path),body=encoder.encode(text),crc=crc32(body);const local=new Uint8Array(30+name.length);const view=new DataView(local.buffer);
  view.setUint32(0,0x04034b50,true);view.setUint16(4,20,true);view.setUint16(6,0x800,true);view.setUint16(12,33,true);view.setUint32(14,crc,true);view.setUint32(18,body.length,true);view.setUint32(22,body.length,true);view.setUint16(26,name.length,true);local.set(name,30);
  const central=new Uint8Array(46+name.length),c=new DataView(central.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,33,true);c.setUint32(16,crc,true);c.setUint32(20,body.length,true);c.setUint32(24,body.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);central.set(name,46);directory.push(central);pieces.push(local,body);offset+=local.length+body.length;
 }
 const length=directory.reduce((sum,p)=>sum+p.length,0);const end=new Uint8Array(22);const e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,directory.length,true);e.setUint16(10,directory.length,true);e.setUint32(12,length,true);e.setUint32(16,offset,true);
 const result=new Uint8Array(offset+length+22);let position=0;for(const piece of [...pieces,...directory,end]){result.set(piece,position);position+=piece.length;}return result.buffer;
}

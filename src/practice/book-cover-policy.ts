// Explicit distribution permissions belong here after verification of the image and terms.
// A publisher catalog or a request to use a cover is not a distribution permission.
export type CoverPermission={source:string;terms:string;checked:string};
export const coverPermissions:Readonly<Record<string,CoverPermission>>={
 'assets/books/database-design-2ed.webp':{source:'https://opentextbc.ca/dbdesign01/',terms:'Obra de Adrienne Watt e Nelson Eng, CC BY 4.0. Fotografia Spiral Stairs In Milano old building downtown, Michele Ursino, CC BY-SA 2.0. Conversão WebP sem alteração da composição.',checked:'2026-10-19'},
};
export function licensedCoverSource(src:string|undefined):string|undefined{
 const canonical=src==='covers/database-design-2ed.webp'?'assets/books/database-design-2ed.webp':src;
 return permittedCover(canonical)?canonical:undefined;
}
export function permittedCover(src:string|undefined):boolean{
 return !!src&&src.startsWith('assets/books/')&&!src.includes('..')&&!!coverPermissions[src];
}

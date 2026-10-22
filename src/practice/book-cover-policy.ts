// Explicit distribution permissions belong here after verification of the image and terms.
// A publisher catalog or a request to use a cover is not a distribution permission.
export type CoverPermission={source:string;terms:string;checked:string};
export const coverPermissions:Readonly<Record<string,CoverPermission>>={
 'assets/books/database-design-2ed.webp':{source:'https://opentextbc.ca/dbdesign01/',terms:'Obra de Adrienne Watt e Nelson Eng, CC BY 4.0. Fotografia Spiral Stairs In Milano old building downtown, Michele Ursino, CC BY-SA 2.0. Conversão WebP sem alteração da composição.',checked:'2026-10-19'},
};
// Book covers are local bibliographic assets by default (project policy, 2026-10-20).
// License metadata above records verified terms; it does not gate image display.
export function localCoverSource(src:string|undefined):string|undefined{
 const canonical=src?.startsWith('covers/')?`assets/books/${src.slice('covers/'.length)}`:src;
 return permittedCover(canonical)?canonical:undefined;
}
export function permittedCover(src:string|undefined):boolean{
 return !!src&&/^assets\/books\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:webp|png|jpe?g)$/.test(src);
}

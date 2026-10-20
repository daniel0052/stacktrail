// Explicit distribution permissions belong here after verification of the image and terms.
// A publisher catalog or a request to use a cover is not a distribution permission.
export type CoverPermission={source:string;terms:string;checked:string};
export const coverPermissions:Readonly<Record<string,CoverPermission>>={
 'assets/books/database-design-2ed.webp':{source:'https://opentextbc.ca/dbdesign01/',terms:'Obra de Adrienne Watt e Nelson Eng, CC BY 4.0. Fotografia Spiral Stairs In Milano old building downtown, Michele Ursino, CC BY-SA 2.0. Conversão WebP sem alteração da composição.',checked:'2026-10-19'},
};
// Explicit user request on 2026-10-20 restores existing bibliographic images.
// This display decision does not establish a publisher license or free redistribution.
export const restoredLocalCovers:ReadonlySet<string>=new Set([
 'assets/books/analise-trafego-tcp-ip.webp',
 'assets/books/api-security-in-action.webp',
 'assets/books/aprenda-node-projetos-reais.webp',
 'assets/books/aprendendo-git.webp',
 'assets/books/aprendendo-typescript.webp',
 'assets/books/codigo-limpo.png',
 'assets/books/comunicacao-nao-violenta-4ed.webp',
 'assets/books/construindo-sistemas-seguros-resilientes.webp',
 'assets/books/database-design-2ed.webp',
 'assets/books/desenvolvendo-com-laravel.webp',
 'assets/books/dominando-estilos-apis.webp',
 'assets/books/dominando-nodejs.webp',
 'assets/books/english/communicating-in-business.jpg',
 'assets/books/english/english-grammar-in-use.jpg',
 'assets/books/english/english-vocabulary-in-use.jpg',
 'assets/books/english/practical-english-usage.jpg',
 'assets/books/english/ship-or-sheep.jpg',
 'assets/books/entendendo-algoritmos-2ed.webp',
 'assets/books/fundamentos-arquitetura-software-2ed.webp',
 'assets/books/fundamentos-engenharia-software.webp',
 'assets/books/habitos-atomicos.webp',
 'assets/books/linux-guia-pratico-4ed.webp',
 'assets/books/logica-programacao-javascript-2ed.webp',
 'assets/books/o-codificador-limpo.webp',
 'assets/books/o-programador-pragmatico-2ed.webp',
 'assets/books/php-para-quem-conhece-php-5ed.webp',
 'assets/books/programacao-web-node-express.webp',
 'assets/books/refatoracao-2ed.webp',
 'assets/books/sistema-banco-dados-7ed.webp',
 'assets/books/sql-guia-pratico.webp',
 'assets/books/stage08/devops-nativo-kubernetes.webp',
 'assets/books/stage08/kubernetes-lucas-santos.webp',
 'assets/books/stage09/entendendo-algoritmos-2ed.webp',
 'assets/books/stage09/refatoracao-2ed.webp',
 'assets/books/stage10/aprendendo-typescript.webp',
 'assets/books/stage10/inclusive-components.png',
 'assets/books/stage10/react-fluente.jpg',
 'assets/books/stage11/codigo-limpo.png',
 'assets/books/stage11/fundamentos-arquitetura-software-2ed.webp',
 'assets/books/stage11/refatoracao-2ed.webp',
 'assets/books/tdd-kent-beck.webp',
 'assets/books/ted-falar-convencer-emocionar.webp',
 'assets/books/web-security-for-developers.webp',
]);
export function localCoverSource(src:string|undefined):string|undefined{
 const canonical=src?.startsWith('covers/')?`assets/books/${src.slice('covers/'.length)}`:src;
 return permittedCover(canonical)?canonical:undefined;
}
export function permittedCover(src:string|undefined):boolean{
 return !!src&&src.startsWith('assets/books/')&&!src.includes('..')&&(!!coverPermissions[src]||restoredLocalCovers.has(src));
}

import {it,expect} from 'vitest';
import {crc32,projectZip} from '../features/backend/archive';
import {readCodeDraft,serializeDraft,starterFiles,type StudyProject} from '../features/backend/projects';
it('registra texto por projeto e recusa travessia e registros incompatíveis',()=>{
 const project:StudyProject={id:'php-basics',title:'PHP',commands:[],files:{'src/Livro.php':'<?php echo "exemplo";','composer.lock':'referência','package-lock.json':'referência'}};
 const starter=starterFiles(project,'03-ex01');expect(starter['composer.lock']).toBeUndefined();expect(starter['package-lock.json']).toBeUndefined();expect(starter['src/Livro.php']).not.toBe(project.files['src/Livro.php']);
 const files={'src/Livro.php':'<?php echo "<script>texto, sem executar</script>";'};
 expect(readCodeDraft(serializeDraft(project,files),project)).toEqual(files);
 expect(readCodeDraft(serializeDraft(project,{'../escape':'x'}),project)).toBeNull();expect(readCodeDraft(serializeDraft({...project,id:'outro'},files),project)).toBeNull();expect(readCodeDraft('texto anterior',project)).toBeNull();
});
it('ZIP preserva nomes UTF8/conteúdo e CRC32 conhecido sem caminhos externos',()=>{
 expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
 const files={'src/main.ts':'const título = "ação";\n','README.md':'# Estudo\n'};const zip=projectZip(files);const view=new DataView(zip);let at=0;
 for(const [name,text] of Object.entries(files)){expect(view.getUint32(at,true)).toBe(0x04034b50);const n=view.getUint16(at+26,true),length=view.getUint32(at+18,true);const data=new Uint8Array(zip,at+30+n,length);expect(new TextDecoder().decode(new Uint8Array(zip,at+30,n))).toBe(name);expect(new TextDecoder().decode(data)).toBe(text);expect(view.getUint32(at+14,true)).toBe(crc32(data));at+=30+n+length;}
 expect(view.getUint32(zip.byteLength-22,true)).toBe(0x06054b50);expect(view.getUint16(zip.byteLength-14,true)).toBe(2);expect(()=>projectZip({'/tmp/escape':'x'})).toThrow();
});

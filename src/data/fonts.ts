/** OFL fonts from the official Google Fonts repository, self-hosted pt-BR subsets. */
export const fonts = {
  Fraunces: { slug:'fraunces', cssFamily:'Contagem Local 01', weight:'100 900' },
  Cinzel: { slug:'cinzel', cssFamily:'Contagem Local 02', weight:'400 900' },
  'Cormorant Garamond': { slug:'cormorantgaramond', cssFamily:'Contagem Local 03', weight:'300 700' },
  Lora: { slug:'lora', cssFamily:'Contagem Local 04', weight:'400 700' },
  Inter: { slug:'inter', cssFamily:'Contagem Local 05', weight:'100 900' },
  Quicksand: { slug:'quicksand', cssFamily:'Contagem Local 06', weight:'300 700' },
  'DM Serif Display': { slug:'dmserifdisplay', cssFamily:'Contagem Local 07', weight:'400' },
  'Space Grotesk': { slug:'spacegrotesk', cssFamily:'Contagem Local 08', weight:'300 700' },
  'Libre Baskerville': { slug:'librebaskerville', cssFamily:'Contagem Local 09', weight:'400 700' },
  Outfit: { slug:'outfit', cssFamily:'Contagem Local 10', weight:'100 900' },
} as const;
export type FontName=keyof typeof fonts;
export const themeFonts:Record<string,FontName>={
  aniversario:'Fraunces','ano-novo':'Cinzel',natal:'Cormorant Garamond',familia:'Lora',empresa:'Inter',
  'formatura-fundamental':'Quicksand','formatura-ensino-medio':'DM Serif Display','formatura-faculdade':'Cinzel',
  casamento:'Cormorant Garamond',viagem:'Lora','cha-de-bebe':'Quicksand','evento-tecnologia':'Space Grotesk',
  'evento-medicina':'Inter','evento-direito':'Libre Baskerville',festa:'Outfit',
};
export function fontFile(name:FontName):string{return `fonts/${fonts[name].slug}-latin.woff2`;}
export function fontFamily(name:FontName):string{return `"${fonts[name].cssFamily}", ${name==='Inter'||name==='Quicksand'||name==='Space Grotesk'||name==='Outfit'?'system-ui, sans-serif':'Georgia, serif'}`;}
export function fontFace(name:FontName,base='/'):string {
  const font=fonts[name];const prefix=`/${base.split('/').filter(Boolean).join('/')}`;
  return `@font-face{font-family:"${font.cssFamily}";src:url("${prefix==='/'?'':prefix}/${fontFile(name)}") format("woff2");font-style:normal;font-weight:${font.weight};font-display:swap;}`;
}

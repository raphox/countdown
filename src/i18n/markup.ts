/** Build-time only: translate authored static markup, never visitor event content. */
import {parseHTML} from 'linkedom';
import {translate,localizedPath,type Locale} from './index';
export function translateMarkup(html:string,locale:Locale,base:string):string{

 const {document}=parseHTML(`<html><body>${html}</body></html>`);
 function visit(node:Node){
  if(node.nodeType===3){node.textContent=translate(node.textContent??'',locale);return;}
  if(node.nodeType!==1)return;
  const el=node as Element;if(['SCRIPT','STYLE'].includes(el.tagName))return;
  for(const attr of ['aria-label','placeholder','title','alt'])if(el.hasAttribute(attr))el.setAttribute(attr,translate(el.getAttribute(attr)!,locale));
  if(el.tagName==='A'){const href=el.getAttribute('href');if(href?.startsWith('/')&&!href.startsWith('//'))el.setAttribute('href',localizedPath(href,locale,base));}
  for(const child of [...node.childNodes])visit(child);
 }
 for(const child of [...document.body.childNodes])visit(child as unknown as Node);
 return document.body.innerHTML;
}

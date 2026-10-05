import {localeFromPath,localizedPath,translate} from '../i18n/index';
/** Hosting serves one 404.html; adapt its interface to the requested locale without changing status. */
export function localizeNotFound(){
 if(!document.querySelector('.not-found'))return;
 const locale=localeFromPath(location.pathname);if(locale==='pt-BR')return;
 document.documentElement.lang=locale;document.title=translate('Página não encontrada',locale)+' | Contagem';
 function visit(node:Node){if(node.nodeType===3){node.textContent=translate(node.textContent??'',locale);return;}if(node.nodeType!==1)return;const el=node as Element;if(['SCRIPT','STYLE'].includes(el.tagName))return;for(const attr of ['aria-label','title','alt'])if(el.hasAttribute(attr))el.setAttribute(attr,translate(el.getAttribute(attr)!,locale));for(const child of [...node.childNodes])visit(child);}
 visit(document.body);
 for(const link of document.querySelectorAll<HTMLAnchorElement>('a[href]'))if(!link.dataset.language&&link.getAttribute('href')?.startsWith('/'))link.href=localizedPath(link.getAttribute('href')!,locale,import.meta.env.BASE_URL);
 for(const link of document.querySelectorAll<HTMLElement>('[data-language]')){if(link.dataset.language===locale)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');}
}

import {localizedPath,type Locale} from '../i18n/index';
const draftKey='contagem:language-draft';
/** Transfer only this tab's unfinished form during an explicit language change. */
export function restoreLanguageDraft(){
 try{const raw=sessionStorage.getItem(draftKey);sessionStorage.removeItem(draftKey);if(raw){const saved=JSON.parse(raw);if(saved.path===location.pathname&&saved.state?.draft)history.replaceState(saved.state,'',location.href);}}catch{/* Storage is optional. Valid event data remains in the URL. */}
}
export function initLanguageSwitch(){
 for(const link of document.querySelectorAll<HTMLAnchorElement>('[data-language]')){
  const target=()=>{const url=new URL(location.href);url.pathname=localizedPath(document.querySelector('.not-found')?`${import.meta.env.BASE_URL}404/`:url.pathname,link.dataset.language as Locale,import.meta.env.BASE_URL);return url;};
  link.href=target().href;
  const refresh=()=>{link.href=target().href;};
  link.addEventListener('pointerenter',refresh);link.addEventListener('focus',refresh);
  link.addEventListener('click',()=>{refresh();try{if(history.state?.draft)sessionStorage.setItem(draftKey,JSON.stringify({path:target().pathname,state:{draft:history.state.draft}}));}catch{}});
  window.addEventListener('popstate',refresh);window.addEventListener('hashchange',refresh);
 }
}

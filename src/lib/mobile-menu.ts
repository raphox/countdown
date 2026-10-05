import {translate} from '../i18n/index';
export function initMobileMenu(){
 const header=document.querySelector<HTMLElement>('.site-header');
 const button=header?.querySelector<HTMLButtonElement>('.menu-toggle');
 const nav=header?.querySelector<HTMLElement>('#primary-navigation');
 if(!header||!button||!nav)return;
 const mobile=window.matchMedia('(max-width: 760px)');
 const open=()=>button.getAttribute('aria-expanded')==='true';
 const setOpen=(value:boolean)=>{button.setAttribute('aria-expanded',String(value));button.setAttribute('aria-label',translate(value?'Fechar menu':'Abrir menu'));header.classList.toggle('menu-open',value);};
 header.classList.add('menu-ready');
 button.addEventListener('click',()=>setOpen(!open()));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open()){setOpen(false);button.focus();}});
 document.addEventListener('click',event=>{if(open()&&event.target instanceof Node&&!header.contains(event.target))setOpen(false);});
 header.addEventListener('focusout',event=>{if(open()&&event.relatedTarget instanceof Node&&!header.contains(event.relatedTarget))setOpen(false);});
 nav.addEventListener('click',event=>{if(event.target instanceof Element&&event.target.closest('a')&&mobile.matches)setOpen(false);});
 mobile.addEventListener('change',()=>{if(mobile.matches&&nav.contains(document.activeElement))button.focus();setOpen(false);});
}

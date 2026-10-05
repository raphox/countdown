import { themes } from '../data/themes';
import { canonicalJSON, validateEvent, type EventData } from './event-validation';
export function eventURL(event:EventData,pageURL:string):string { const json=canonicalJSON(event);const bytes=new TextEncoder().encode(json);if(bytes.length>3072)throw new Error('Dados muito longos. Reduza os textos.');const payload=btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');const url=new URL(pageURL);url.search='';url.hash=`v=1&dados=${payload}`;if(url.href.length>4096)throw new Error('Link muito longo. Reduza os textos.');return url.href; }
export function decodeURL(input:string,current:string,base:string,production?:string):{event:EventData;slug:string} {
 if(input.length>4096)throw new Error('Link muito longo.');let url:URL;try{url=new URL(input,current);}catch{throw new Error('Link inválido.');}
 const here=new URL(current);const origins=[here.origin,...(production?[new URL(production).origin]:[])];
 if(!['https:','http:'].includes(url.protocol)||!origins.includes(url.origin)||url.username||url.password||url.search||url.href.length>4096)throw new Error('Use um link deste site.');
 const prefix=`/${base.split('/').filter(Boolean).join('/')}`;const path=prefix==='/'?url.pathname:url.pathname.startsWith(`${prefix}/`)?url.pathname.slice(prefix.length):'';
 const localized=path.replace(/^\/(?:pt-br|en-us)(?=\/)/,'');
 const slug=localized.replace(/^\/|\/$/g,'');if(!themes.some(t=>t.slug===slug)||localized!==`/${slug}/`)throw new Error('Tema ou caminho inválido.');
 const raw=url.hash.slice(1);const parts=raw.split('&');if(parts.length!==2||parts.filter(p=>p==='v=1').length!==1||parts.filter(p=>/^dados=[A-Za-z0-9_-]+$/.test(p)).length!==1)throw new Error('Versão ou dados do link inválidos.');const payload=parts.find(p=>p.startsWith('dados='))!.slice(6);if(payload.length>4096||payload.length%4===1)throw new Error('Dados inválidos.');
 try{const binary=atob(payload.replace(/-/g,'+').replace(/_/g,'/'));if(binary.length>3072)throw new Error();const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));const json=new TextDecoder('utf-8',{fatal:true}).decode(bytes);if(btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')!==payload)throw new Error();return {event:validateEvent(JSON.parse(json)),slug};}catch{throw new Error('Não foi possível ler os dados deste link.');}
}

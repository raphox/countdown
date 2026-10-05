import { canonicalInstant, validTimeZone } from './event-time';
export type Point={lat:number;lon:number};
export type EventData={title:string;endAt:string;timeZone:string;message:string;organizer?:string;venue?:string;address?:string;calendarEndsAt?:string;location?:Point;meetingUrl?:string};
export const limits={title:80,message:240,organizer:60,venue:80,address:200};
export function validatePoint(value:unknown):Point { if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Ponto inválido.');const p=value as Record<string,unknown>;if(Object.keys(p).sort().join(',')!=='lat,lon'||typeof p.lat!=='number'||typeof p.lon!=='number'||!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180)throw new Error('Latitude ou longitude inválida.');return {lat:+p.lat.toFixed(6),lon:+p.lon.toFixed(6)}; }
export function validateEvent(value:unknown,creation=false,now=Date.now()):EventData {
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Dados de evento inválidos.');
 const labels={title:"título",message:"mensagem",organizer:"anfitrião / organização",venue:"local",address:"endereço"};const source=value as Record<string,unknown>;const allowed=['title','endAt','timeZone','message','organizer','venue','address','calendarEndsAt','location','meetingUrl'];
 if(Object.keys(source).some(key=>!allowed.includes(key)))throw new Error('O link contém campos desconhecidos.');
 const result={} as EventData;
 for(const key of ['title','message','organizer','venue','address'] as const){const v=source[key];if(v===undefined&&key!=='title'&&key!=='message')continue;if(typeof v!=='string')throw new Error(`Campo ${labels[key]} inválido.`);const text=v.trim().normalize('NFC');if([...text].length>limits[key]||(key==='title'&&!text))throw new Error(`Confira o tamanho de ${labels[key]} (máximo ${limits[key]}).`);if(key==='title'||key==='message'||text)result[key]=text;}
 if(!canonicalInstant(source.endAt)||typeof source.timeZone!=='string'||!validTimeZone(source.timeZone))throw new Error('Instante ou fuso inválido.');result.endAt=source.endAt;result.timeZone=source.timeZone;
 if(creation&&Date.parse(result.endAt)<=now)throw new Error('Escolha uma data futura para gerar o link.');
 if(source.calendarEndsAt!==undefined){if(!canonicalInstant(source.calendarEndsAt)||source.calendarEndsAt<=result.endAt)throw new Error('O término precisa ser posterior ao início.');result.calendarEndsAt=source.calendarEndsAt;}
 if(source.location!==undefined){if(!result.venue&&!result.address)throw new Error('O ponto precisa de local ou endereço.');result.location=validatePoint(source.location);}
 if(creation&&(result.venue||result.address)&&!result.location)throw new Error('Confirme o ponto do local antes de gerar.');
 if(source.meetingUrl!==undefined&&source.meetingUrl!==''){if(typeof source.meetingUrl!=='string'||source.meetingUrl.length>1024)throw new Error('Link de reunião inválido (máximo 1024 caracteres).');let url:URL;try{url=new URL(source.meetingUrl);}catch{throw new Error('Use um link HTTPS absoluto para a reunião.');}if(url.protocol!=='https:'||url.username||url.password||!url.hostname)throw new Error('A reunião deve usar HTTPS sem credenciais.');result.meetingUrl=source.meetingUrl;}
 return result;
}
export function canonicalJSON(event:EventData):string {const e=validateEvent(event);return JSON.stringify(Object.fromEntries(['title','endAt','timeZone','message','organizer','venue','address','calendarEndsAt','location','meetingUrl'].filter(k=>k in e).map(k=>[k,e[k as keyof EventData]])));}

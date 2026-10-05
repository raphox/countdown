import {currentLocale,type Locale} from '../i18n/index';
export function validTimeZone(zone: string): boolean { try { new Intl.DateTimeFormat('en', { timeZone: zone }).format(); return zone.length <= 64; } catch { return false; } }
export function localParts(ms: number, zone: string): string {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:zone, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(ms).map(x=>[x.type,x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;
}
export function localToUTC(local: string, zone: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local) || !validTimeZone(zone)) throw new Error('Escolha data, hora e fuso IANA válidos.');
  const naive = Date.parse(`${local}:00.000Z`);
  if (!Number.isFinite(naive) || new Date(naive).toISOString().slice(0,16)!==local || +local.slice(0,4)<2000 || +local.slice(0,4)>2100) throw new Error('Data inválida: use os anos 2000 a 2100.');
  const offsets = new Set<number>();
  for(let h=-48; h<=48; h+=3) { const sample=naive+h*3600000; offsets.add(Date.parse(`${localParts(sample,zone)}Z`)-sample); }
  const matches=[...offsets].map(offset=>naive-offset).filter(ms=>localParts(ms,zone)===`${local}:00`);
  if(matches.length!==1) throw new Error(matches.length ? 'Horário ambíguo neste fuso. Escolha outra hora.' : 'Horário inexistente neste fuso. Escolha outra hora.');
  return new Date(matches[0]!).toISOString();
}
export function canonicalInstant(value: unknown): value is string { if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\.000Z$/.test(value))return false; const ms=Date.parse(value);return Number.isFinite(ms)&&new Date(ms).toISOString()===value&&+value.slice(0,4)>=2000&&+value.slice(0,4)<=2100; }
export function formatEventDate(instant:string,zone:string,locale:Locale=currentLocale()):string { return new Intl.DateTimeFormat(locale,{timeZone:zone,dateStyle:'full',timeStyle:'short'}).format(new Date(instant)); }

import type {EventData} from './event-validation';
import {formatEventDate} from './event-time';
export function invitation(e:EventData,url:string):string {return [e.title,`${formatEventDate(e.endAt,e.timeZone)} (${e.timeZone})`,e.calendarEndsAt?`Até ${formatEventDate(e.calendarEndsAt,e.timeZone)}`:'',e.organizer?`Anfitrião / organização: ${e.organizer}`:'',e.venue,e.address,e.message,e.meetingUrl?`Reunião: ${e.meetingUrl}`:'',url].filter(Boolean).join('\n\n');}
export async function copyText(text:string):Promise<boolean>{try{if(!navigator.clipboard)return false;await navigator.clipboard.writeText(text);return true;}catch{return false;}}
export async function nativeShare(e:EventData,url:string):Promise<'shared'|'cancelled'|'fallback'>{if(!navigator.share)return 'fallback';try{await navigator.share({title:e.title,text:invitation(e,url),url});return 'shared';}catch(error){return error instanceof DOMException&&error.name==='AbortError'?'cancelled':'fallback';}}

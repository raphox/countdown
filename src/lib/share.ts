import {translate} from '../i18n/index';
import type {EventData} from './event-validation';
import {formatEventDate} from './event-time';
export function invitation(e:EventData,url=""):string {return [e.title,`${formatEventDate(e.endAt,e.timeZone)} (${e.timeZone})`,e.calendarEndsAt?translate(`Até ${formatEventDate(e.calendarEndsAt,e.timeZone)}`):'',e.organizer?translate(`Anfitrião / organização: ${e.organizer}`):'',e.venue,e.address,e.message,e.meetingUrl?translate(`Reunião: ${e.meetingUrl}`):'',url].filter(Boolean).join('\n\n');}
function copyWithSelection(text:string):boolean {
 if(typeof document==='undefined'||typeof document.execCommand!=='function')return false;
 const previous=document.activeElement as HTMLElement|null;
 const selection=document.getSelection?.();const ranges:Range[]=[];
 if(selection)for(let i=0;i<selection.rangeCount;i++)ranges.push(selection.getRangeAt(i).cloneRange());
 const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.tabIndex=-1;
 area.style.cssText='position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px';
 document.body.append(area);
 try{area.focus({preventScroll:true});area.select();area.setSelectionRange(0,text.length);return document.execCommand('copy');}
 catch{return false;}
 finally{area.remove();previous?.focus({preventScroll:true});if(selection){selection.removeAllRanges();for(const range of ranges)selection.addRange(range);}}
}
export async function copyText(text:string):Promise<boolean>{
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true;}}catch{/* Try the browser's selection-based copy before manual fallback. */}
 return copyWithSelection(text);
}
export async function nativeShare(e:EventData,url:string):Promise<'shared'|'cancelled'|'fallback'>{if(!navigator.share)return 'fallback';try{await navigator.share({title:e.title,text:invitation(e,url)});return 'shared';}catch(error){return error instanceof DOMException&&error.name==='AbortError'?'cancelled':'fallback';}}

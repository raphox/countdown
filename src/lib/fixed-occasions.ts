import {localParts,localToUTC} from './event-time';
/** Date suggestions only; callers must not apply during decoding or duplication. */
export function nextOccasionDate(slug:string,zone:string,now=Date.now()):string|undefined {
 const monthDay=slug==='natal'?'12-25':slug==='ano-novo'?'01-01':undefined;if(!monthDay)return;
 let year=Number(localParts(now,zone).slice(0,4));let date=`${year}-${monthDay}`;if(Date.parse(localToUTC(`${date}T00:00`,zone))<=now)date=`${++year}-${monthDay}`;return year<=2100?date:undefined;
}

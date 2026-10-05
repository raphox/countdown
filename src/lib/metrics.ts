import {themes} from '../data/themes';
const names=['theme_selected','event_created','event_opened','share_attempt','share_completed','calendar_action','create_from_event'] as const;
export type MetricName=typeof names[number];
export type MetricAdapter=(name:MetricName,properties:Record<string,string>)=>void|Promise<void>;
export function metrics(adapter?:MetricAdapter){return (name:MetricName,slug:string,method?:string)=>{if(!names.includes(name)||!themes.some(theme=>theme.slug===slug))return;const p:Record<string,string>={slug};if(name.startsWith('share_')){if(!['native','link','invitation','address'].includes(method??''))return;p.method=method!;}if(name==='calendar_action'){if(!['google','microsoft','ics'].includes(method??''))return;p.destination=method!;}try{void Promise.resolve(adapter?.(name,p)).catch(()=>{});}catch{/* optional */}};}

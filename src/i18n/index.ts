import {english} from './en';
export type Locale='pt-BR'|'en-US';
export function localeFromPath(path:string):Locale{return /(?:^|\/)en-us(?:\/|$)/.test(path)?'en-US':'pt-BR';}
export function currentLocale():Locale{return typeof document!=='undefined'&&document.documentElement?.lang==='en-US'?'en-US':'pt-BR';}
const templates: [RegExp,(...parts:string[])=>string][] = [
 [/^Crie contagens regressivas com (\d+) temas de celebrações, conquistas, encontros e eventos\.$/,n=>`Create countdowns with ${n} themes for celebrations, milestones, gatherings and events.`],
 [/^TEMA (\d+)$/,n=>`THEME ${n}`],
 [/^Explorar os (\d+) temas$/,n=>`Explore all ${n} themes`],
 [/^(\d+) temas encontrados$/,n=>`${n} themes found`],
 [/^Criar contador: (.+)$/,name=>`Create countdown: ${english[name]??name}`],
 [/^Arte de (.+)$/,name=>`Artwork for ${english[name]??name}`],
 [/^Ponto confirmado: (.+)$/,point=>`Location confirmed: ${point}`],
 [/^Destino: (.+)$/,point=>`Destination: ${point}`],
 [/^Local: (.+)$/,point=>`Location: ${point}`],
 [/^Faltam (\d+) dias, (\d+) horas e (\d+) minutos\.$/,(d,h,m)=>`${d} ${d==='1'?'day':'days'}, ${h} ${h==='1'?'hour':'hours'} and ${m} ${m==='1'?'minute':'minutes'} remaining.`],
 [/^Data à meia-noite \(00:00\), no fuso (.+)\. Para escolher horário e detalhes, use Completo\. Ao conferir a prévia ou gerar o link no modo Simples, os detalhes avançados serão descartados\.$/,zone=>`Date at midnight (00:00) in ${zone}. Choose Complete for a specific time and more details. Previewing or generating a link in Simple mode discards advanced details.`],
 [/^Anfitrião \/ organização: (.+)$/,name=>`Host / organizer: ${name}`],
 [/^Entrar na reunião · (.+)$/,host=>`Join meeting · ${host}`],
 [/^Término: (.+)$/,date=>`Ends: ${date}`],
 [/^Até (.+)$/,date=>`Until ${date}`],
 [/^Reunião: (.+)$/,url=>`Meeting: ${url}`],
 [/^Campo (.+) inválido\.$/,field=>`Invalid ${fieldLabel(field)} field.`],
 [/^Confira o tamanho de (.+) \(máximo (\d+)\)\.$/,(field,max)=>`Check the length of ${fieldLabel(field)} (maximum ${max}).`],
 [/^Crie um evento com o tema (.+), escolha título.*$/,()=> 'Choose a title and date, preview your event and share its link. Complete mode lets you add a time, time zone and more details. Anyone can customize a copy without changing the original.'],
 [/^(.+) Crie e compartilhe seu contador com data e fuso horário\.$/,description=>`${english[description]??description} Create and share your countdown with a date and time zone.`],
];
function fieldLabel(value:string):string{return ({'título':'title','mensagem':'message','anfitrião / organização':'host / organizer','local':'venue','endereço':'address'} as Record<string,string>)[value]??value;}
export function translate(text:string,locale:Locale=currentLocale()):string {
 if(locale==='pt-BR')return text;
 const trimmed=text.trim();let result=english[trimmed];
 if(result===undefined)for(const [pattern,render] of templates){const match=trimmed.match(pattern);if(match){result=render(...match.slice(1));break;}}
 return result===undefined?text:text.replace(trimmed,result);
}
export function localizedPath(path:string,locale:Locale,base='/'):string{
 const root=`/${base.split('/').filter(Boolean).join('/')}`.replace(/\/$/,'');
 let suffix=path.startsWith(root+'/')?path.slice(root.length):path;
 suffix=suffix.replace(/^\/(?:en-us|pt-br)(?=\/|$)/,'').replace(/^\/404\.html\/?$/,'/404/');
 return `${root}${locale==='en-US'?'/en-us':'/pt-br'}/${suffix.replace(/^\/+|\/+$/g,'')}`.replace(/\/?$/,'/');
}

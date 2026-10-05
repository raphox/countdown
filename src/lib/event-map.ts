import {translate as tr} from '../i18n/index';
import {validatePoint,type Point} from './event-validation';
const photonEndpoint='https://photon.komoot.io/api/';
export const mapConfig={tiles:import.meta.env.PUBLIC_MAP_TILES||'https://tile.openstreetmap.org/{z}/{x}/{y}.png',search:import.meta.env.PUBLIC_GEOCODER_URL?.trim()||photonEndpoint, attribution:'© OpenStreetMap contributors'};
export function renderMap(root:HTMLElement,point:Point,onPick?:(point:Point)=>void,zoom=13):()=>void {
 const p=validatePoint(point);root.replaceChildren();root.classList.add('event-map');const z=Math.max(1,Math.min(18,Math.round(zoom)));const n=2**z;const lat=Math.max(-85.05112878,Math.min(85.05112878,p.lat));const x=(p.lon+180)/360*n;const y=(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*n;const grid=document.createElement('div');grid.className='map-tiles';
 const state=document.createElement('p');state.className='map-state';state.textContent=tr('Carregando mapa…');let loaded=0;let failed=false;const radius=Math.ceil((root.clientWidth||256)/512);const tileCount=(radius*2+1)*3;
 for(let dy=-1;dy<=1;dy++)for(let dx=-radius;dx<=radius;dx++){const img=document.createElement('img');img.alt='';img.setAttribute('referrerpolicy','strict-origin');img.width=256;img.height=256;img.style.left=`${dx*256+(root.clientWidth||256)/2-(x%1)*256}px`;img.style.top=`${dy*256+160-(y%1)*256}px`;img.src=mapConfig.tiles.replace('{z}',String(z)).replace('{x}',String((Math.floor(x)+dx+n)%n)).replace('{y}',String(Math.max(0,Math.min(n-1,Math.floor(y)+dy))));img.onload=()=>{if(++loaded===tileCount&&!failed)state.textContent=tr('');};img.onerror=()=>{img.hidden=true;failed=true;state.textContent=tr('Mapa indisponível. Use coordenadas, endereço ou o planejador.');};grid.append(img);}
 const marker=document.createElement('span');marker.className='map-marker';marker.textContent=tr('●');marker.setAttribute('aria-label',tr(`Destino: ${p.lat}, ${p.lon}`));const attribution=document.createElement('a');attribution.href='https://www.openstreetmap.org/copyright';attribution.target='_blank';attribution.rel='noopener noreferrer';attribution.className='map-attribution';attribution.textContent=mapConfig.attribution;root.append(grid,marker,state,attribution);
 if(onPick){root.tabIndex=0;root.setAttribute('aria-label',tr('Selecionar ponto no mapa. Use também os campos latitude e longitude.'));const click=(event:MouseEvent)=>{if((event.target as HTMLElement).closest('a'))return;const rect=root.getBoundingClientRect();const px=x+(event.clientX-rect.left-rect.width/2)/256;const py=y+(event.clientY-rect.top-160)/256;onPick(validatePoint({lat:Math.atan(Math.sinh(Math.PI*(1-2*py/n)))*180/Math.PI,lon:((px/n*360)%360+360)%360-180}));};const keydown=(event:KeyboardEvent)=>{const steps:Record<string,[number,number]>={ArrowUp:[1,0],ArrowDown:[-1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};const delta=steps[event.key];if(!delta)return;event.preventDefault();const step=360/n/4;onPick(validatePoint({lat:Math.max(-90,Math.min(90,p.lat+delta[0]*step)),lon:Math.max(-180,Math.min(180,p.lon+delta[1]*step))}));};root.addEventListener('click',click);root.addEventListener('keydown',keydown);return()=>{root.removeEventListener('click',click);root.removeEventListener('keydown',keydown);};}return()=>{};
}
export type LocationChoice={label:string;point:Point};
function locationChoices(data:unknown):LocationChoice[] {
 if(Array.isArray(data))return data.slice(0,5).map(r=>({label:String(r.display_name??r.label??''),point:validatePoint({lat:Number(r.lat),lon:Number(r.lon)})}));
 if(!data||typeof data!=='object'||!('features' in data)||!Array.isArray(data.features))throw new Error('Resposta de endereço inválida. Tente novamente.');
 return data.features.slice(0,5).flatMap(feature=>{
  if(feature?.geometry?.type!=='Point')return [];
  const coordinates=feature.geometry.coordinates;
  if(!Array.isArray(coordinates)||coordinates.length<2)return [];
  try {
   const point=validatePoint({lat:coordinates[1],lon:coordinates[0]});
   const p=feature.properties??{};
   const street=[p.street,p.housenumber].filter(v=>typeof v==='string'&&v.trim()).join(', ');
   const parts=[p.name,street,p.district,p.city??p.county,p.state,p.postcode,p.country].filter((v):v is string=>typeof v==='string'&&!!v.trim());
   return [{point,label:[...new Set(parts)].join(' · ')||tr(`Local: ${point.lat}, ${point.lon}`)}];
  }catch{return [];}
 });
}
/** A small session cache and cooldown avoid repeated requests to the public service. */
export function createLocationSearch(endpoint:string,request:typeof fetch=(...args)=>fetch(...args),now=Date.now){
 const cache=new Map<string,{expires:number;choices:LocationChoice[]}>();
 const pending=new Map<string,Promise<LocationChoice[]>>();
 let nextRequest=0;
 return async(query:string):Promise<LocationChoice[]>=>{
  const normalized=query.trim().normalize('NFC').replace(/\s+/g,' ');
  if(normalized.length<3)throw new Error('Digite pelo menos 3 caracteres para buscar um endereço.');
  const key=normalized.toLocaleLowerCase('pt-BR');
  const cached=cache.get(key);if(cached&&cached.expires>now())return structuredClone(cached.choices);
  const running=pending.get(key);if(running)return structuredClone(await running);
  // The public Photon service is for moderate interactive use, not bulk lookup.
  const publicPhoton=new URL(endpoint).hostname==='photon.komoot.io';
  if(publicPhoton&&now()<nextRequest)throw new Error('Aguarde um instante antes de buscar novamente.');
  nextRequest=now()+1500;
  const task=(async()=>{
   const url=new URL(endpoint);url.searchParams.set('q',normalized);url.searchParams.set('limit','5');
   const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
   try{
    const response=await request(url,{referrerPolicy:'strict-origin',signal:controller.signal});
    if(response.status===429){nextRequest=now()+30000;throw new Error('O serviço está ocupado. Aguarde 30 segundos ou marque o ponto no mapa.');}
    if(!response.ok)throw new Error('Busca indisponível. Tente novamente ou marque o ponto no mapa.');
    const choices=locationChoices(await response.json());
    if(cache.size>=100)cache.delete(cache.keys().next().value!);
    cache.set(key,{expires:now()+15*60*1000,choices});return choices;
   }catch(error){
    if(controller.signal.aborted)throw new Error('A busca demorou demais. Tente novamente ou marque o ponto no mapa.');
    if(error instanceof TypeError)throw new Error('Não foi possível conectar à busca. Tente novamente ou marque o ponto no mapa.');
    throw error;
   }finally{clearTimeout(timeout);}
  })();
  pending.set(key,task);
  try{return structuredClone(await task);}finally{pending.delete(key);}
 };
}
export const searchLocation=createLocationSearch(mapConfig.search);

import {loadConfetti,type Confetti} from './confetti-runtime';
export type Burst=(options?:Record<string,unknown>)=>unknown;
export function mountCelebration(root:HTMLElement,disabled:()=>boolean,burst?:Burst,reset?:()=>void):()=>void {
 const canvas=document.createElement('canvas');canvas.className='event-confetti';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 let renderer:Confetti|undefined;let timer:ReturnType<typeof setInterval>|undefined;let loading=false;let disposed=false;const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const permitted=()=>!disposed&&!disabled()&&!media.matches&&!document.hidden;
 const clear=()=>{reset?.();renderer?.reset();};
 const fire=()=>{if(permitted())void (burst??renderer)?.({particleCount:110,spread:170,startVelocity:50,gravity:.7,decay:.95,ticks:200,origin:{x:.5,y:.07},disableForReducedMotion:true,colors:['#dfb769','#bf7a79','#93a49e','#a393bd']});};
 const refresh=()=>{if(timer)clearInterval(timer);timer=undefined;clear();if(permitted()&&(burst||renderer))timer=setInterval(fire,10000);};
 const prepare=()=>{if(!burst&&!renderer&&!loading&&permitted()){loading=true;void loadConfetti().then(library=>{if(disposed)return;renderer=library.create(canvas,{resize:true,useWorker:false});refresh();fire();}).catch(()=>{}).finally(()=>{loading=false;});}};
 const toggle=()=>{root.classList.toggle('animations-disabled',disabled()||media.matches);refresh();prepare();};
 const visibility=()=>{refresh();prepare();};
 document.addEventListener('visibilitychange',visibility);root.addEventListener('change',toggle);media.addEventListener?.('change',toggle);toggle();if(burst)fire();
 return()=>{disposed=true;if(timer)clearInterval(timer);clear();document.removeEventListener('visibilitychange',visibility);root.removeEventListener('change',toggle);media.removeEventListener?.('change',toggle);canvas.remove();};
}

import {loadConfetti,type Confetti} from './confetti-runtime';
export type Burst=(options?:Record<string,unknown>)=>unknown;
export function mountCelebration(root:HTMLElement,disabled:()=>boolean,burst?:Burst,reset?:()=>void):()=>void {
 const canvas=document.createElement('canvas');canvas.className='event-confetti';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 let renderer:Confetti|undefined;let timer:ReturnType<typeof setInterval>|undefined;let loading=false;let disposed=false;const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const permitted=()=>!disposed&&!disabled()&&!media.matches&&!document.hidden;
 const clear=()=>{reset?.();renderer?.reset();};
 // Keep drawing pixels and displayed pixels in the same proportion, including
 // mobile browser chrome changes and device rotation.
 const sizeCanvas=()=>{const bounds=canvas.getBoundingClientRect();const width=Math.round(bounds.width||window.innerWidth);const height=Math.round(bounds.height||window.innerHeight);if(canvas.width!==width||canvas.height!==height){renderer?.reset();canvas.width=width;canvas.height=height;}};
 const fire=()=>{if(!permitted())return;sizeCanvas();const mobile=window.innerWidth<=700;void (burst??renderer)?.({particleCount:mobile?65:110,spread:mobile?100:170,startVelocity:mobile?28:50,gravity:.7,decay:.95,ticks:200,origin:{x:.5,y:.07},flat:false,shapes:['square','circle'],disableForReducedMotion:true,colors:['#dfb769','#bf7a79','#93a49e','#a393bd']});};
 const refresh=()=>{if(timer)clearInterval(timer);timer=undefined;clear();if(permitted()&&(burst||renderer))timer=setInterval(fire,10000);};
 const prepare=()=>{if(!burst&&!renderer&&!loading&&permitted()){loading=true;void loadConfetti().then(library=>{if(disposed)return;renderer=library.create(canvas,{resize:false,useWorker:false});refresh();fire();}).catch(()=>{}).finally(()=>{loading=false;});}};
 const toggle=()=>{root.classList.toggle('animations-disabled',disabled()||media.matches);refresh();prepare();};
 const visibility=()=>{refresh();prepare();};
 window.addEventListener('resize',sizeCanvas);window.visualViewport?.addEventListener('resize',sizeCanvas);sizeCanvas();
 document.addEventListener('visibilitychange',visibility);root.addEventListener('change',toggle);media.addEventListener?.('change',toggle);toggle();if(burst)fire();
 return()=>{window.removeEventListener('resize',sizeCanvas);window.visualViewport?.removeEventListener('resize',sizeCanvas);disposed=true;if(timer)clearInterval(timer);clear();document.removeEventListener('visibilitychange',visibility);root.removeEventListener('change',toggle);media.removeEventListener?.('change',toggle);canvas.remove();};
}

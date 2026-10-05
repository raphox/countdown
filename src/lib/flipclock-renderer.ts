import {flipClock,counter,theme,css} from 'flipclock';
import {mountCountdown,remaining} from './countdown-renderer';
export function mountFlipCountdown(root:HTMLElement,endAt:string,ending:string,clock=Date.now):()=>void {
 const initial=remaining(endAt,clock());root.style.setProperty('--day-digits',String(Math.max(2,String(initial.days).length)));
 const entries=(['days','hours','minutes','seconds'] as const).map(unit=>{const parent=root.querySelector<HTMLElement>(`[data-unit="${unit}"]`)!;parent.replaceChildren();const face=counter({value:initial[unit],format:value=>String(value).padStart(2,'0')});const instance=flipClock({parent,autoStart:false,face,theme:theme({css:css({fontSize:'var(--flip-digit-size)',fontFamily:'"Contagem Local 05", system-ui, sans-serif',animationDuration:'240ms'})})});return {unit,face,instance};});
 root.dataset.renderer='flipclock-1.0.1';
 const stop=mountCountdown(root,endAt,ending,clock,undefined,r=>{for(const {unit,face}of entries)face.value.value=r[unit];});
 return()=>{stop();for(const {instance}of entries)instance.stop().unmount();delete root.dataset.renderer;};
}

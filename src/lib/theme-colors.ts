/** Darken a theme's accent only as needed for white control text contrast. */
export function readableAccent(hex:string):string {
 const channels=hex.replace('#','').match(/.{2}/g)!.map(v=>parseInt(v,16));
 const luminance=(rgb:number[])=>rgb.map(v=>{const c=v/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i]!,0);
 let rgb=channels;for(let factor=1;1.05/(luminance(rgb)+.05)<4.5;factor-=.05)rgb=channels.map(v=>Math.round(v*Math.max(.1,factor)));
 return '#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('');
}

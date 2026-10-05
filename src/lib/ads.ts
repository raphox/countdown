export type AdState='off'|'loading'|'filled'|'no-fill'|'error';
export type AdAdapter=()=>Promise<'filled'|'no-fill'>;
export async function loadAd(root:HTMLElement,state:'catalog'|'event'|'creator'|'preview'|'error',adapter?:AdAdapter){root.hidden=true;if(!adapter||!['catalog','event'].includes(state))return 'off' as AdState;root.hidden=false;root.dataset.state='loading';try{const result=await adapter();root.dataset.state=result;return result;}catch{root.dataset.state='error';return 'error' as AdState;}}
export function testAdAdapter(state:'filled'|'no-fill'|'error'):AdAdapter{return async()=>{if(state==='error')throw new Error('test');return state;};}

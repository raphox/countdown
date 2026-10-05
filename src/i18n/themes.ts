import {themes,categories} from '../data/themes';
import {translate,type Locale} from './index';
const aliases:Record<string,string[]>={
 aniversario:['birthday','bday','b-day'], 'ano-novo':['new year','new years eve',"new year's eve","new year's day",'nye'], natal:['christmas','xmas'],familia:['family','family reunion'],empresa:['company','corporate','team building'],
 'formatura-fundamental':['middle school','school graduation'],'formatura-ensino-medio':['high school','graduation'],'formatura-faculdade':['college','university','graduation'],casamento:['wedding','marriage'],viagem:['travel','vacation','holiday','trip'],'cha-de-bebe':['baby shower','new baby'],
 'evento-tecnologia':['tech','technology','programming','conference'],'evento-medicina':['medical','medicine','health','healthcare','medical conference'],'evento-direito':['law','legal','justice','law conference','attorney'],festa:['party','celebration','carnival','mardi gras','festival'],'evento-politico':['politics','political','inauguration','taking office','debate','convention','rally'],'encontro-amigos':['friends','friends gathering','friends reunion','get together','hangout','reunion','meetup'],jantar:['dinner','dinner party','supper','evening meal','dining'],zoeira:['jokes','fun','prank','humor','friends','memes','goofing around'],
};
export function localizedThemes(locale:Locale){return themes.map(t=>({...t,name:translate(t.name,locale),description:translate(t.description,locale),ending:{...t.ending,message:translate(t.ending.message,locale)},aliases:locale==='en-US'?[...aliases[t.slug]??[],...t.aliases]:t.aliases}));}
export function localizedCategories(locale:Locale){return categories.map(c=>({...c,name:translate(c.name,locale),description:translate(c.description,locale)}));}

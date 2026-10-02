function Card({p,wish,onWish,onAdd,onView}){
  const off=Math.round((1-p.price/p.mrp)*100);
  return h('article',{className:'card'},
    h('button',{className:'pic',onClick:()=>onView(p),'aria-label':'Quick view '+p.name},h(Pic,{p}),
      h('span',{className:'badge off'},off+'% off'),p.bogo&&h('span',{className:'badge bogo'},'Buy 1 Get 1 FREE')),
    h('button',{className:'heart'+(wish?' on':''),onClick:()=>onWish(p.id),'aria-label':'Save to wishlist','aria-pressed':wish},wish?'♥':'♡'),
    h('div',{className:'info'},h('h3',null,p.name),h('p',{className:'cat'},p.cat),
      h('p',{className:'price'},h('b',null,money(p.price)),h('s',null,money(p.mrp))),
      h('button',{className:'btn',onClick:()=>onAdd(p.id)},'Add to cart')));
}

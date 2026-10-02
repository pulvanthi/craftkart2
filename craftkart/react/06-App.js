function App(){
  const P=window.PRODUCTS,cats=['All',...new Set(P.map(p=>p.cat))];
  const [cart,setCart]=useState(()=>load('ck-cart',{}));
  const [wish,setWish]=useState(()=>load('ck-wish',[]));
  const [cat,setCat]=useState('All'),[q,setQ]=useState(''),[sort,setSort]=useState('hot');
  const [open,setOpen]=useState(false),[view,setView]=useState(null),[code,setCode]=useState(''),[applied,setApplied]=useState(false);
  const [toast,setToast]=useState(''),[done,setDone]=useState(false),[onlyBogo,setOnlyBogo]=useState(false);
  const left=useCountdown();
  useEffect(()=>localStorage.setItem('ck-cart',JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem('ck-wish',JSON.stringify(wish)),[wish]);
  const say=m=>{setToast(m);clearTimeout(say.t);say.t=setTimeout(()=>setToast(''),1800)};
  const add=(id,d=1)=>{setCart(c=>{const n=(c[id]||0)+d,x={...c};n<=0?delete x[id]:x[id]=n;return x});if(d>0)say('Added to cart')};
  const toggleWish=id=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  const list=useMemo(()=>{
    let l=P.filter(p=>(cat==='All'||p.cat===cat)&&(!onlyBogo||p.bogo)&&p.name.toLowerCase().includes(q.toLowerCase()));
    if(sort==='low')l=[...l].sort((a,b)=>a.price-b.price);
    if(sort==='high')l=[...l].sort((a,b)=>b.price-a.price);
    if(sort==='off')l=[...l].sort((a,b)=>b.mrp/b.price-a.mrp/a.price);
    return l;
  },[cat,q,sort,onlyBogo]);

  const lines=Object.entries(cart).map(([id,qty])=>{const p=P.find(x=>x.id==id),free=p.bogo?Math.floor(qty/2):0;return{p,qty,free,total:(qty-free)*p.price,mrpTotal:qty*p.mrp}});
  const sub=lines.reduce((a,l)=>a+l.total,0),mrpSum=lines.reduce((a,l)=>a+l.mrpTotal,0);
  const coupon=applied?Math.round(sub*.1):0,ship=sub===0||sub>=999?0:59,total=sub-coupon+ship;
  const count=lines.reduce((a,l)=>a+l.qty,0),FREE_AT=999,pct=Math.min(100,sub/FREE_AT*100);
  const tryCode=()=>{if(code.trim().toUpperCase()==='CRAFT10'){setApplied(true);say('CRAFT10 applied')}else say('That code is not valid')};
  const order=()=>{setCart({});setApplied(false);setOpen(false);setDone(true)};

  return h(React.Fragment,null,
    h('div',{className:'ticker'},h('div',{className:'track'},Array(8).fill('Buy 1 Get 1 FREE on tagged items ✺ Flash prices end in '+left+' ✺ Free delivery over ₹999 ✺ ').map((t,i)=>h('span',{key:i},t)))),
    h('header',{className:'top'},h('a',{className:'logo',href:'#'},'Craft',h('i',null,'Kart')),
      h('input',{className:'search',type:'search',placeholder:'Search yarn, pens, clay…','aria-label':'Search products',value:q,onChange:e=>setQ(e.target.value)}),
      h('button',{className:'cartbtn',onClick:()=>setOpen(true)},'Cart',h('span',null,count))),
    h('section',{className:'hero'},
      h('div',null,h('h1',null,'Make something messy.'),
        h('p',null,'Beginner kits, tiny-budget supplies and sticker-worthy stationery. Real discounts on everything, and a free one on the BOGO picks.'),
        h('div',{className:'row'},h('a',{className:'btn big',href:'#shop'},'Shop the drop'),h('button',{className:'btn ghost big',onClick:()=>{setOnlyBogo(true);location.hash='shop'}},'See BOGO picks'))),
      h('div',{className:'collage'},h('div',{className:'sticker s1'},h(Art,{p:P[3]})),h('div',{className:'sticker s2'},h(Art,{p:P[7]})),h('div',{className:'sticker s3'},h(Art,{p:P[1]})),
        h('div',{className:'stamp'},'Buy 1',h('br'),'Get 1',h('br'),'FREE'))),
    h('main',{id:'shop'},
      h('div',{className:'bar'},h('div',{className:'chips'},cats.map(c=>h('button',{key:c,className:'chip'+(cat===c?' on':''),onClick:()=>setCat(c)},c)),
        h('button',{className:'chip bogochip'+(onlyBogo?' on':''),onClick:()=>setOnlyBogo(!onlyBogo),'aria-pressed':onlyBogo},'BOGO only')),
        h('label',null,'Sort ',h('select',{value:sort,onChange:e=>setSort(e.target.value)},h('option',{value:'hot'},'Featured'),h('option',{value:'off'},'Biggest discount'),h('option',{value:'low'},'Price: low to high'),h('option',{value:'high'},'Price: high to low')))),
      list.length?h('div',{className:'grid'},list.map(p=>h(Card,{key:p.id,p,wish:wish.includes(p.id),onWish:toggleWish,onAdd:add,onView:setView}))):
        h('p',{className:'empty'},'Nothing matches that. Clear the search or pick another category.')),
    h('section',{className:'inspo'},h('h2',null,'Need inspo?'),h('p',null,'Browse what other makers are creating, then come back and shop the supplies.'),
      h('div',{className:'row'},
        h('a',{className:'btn',target:'_blank',rel:'noopener',href:'https://www.instagram.com/explore/tags/craftideas/'},'Instagram #craftideas'),
        h('a',{className:'btn ghost',target:'_blank',rel:'noopener',href:'https://www.pinterest.com/search/pins/?q=diy%20craft%20ideas'},'Pinterest DIY ideas'))),
    h('footer',null,'CraftKart · made for makers · prices in INR'),

    view&&h('div',{className:'modal',onClick:()=>setView(null)},h('div',{className:'sheet',role:'dialog','aria-modal':true,onClick:e=>e.stopPropagation()},
      h('div',{className:'qpic'},h(Pic,{p:view})),
      h('div',null,h('h2',null,view.name),h('p',{className:'cat'},view.cat),
        h('p',{className:'price'},h('b',null,money(view.price)),h('s',null,money(view.mrp)),' You save '+money(view.mrp-view.price)),
        view.bogo&&h('p',{className:'note'},'Buy 1 Get 1 FREE: add 2 and pay for 1.'),
        h('div',{className:'row'},h('button',{className:'btn',onClick:()=>{add(view.id);setView(null)}},'Add to cart'),h('button',{className:'btn ghost',onClick:()=>setView(null)},'Close'))))),

    open&&h('div',{className:'modal side',onClick:()=>setOpen(false)},h('aside',{className:'drawer',role:'dialog','aria-modal':true,onClick:e=>e.stopPropagation()},
      h('div',{className:'dh'},h('h2',null,'Your cart'),h('button',{className:'x',onClick:()=>setOpen(false),'aria-label':'Close cart'},'✕')),
      lines.length===0?h('p',{className:'empty'},'Your cart is empty. Add something messy.'):h(React.Fragment,null,
        h('div',{className:'ship'},h('p',null,sub>=FREE_AT?'You unlocked free delivery':'Add '+money(FREE_AT-sub)+' more for free delivery'),h('div',{className:'meter'},h('i',{style:{width:pct+'%'}}))),
        h('ul',{className:'lines'},lines.map(l=>h('li',{key:l.p.id},h('div',{className:'mini'},h(Pic,{p:l.p})),
          h('div',{className:'lt'},h('b',null,l.p.name),l.free>0&&h('small',{className:'free'},l.free+' FREE via BOGO'),
            h('div',{className:'qty'},h('button',{onClick:()=>add(l.p.id,-1),'aria-label':'Decrease'},'−'),h('span',null,l.qty),h('button',{onClick:()=>add(l.p.id),'aria-label':'Increase'},'+'))),
          h('div',{className:'lp'},money(l.total),l.total<l.mrpTotal&&h('s',null,money(l.mrpTotal)))))),
        h('div',{className:'code'},h('input',{placeholder:'Promo code (try CRAFT10)',value:code,onChange:e=>setCode(e.target.value),'aria-label':'Promo code'}),h('button',{className:'btn',onClick:tryCode},'Apply')),
        h('dl',{className:'sum'},h('dt',null,'Total MRP'),h('dd',null,money(mrpSum)),h('dt',null,'Discounts and BOGO'),h('dd',{className:'free'},'−'+money(mrpSum-sub)),
          applied&&h(React.Fragment,null,h('dt',null,'CRAFT10 (10%)'),h('dd',{className:'free'},'−'+money(coupon))),
          h('dt',null,'Delivery'),h('dd',null,ship?money(ship):'Free'),h('dt',{className:'tot'},'You pay'),h('dd',{className:'tot'},money(total))),
        h('button',{className:'btn big full',onClick:order},'Place order')))),

    done&&h('div',{className:'modal',onClick:()=>setDone(false)},h('div',{className:'sheet thanks',onClick:e=>e.stopPropagation()},
      h('div',{className:'burst'},'✺'),h('h2',null,'Order placed!'),h('p',null,'Thanks for shopping CraftKart. Your supplies are on the way.'),h('button',{className:'btn',onClick:()=>setDone(false)},'Keep shopping'))),
    h('div',{className:'toast'+(toast?' show':''),role:'status'},toast));
}

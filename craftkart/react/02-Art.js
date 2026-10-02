function Art({p}){
  const k=p.kind,s={fill:p.c2,stroke:INK,strokeWidth:5};
  let g;
  if(k==='yarn')g=[h('circle',{key:1,cx:100,cy:105,r:55,...s}),h('path',{key:2,d:'M60 90q40 25 80 0M52 115q48 30 96 0M70 65q30 20 60 0',fill:'none',stroke:INK,strokeWidth:4})];
  else if(k==='tape')g=[h('circle',{key:1,cx:100,cy:100,r:60,...s}),h('circle',{key:2,cx:100,cy:100,r:22,fill:p.c1,stroke:INK,strokeWidth:5})];
  else if(k==='book')g=[h('rect',{key:1,x:55,y:35,width:90,height:130,rx:8,...s}),h('path',{key:2,d:'M75 35v130',stroke:INK,strokeWidth:5}),h('circle',{key:3,cx:110,cy:80,r:6,fill:INK}),h('circle',{key:4,cx:110,cy:110,r:6,fill:INK})];
  else if(k==='pens')g=[0,1,2].map(i=>h('g',{key:i,transform:`rotate(${-20+i*20} 100 110)`},h('rect',{x:88,y:30,width:24,height:130,rx:10,...s,fill:['#FFE66D',p.c2,'#fff'][i]}),h('path',{d:'M88 160l12 20 12-20z',fill:INK})));
  else if(k==='beads')g=[0,1,2,3,4].map(i=>h('circle',{key:i,cx:40+i*30,cy:100+(i%2)*14,r:17,...s,fill:['#FFE66D',p.c2,'#fff','#D6F25B','#8E6BFF'][i]}));
  else if(k==='hoop')g=[h('circle',{key:1,cx:100,cy:100,r:62,fill:'#fff',stroke:INK,strokeWidth:8}),h('path',{key:2,d:'M70 115q30-70 60 0M85 105q15-30 30 0',fill:'none',stroke:p.c2,strokeWidth:7,strokeLinecap:'round'}),h('rect',{key:3,x:90,y:30,width:20,height:14,fill:INK})];
  else if(k==='clay')g=[h('path',{key:1,d:'M45 130q-10-60 55-70t60 55q-10 40-60 35t-55-20z',...s}),h('circle',{key:2,cx:85,cy:100,r:6,fill:INK}),h('circle',{key:3,cx:120,cy:100,r:6,fill:INK})];
  else g=[h('rect',{key:1,x:60,y:70,width:80,height:90,rx:14,...s}),h('rect',{key:2,x:55,y:45,width:90,height:28,rx:8,fill:'#fff',stroke:INK,strokeWidth:5}),h('path',{key:3,d:'M75 105h50',stroke:INK,strokeWidth:5})];
  return h('svg',{viewBox:'0 0 200 200','aria-label':p.name,role:'img'},h('rect',{width:200,height:200,fill:p.c1}),g);
}

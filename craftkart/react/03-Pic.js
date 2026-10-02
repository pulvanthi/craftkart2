function Pic({p}){
  const [bad,setBad]=useState(false);
  return bad?h(Art,{p}):h('img',{src:'images/'+p.img,alt:p.name,loading:'lazy',onError:()=>setBad(true)});
}

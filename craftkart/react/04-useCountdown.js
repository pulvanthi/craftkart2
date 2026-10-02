function useCountdown(){
  const calc=()=>{const n=new Date(),e=new Date(n);e.setHours(24,0,0,0);const s=Math.floor((e-n)/1000);return [s/3600|0,(s%3600)/60|0,s%60].map(x=>String(x).padStart(2,'0')).join(':')};
  const [t,setT]=useState(calc);useEffect(()=>{const i=setInterval(()=>setT(calc()),1000);return()=>clearInterval(i)},[]);return t;
}

const money=n=>'₹'+n.toLocaleString('en-IN');
const INK='#1D1B3A';
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};

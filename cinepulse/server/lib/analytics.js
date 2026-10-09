const POSITIVE=new Set(['amazing','excellent','great','good','love','loved','beautiful','brilliant','fantastic','wonderful','enjoyed','awesome','best']);
const NEGATIVE=new Set(['bad','boring','awful','terrible','poor','hate','hated','worst','disappointing','slow','dull']);
function sentiment(text){const words=(text.toLowerCase().match(/[a-z]+/g)||[]);let p=0,n=0;for(const w of words){if(POSITIVE.has(w))p++;if(NEGATIVE.has(w))n++;}return p+n?(p-n)/(p+n):0;}
function wilson(up,down){const n=up+down;if(!n)return 0;const z=1.96,p=up/n;return (p+z*z/(2*n)-z*Math.sqrt((p*(1-p)+z*z/(4*n))/n))/(1+z*z/n);}
function weighted(avg,count,global=3.5,prior=10){return (count*avg+prior*global)/(count+prior);}
function trend(dates,now=Date.now(),decay=.15){return dates.reduce((s,d)=>s+Math.exp(-decay*Math.max(0,(now-new Date(d).getTime())/86400000)),0);}
function cosine(a,b){const dot=a.reduce((s,v,i)=>s+v*b[i],0),ma=Math.hypot(...a),mb=Math.hypot(...b);return ma&&mb?dot/(ma*mb):0;}
function analyze(movies,reviews){const global=reviews.length?reviews.reduce((s,r)=>s+r.rating,0)/reviews.length:3.5;return movies.map(movie=>{const rs=reviews.filter(r=>String(r.movie)===String(movie._id));const count=rs.length,avg=count?rs.reduce((s,r)=>s+r.rating,0)/count:0;const distribution=[1,2,3,4,5].map(n=>rs.filter(r=>r.rating===n).length);return {...movie,count,average:avg,weighted:count?weighted(avg,count,global):0,trending:trend(rs.map(r=>r.createdAt)),sentiment:count?rs.reduce((s,r)=>s+r.sentiment,0)/count:0,distribution};});}
module.exports={sentiment,wilson,weighted,trend,cosine,analyze};

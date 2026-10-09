const test=require('node:test'),assert=require('node:assert/strict');
const {sentiment,wilson,weighted,trend,cosine,analyze}=require('../lib/analytics');
test('sentiment polarity',()=>{assert.equal(sentiment('great excellent'),1);assert.equal(sentiment('awful bad'),-1);assert.equal(sentiment('ordinary movie'),0)});
test('weighted rating and Wilson',()=>{assert.ok(Math.abs(weighted(5,2,3.5,20)-80/22)<1e-8);assert.equal(wilson(0,0),0);assert.ok(wilson(10,0)>wilson(1,0));});
test('decay and similarity',()=>{const now=Date.now();assert.ok(trend([new Date(now)],now)>trend([new Date(now-86400000*10)],now));assert.equal(cosine([1,0],[0,1]),0);assert.equal(cosine([1,0],[1,0]),1)});
test('rating distribution',()=>{const m={_id:'m1',title:'Film',genres:[]};const r=[{movie:'m1',rating:5,createdAt:new Date(),sentiment:1}];const x=analyze([m],r)[0];assert.equal(x.count,1);assert.deepEqual(x.distribution,[0,0,0,0,1]);});

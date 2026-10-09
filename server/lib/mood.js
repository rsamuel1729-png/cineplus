const {analyze} = require('./analytics');

const MOODS = {
  happy: {label:'Happy and upbeat', genres:['Comedy','Musical','Music','Family']},
  stressed: {label:'Stressed and looking to unwind', genres:['Food','Slice of Life','Nature']},
  sad: {label:'A little down', genres:['Drama','Romance','War','Biography']},
  bored: {label:'Bored and ready for a spark', genres:['Action','Thriller','Crime','Adventure']},
  curious: {label:'Curious and open to ideas', genres:['Mystery','Documentary']},
  nostalgic: {label:'Nostalgic', genres:[]}
};

const INTENTS = {
  match: {label:'Stay with this vibe', genres:[]},
  lift: {label:'Lift my mood', genres:['Comedy','Musical','Animation','Adventure']},
  relax: {label:'Help me unwind', genres:['Food','Slice of Life','Nature']},
  excite: {label:'Give me an adventure', genres:['Action','Adventure','Thriller','Sci-Fi']},
  think: {label:'Make me think', genres:['Sci-Fi','Mystery','Documentary','Drama']}
};

function recommendByMood(movies,reviews,mood,intent){
  const moodProfile=MOODS[mood],intentProfile=INTENTS[intent];
  const candidates=analyze(movies,reviews).map(movie=>{
    const movieGenres=new Set((movie.genres||[]).map(g=>g.toLowerCase()));
    const moodHits=moodProfile.genres.filter(g=>movieGenres.has(g.toLowerCase()));
    const intentGenres=intent==='match'?moodProfile.genres:intentProfile.genres;
    const intentHits=intentGenres.filter(g=>movieGenres.has(g.toLowerCase()));
    const moodFit=mood==='nostalgic'?(movie.year&&movie.year<=2000?1:0):moodHits.length/Math.max(1,moodProfile.genres.length);
    const intentFit=intentHits.length/Math.max(1,intentGenres.length);
    const moodScore=intent==='match'?moodFit:(moodFit*.65+intentFit*.35);
    return {...movie,moodFit:Number(moodScore.toFixed(2)),moodHits,intentHits};
  });
  const hasMoodMatch=candidates.some(m=>m.moodHits.length||m.intentHits.length||m.moodFit>0);
  const maxTrend=Math.max(1,...candidates.map(m=>m.trending||0));
  return candidates.map(movie=>{
    const popularity=(movie.weighted||0)/5;
    const recency=(movie.trending||0)/maxTrend;
    const score=hasMoodMatch?movie.moodFit*.9+popularity*.07+recency*.03:popularity*.68+recency*.32;
    const matching=[...new Set([...movie.moodHits,...movie.intentHits])];
    const reason=hasMoodMatch
      ? mood==='nostalgic'&&movie.moodFit>0?`A nostalgic classic from ${movie.year}, chosen for your mood.`:matching.length?`Fits your ${moodProfile.label.toLowerCase()} mood with ${matching.join(', ')}; selected to ${intentProfile.label.toLowerCase()}.`:'A popular option from the catalog, ranked by audience rating and recent activity.'
      :`Closest available pick: no movies match this mood in the current catalog, so this is ranked by audience rating and recent activity.`;
    return {...movie,moodScore:Number(score.toFixed(3)),reason};
  }).sort((a,b)=>b.moodScore-a.moodScore||b.weighted-a.weighted).slice(0,6);
}

module.exports={MOODS,INTENTS,recommendByMood};

require('dotenv').config();
const mongoose=require('mongoose');
const {Movie}=require('./models');

const movies=[
  ['Interstellar','Sci-fi adventure through space and time',['Sci-Fi','Adventure'],2014],
  ['Inception','A thriller exploring layered dreams',['Sci-Fi','Thriller'],2010],
  ['The Martian','An astronaut works to survive on Mars',['Sci-Fi','Adventure'],2015],
  ['The Dark Knight','A superhero crime drama',['Action','Crime'],2008],
  ['Arrival','A linguist investigates an alien arrival',['Sci-Fi','Drama'],2016],
  ['Spirited Away','A magical animated adventure',['Animation','Fantasy'],2001],
  ['Dune','A journey across a desert world',['Sci-Fi','Adventure'],2021],
  ['Parasite','A dark social thriller',['Thriller','Drama'],2019],

  ['Paddington 2','A kind bear brings warmth and laughter to a new community',['Comedy','Family'],2017],
  ['School of Rock','A spirited musician inspires students through rock music',['Comedy','Music'],2003],
  ['The Grand Budapest Hotel','A whimsical caper at a famous European hotel',['Comedy','Adventure'],2014],
  ['Singin’ in the Rain','A joyful musical comedy set during Hollywood’s transition to sound',['Musical','Comedy','Romance'],1952],
  ['Little Forest','A young woman returns home and finds calm in cooking and the seasons',['Drama','Food'],2018],
  ['Chef','A chef starts over with a food truck and reconnects with his family',['Comedy','Drama','Food'],2014],
  ['My Neighbor Totoro','Two sisters find wonder and comfort in the countryside',['Animation','Family','Fantasy'],1988],
  ['Perfect Days','A quiet story about finding meaning in everyday routines',['Drama','Slice of Life'],2023],
  ['Paterson','A bus driver finds poetry and small moments of beauty in daily life',['Drama','Slice of Life'],2016],
  ['Our Little Sister','Three sisters welcome a younger sibling and build a gentle new family life',['Drama','Slice of Life','Family'],2015],
  ['The Hundred-Foot Journey','A young chef brings two neighboring food traditions together',['Drama','Food','Romance'],2014],
  ['The Pursuit of Happyness','A father faces hardship while building a better future for his son',['Drama','Biography'],2006],
  ['A Walk to Remember','A heartfelt coming-of-age story about love and change',['Romance','Drama'],2002],
  ['Grave of the Fireflies','Two siblings struggle to survive during wartime',['Animation','Drama','War'],1988],
  ['The Green Mile','A prison guard encounters a man with an extraordinary gift',['Drama','Fantasy'],1999],
  ['Mad Max: Fury Road','A high-speed escape across a dangerous post-apocalyptic wasteland',['Action','Adventure','Sci-Fi'],2015],
  ['Mission: Impossible – Fallout','An agent races to stop a global catastrophe',['Action','Thriller'],2018],
  ['Top Gun: Maverick','A veteran pilot returns to train a new generation',['Action','Drama'],2022],
  ['John Wick','A retired hitman is pulled back into the criminal underworld',['Action','Crime','Thriller'],2014],
  ['Knives Out','A detective investigates a family after a famous mystery writer dies',['Mystery','Comedy','Crime'],2019],
  ['The Prestige','Two rival magicians push their craft into dangerous territory',['Mystery','Thriller','Drama'],2006],
  ['2001: A Space Odyssey','A voyage through space raises questions about humanity and intelligence',['Sci-Fi','Mystery'],1968],
  ['Free Solo','A climber prepares for a ropeless ascent of El Capitan',['Documentary','Adventure'],2018],
  ['The Biggest Little Farm','A couple works with nature to restore a struggling farm',['Documentary','Nature'],2018],
  ['The Social Dilemma','A documentary examines the effects of social media and technology',['Documentary'],2020],
  ['The Imitation Game','A mathematician and his team work to decode wartime messages',['History','Drama','Thriller'],2014],
  ['Back to the Future','A teenager travels through time and changes his family’s past',['Sci-Fi','Comedy','Adventure'],1985],
  ['Coco','A young musician discovers his family’s history in the Land of the Dead',['Animation','Family','Music'],2017],
  ['Cinema Paradiso','A filmmaker remembers the theater and friendships of his childhood',['Drama','Romance'],1988],
  ['The Goonies','A group of friends follow a map on a neighborhood adventure',['Adventure','Family','Comedy'],1985],
  ['Stand by Me','Four friends set out on a journey that marks the end of childhood',['Adventure','Drama'],1986],
  ['Kiki’s Delivery Service','A young witch builds confidence while starting a new life in a seaside town',['Animation','Fantasy','Family'],1989],
  ['The Conjuring','Paranormal investigators help a family in a remote farmhouse',['Horror','Mystery'],2013],
  ['La La Land','Two artists pursue their ambitions and relationship in Los Angeles',['Musical','Romance','Drama'],2016],
  ['The Sound of Music','A music-loving governess brings songs and warmth to a family',['Musical','Music','History','Family'],1965],
  ['Grease','A summer romance continues when two students meet again at school',['Musical','Music','Romance'],1978],
  ['Casablanca','An American expatriate faces a difficult choice during wartime',['Romance','Drama','War','History'],1942],
  ['Pride & Prejudice','Elizabeth Bennet and Mr. Darcy overcome first impressions in Regency England',['Romance','Drama','History'],2005],
  ['The Lion King','A young lion finds his place in the circle of life',['Animation','Musical','Family'],1994],
  ['Jurassic Park','Visitors encounter living dinosaurs at a remote theme park',['Sci-Fi','Adventure','Thriller'],1993]
];

(async()=>{
  await mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/cinepulse');
  for(const [title,description,genres,year] of movies){
    if(!await Movie.exists({title}))await Movie.create({title,description,genres,year});
  }
  console.log(`Seeded catalog with ${movies.length} curated titles; existing movies preserved`);
  await mongoose.disconnect();
})().catch(e=>{console.error(e);process.exit(1)});

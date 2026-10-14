require('dotenv').config();
const mongoose=require('mongoose');
const {Movie,Review}=require('./models');

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

const wikiTitles={
  Interstellar:'Interstellar_(film)', 'The Martian':'The_Martian_(film)', Arrival:'Arrival_(film)',
  Dune:'Dune_(2021_film)', Parasite:'Parasite_(2019_film)', 'The Grand Budapest Hotel':'The_Grand_Budapest_Hotel',
  'Singin’ in the Rain':'Singin%27_in_the_Rain', 'Little Forest':'Little_Forest_(2018_film)',
  'My Neighbor Totoro':'My_Neighbor_Totoro', 'Perfect Days':'Perfect_Days', Paterson:'Paterson_(film)',
  'Our Little Sister':'Our_Little_Sister', 'The Hundred-Foot Journey':'The_Hundred-Foot_Journey',
  'The Pursuit of Happyness':'The_Pursuit_of_Happyness', 'A Walk to Remember':'A_Walk_to_Remember',
  'Grave of the Fireflies':'Grave_of_the_Fireflies', 'The Green Mile':'The_Green_Mile_(film)',
  'Mad Max: Fury Road':'Mad_Max:_Fury_Road', 'Mission: Impossible – Fallout':'Mission:_Impossible_–_Fallout',
  'Top Gun: Maverick':'Top_Gun:_Maverick', 'John Wick':'John_Wick_(film)', 'Knives Out':'Knives_Out',
  'The Prestige':'The_Prestige_(film)', '2001: A Space Odyssey':'2001:_A_Space_Odyssey_(film)',
  'Free Solo':'Free_Solo', 'The Biggest Little Farm':'The_Biggest_Little_Farm',
  'The Social Dilemma':'The_Social_Dilemma', 'The Imitation Game':'The_Imitation_Game',
  'Back to the Future':'Back_to_the_Future', Coco:'Coco_(2017_film)', 'Cinema Paradiso':'Cinema_Paradiso',
  'The Goonies':'The_Goonies', 'Stand by Me':'Stand_by_Me_(film)',
  'Kiki’s Delivery Service':'Kiki’s_Delivery_Service', 'The Conjuring':'The_Conjuring',
  'La La Land':'La_La_Land', 'Pride & Prejudice':'Pride_%26_Prejudice_(2005_film)',
  'The Lion King':'The_Lion_King'
};
const verifiedPosterUrls={
  Interstellar:'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
  Inception:'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
  'The Martian':'https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg',
  'The Dark Knight':'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
  Arrival:'https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg',
  'Spirited Away':'https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png',
  Dune:'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg',
  Parasite:'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png',
  'Paddington 2':'https://upload.wikimedia.org/wikipedia/en/b/b6/Paddington_2_poster.jpg',
  'School of Rock':'https://upload.wikimedia.org/wikipedia/en/1/11/School_of_Rock_Poster.jpg',
  'The Grand Budapest Hotel':'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png',
  'Singinâ€™ in the Rain':'https://upload.wikimedia.org/wikipedia/commons/5/5d/Singin%27_in_the_Rain_%281952_poster%29.jpg',
  Chef:'https://upload.wikimedia.org/wikipedia/en/b/b8/Chef_2014.jpg',
  'My Neighbor Totoro':'https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg',
  'Perfect Days':'https://upload.wikimedia.org/wikipedia/en/c/c9/Perfect_Days_poster.jpg',
  'Our Little Sister':'https://upload.wikimedia.org/wikipedia/en/4/4b/Our_Little_Sister_poster.jpeg',
  'The Pursuit of Happyness':'https://upload.wikimedia.org/wikipedia/en/8/81/Poster-pursuithappyness.jpg',
  'A Walk to Remember':'https://upload.wikimedia.org/wikipedia/en/d/dc/A_Walk_to_Remember_Poster.jpg',
  'Grave of the Fireflies':'https://upload.wikimedia.org/wikipedia/en/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg',
  'The Green Mile':'https://upload.wikimedia.org/wikipedia/en/e/e2/The_Green_Mile_%28movie_poster%29.jpg',
  'Mad Max: Fury Road':'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg',
  'Top Gun: Maverick':'https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg',
  'John Wick':'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg',
  'Knives Out':'https://upload.wikimedia.org/wikipedia/en/1/1f/Knives_Out_poster.jpeg',
  'The Prestige':'https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg',
  'The Sound of Music':'https://upload.wikimedia.org/wikipedia/commons/c/c6/Sound_of_music.jpg',
  'The Social Dilemma':'https://upload.wikimedia.org/wikipedia/en/2/27/Social_dilemma_xlg.jpg',
  Casablanca:'https://upload.wikimedia.org/wikipedia/commons/b/b3/CasablancaPoster-Gold.jpg',
  'Jurassic Park':'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg',
  'The Lion King':'https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg',
  'Pride & Prejudice':'https://upload.wikimedia.org/wikipedia/en/0/03/Prideandprejudiceposter.jpg',
  'La La Land':'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png'
};
const normalizeTitle=title=>title.toLowerCase().replace(/[^a-z0-9]/g,'');
const posterUrlByTitle=Object.fromEntries(Object.entries(verifiedPosterUrls).map(([title,url])=>[normalizeTitle(title),url]));
// The seed file contains legacy mojibake in a few curly-apostrophe titles.
posterUrlByTitle.singinintherain='https://upload.wikimedia.org/wikipedia/commons/5/5d/Singin%27_in_the_Rain_%281952_poster%29.jpg';
const detailedDescriptions={
  interstellar:'As crops fail and dust storms spread across Earth, former pilot Cooper joins a mission through a newly discovered wormhole to search for a place where humanity can survive. The journey tests the crew with distant worlds, difficult choices, and the pull of family across time.',
  inception:'Dom Cobb is a skilled thief who enters people’s dreams to steal secrets. He is offered a chance to return home if he can lead a team through a layered dream and plant an idea in a target’s mind.',
  themartian:'After a violent storm separates him from his crew, astronaut Mark Watney is presumed dead and left alone on Mars. He uses science, ingenuity, and a dwindling supply of resources to stay alive while Earth and his crewmates plan a rescue.',
  thedarkknight:'Batman faces a criminal known as the Joker, whose attacks push Gotham into fear and chaos. As the city’s police and district attorney join the fight, Bruce Wayne must weigh how far he can go to protect the people he serves.',
  arrival:'When mysterious spacecraft appear around the world, linguist Louise Banks is recruited to communicate with the visitors. Her attempt to understand their language becomes essential to preventing an international crisis.',
  spiritedaway:'Ten-year-old Chihiro enters a spirit world after her parents are transformed. Trapped in a bathhouse run by the witch Yubaba, she takes a job, meets unusual allies, and searches for a way to free her family.',
  dune:'Paul Atreides travels with his family to the desert planet Arrakis, the only source of a substance vital to space travel. After a political betrayal, he must survive in the desert and find his place among the Fremen.',
  parasite:'The struggling Kim family gradually finds work in the wealthy Park household by presenting themselves as unrelated specialists. Their plan brings the families into close contact, and a hidden part of the house changes everything.',
  paddington2:'Paddington settles into life with the Brown family and takes a series of jobs to buy a special book for his aunt. When the book is stolen and Paddington is blamed, his neighbors work to uncover the truth and clear his name.',
  schoolofrock:'After losing a job with his band, guitarist Dewey Finn poses as a substitute teacher at a private school. He turns his class into a rock group, helping the students find confidence while trying to keep his identity secret.',
  thegrandbudapesthotel:'A writer recalls the stories told by Zero Moustafa, the former lobby boy of a once-grand European hotel. Their account follows concierge Gustave H. through a stolen painting, an inheritance dispute, and a period of political upheaval.',
  singinintherain:'Silent-film star Don Lockwood enjoys success in Hollywood until sound arrives and threatens his latest production. With his friend Cosmo and aspiring actor Kathy, he tries to turn the troubled film into a musical.',
  chef:'After a public disagreement with a restaurant critic, chef Carl Casper leaves his restaurant job and starts a food truck. A road trip with his son and friend lets him reconnect with cooking and rebuild family ties.',
  myneighbortotoro:'Sisters Satsuki and Mei move to the countryside while their mother receives care in a nearby hospital. Exploring their new home, they encounter gentle forest spirits, including the enormous creature Totoro.',
  perfectdays:'Hirayama follows a quiet routine in Tokyo, cleaning public toilets, listening to music, reading, and photographing trees. Small encounters and memories gradually reveal the care he brings to ordinary days.',
  ourlittlesister:'Three sisters living together in Kamakura invite their much younger half-sister to join them after their father’s funeral. The four build a new household through shared meals, seasonal traditions, and everyday support.',
  thepursuitofhappyness:'Chris Gardner struggles to support his young son while training for an unpaid internship in a competitive brokerage firm. Facing housing insecurity and financial hardship, he keeps pursuing the chance to build a stable future.',
  awalktoremember:'High-school senior Landon is assigned community service after a prank goes wrong and becomes involved in the school play. He grows close to Jamie, a quiet classmate whose faith and outlook change how he sees his future.',
  graveofthefireflies:'During the final months of World War II, teenager Seita and his young sister Setsuko try to survive after their home is destroyed. The siblings search for food and shelter as the effects of war close in around them.',
  thegreenmile:'Prison guard Paul Edgecomb supervises death-row inmates at a 1930s penitentiary. The arrival of John Coffey, a physically imposing prisoner with a gentle nature and an unexplained gift, changes the lives of the guards and inmates.',
  madmaxfuryroad:'In a desert wasteland, Max is captured by the forces of a tyrant who controls a scarce water supply. He becomes part of Imperator Furiosa’s escape with a group of women, pursued across the desert in a high-speed battle for freedom.',
  topgunmaverick:'Navy pilot Pete “Maverick” Mitchell returns to the Top Gun program to train a team of graduates for a dangerous mission. He must prepare the pilots while confronting the loss of his friend and the complicated bond with Rooster.',
  johnwick:'Retired assassin John Wick is drawn back into the criminal underworld after a violent encounter at home. His search for those responsible brings him into conflict with a powerful network of assassins.',
  knivesout:'When celebrated mystery novelist Harlan Thrombey is found dead after his birthday gathering, detective Benoit Blanc interviews the family and staff. Conflicting accounts uncover rivalries and secrets behind the apparent family tragedy.',
  theprestige:'Two London magicians become fierce rivals after a stage accident damages their friendship. Their pursuit of the perfect illusion drives them toward increasingly risky experiments and personal sacrifices.',
  thesoundofmusic:'Maria leaves an Austrian abbey to become governess to the seven children of naval officer Georg von Trapp. Music helps the family grow close as political changes threaten their home and future.',
  thesocialdilemma:'A documentary explores how social-media platforms use recommendation systems and notifications to compete for attention. Interviews with technology insiders are paired with a fictional family whose online habits grow increasingly disruptive.',
  casablanca:'During World War II, nightclub owner Rick Blaine unexpectedly reunites with Ilsa, a former lover, in Casablanca. Her husband needs help escaping to continue the resistance, forcing Rick to choose between personal feelings and a larger cause.',
  jurassicpark:'Billionaire John Hammond invites a group of scientists and visitors to inspect a remote park where cloned dinosaurs have been brought back to life. When the park’s security systems fail, the visitors must find a way to survive and escape.',
  thelionking:'Young lion Simba is expected to inherit the Pride Lands from his father, Mufasa. After a family tragedy drives him away, Simba grows up far from home before deciding whether to return and face his past.',
  prideprejudice:'Elizabeth Bennet meets the wealthy Mr. Darcy and forms a poor first impression of him. As new information challenges both their judgments, family expectations and social conventions complicate the possibility of a relationship.',
  lalaland:'Aspiring actor Mia and jazz pianist Sebastian meet while pursuing their careers in Los Angeles. Their relationship grows alongside their ambitions, and each must consider what success asks them to give up.'
};
const backdropByGenre={
  'Sci-Fi':'photo-1451187580459-43490279c0fa', Action:'photo-1519608487953-e999c86e7455',
  Adventure:'photo-1500530855697-b586d89ba3ee', Comedy:'photo-1489599849927-2ee91cede3ba',
  Family:'photo-1478720568477-152d9b164e26', Drama:'photo-1440404653325-ab127d49abc1',
  Romance:'photo-1516589178581-6cd7833ae3b2', Food:'photo-1555939594-58d7cb561ad1',
  Mystery:'photo-1518709268805-4e9042af9f23', Documentary:'photo-1500530855697-b586d89ba3ee',
  Horror:'photo-1509248961158-e54f6934749c', Animation:'photo-1478720568477-152d9b164e26'
};
const unsplash=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;
function posterFor(title){return posterUrlByTitle[normalizeTitle(title)]||null;}

(async()=>{
  await mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/cinepulse');
  const retained=movies.filter(([title])=>posterFor(title));
  const failedTitles=movies.filter(([title])=>!posterFor(title)).map(([title])=>title);
  const failedRecords=await Movie.find({title:{$in:failedTitles}},'_id').lean();
  const failedIds=failedRecords.map(movie=>movie._id);
  if(failedIds.length){await Review.deleteMany({movie:{$in:failedIds}});await Movie.deleteMany({_id:{$in:failedIds}});}
  let cursor=0;
  while(cursor<retained.length){
      const [title,description,genres,year]=retained[cursor++];
      const poster=posterFor(title);
      const detailed=Object.entries(detailedDescriptions).find(([key])=>normalizeTitle(key)===normalizeTitle(title))?.[1];
      const galleryGenres=[...new Set(genres.map(g=>backdropByGenre[g]).filter(Boolean))];
      const gallery=[...new Set([...(galleryGenres.length?galleryGenres:[backdropByGenre.Adventure]),'photo-1485846234645-a62644f84728'])].slice(0,3).map(unsplash);
      await Movie.updateOne({title},{$set:{description:detailed||description,genres,year,poster,gallery}},{upsert:true});
  }
  console.log(`Seeded ${retained.length} poster-backed curated titles; removed ${failedIds.length} seeded titles without a poster URL. User-created movies preserved.`);
  await mongoose.disconnect();
})().catch(e=>{console.error(e);process.exit(1)});

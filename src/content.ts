export const BETA_URL = 'https://echoes-of-history-production.up.railway.app/';

export type Game = {
  slug: string;
  title: string;
  category: 'Stories & worlds' | 'Arcade & action';
  genre: string;
  tagline: string;
  image: string;
  secondaryImage: string;
  alt: string;
  secondaryAlt: string;
  accent: string;
  short: string;
  shortAlternatives: string[];
  paragraphs: string[];
  closing: string;
  beta?: boolean;
};

export const games: Game[] = [
  {
    slug: 'echoes-of-history', title: 'Echoes of History', category: 'Stories & worlds', genre: 'Conversational adventure',
    tagline: 'History is no longer silent.', image: 'echoes', secondaryImage: 'echoes-archive',
    alt: 'A golden Archive chamber opens onto an ancient city at sunset.', secondaryAlt: 'A celestial ceiling above the dark, circular hall of the Archive.', accent: '#e5b86a', beta: true,
    short: 'Enter the Archive, meet the extraordinary people of the past, explore their worlds, and discover what happens when history can answer back.',
    shortAlternatives: [
      'History lives inside the Archive. Meet legends, enter their worlds, cross the boundaries of time, and discover stories that were never written.',
      'What if history wasn’t finished? Enter the Archive, encounter remarkable lives across time, and discover a past that can think, change, and remember.',
    ],
    paragraphs: [
      'Beyond time lies the Archive, a place where the voices of the past endure.',
      'Here, pharaohs and philosophers, poets and warriors, scientists and revolutionaries exist as Resonances, echoes of remarkable lives brought together beyond the boundaries of history.',
      'Enter their worlds as they knew them. Stand beneath ancient skies, wander forgotten cities, step inside workshops, palaces, temples and private chambers. Meet the people behind the names and discover them not as monuments or paragraphs in a history book, but as individuals with ideas, contradictions, ambitions, fears and stories of their own.',
      'But something impossible is happening within the Archive.',
      'Centuries are beginning to touch. Knowledge is crossing boundaries it was never meant to cross. The past can glimpse the future, and those who once belonged to history may discover that their stories aren’t finished.',
      'The Guide is waiting.',
    ],
    closing: 'Enter the Archive. Speak with history. See what echoes back.',
  },
  {
    slug: 'the-scribbylinth', title: 'The Scribbylinth', category: 'Stories & worlds', genre: 'Persistent multiplayer worlds',
    tagline: 'Who gets to write reality?', image: 'scribbylinth', secondaryImage: 'scribbylinth-world',
    alt: 'An ink-black spiral and a circle of chairs beneath The Scribbylinth title.', secondaryAlt: 'An imagined city built from living Ink, alongside a concept interface.', accent: '#c7b8f0',
    short: 'Humanity was transferred into a realm written in living Ink. Build worlds, shape reality, and decide what survives. Who gets to write reality?',
    shortAlternatives: [
      'Humanity awakens in a realm of living Ink where belief shapes reality. Build, govern, explore, and fight for what your world becomes.',
      'Reality is unstable. Ink is power. Build communities, shape laws, explore Blank Spaces, and join others in writing a world worth keeping.',
      'Humanity was transferred without consent. Now reality belongs to those who can agree. Gather Ink, build your world, and make your mark.',
    ],
    paragraphs: [
      'Reality is written by those who can agree on it.',
      'Humanity has been transferred without consent.',
      'Not killed. Not uploaded. Transferred from the world it knew into The Scribbylinth, a spiritual realm composed of living Ink, where memory, belief, and collective agreement can physically reshape reality.',
      'No one knows why the Transfer happened. No one can even agree on exactly how it happened.',
      'Across an unfamiliar landscape, survivors construct Pockets of familiarity from shared memories. Streets, homes, communities, laws, and entire territories can be written into existence, but nothing is permanent. When people agree, reality strengthens. When they divide, the world itself becomes unstable.',
      'Players enter this contested realm as citizens with their own histories, experiences, affinities, and convictions. Explore unstable territories. Gather Ink. Form Circles. Build communities. Respond to World Events. Debate proposals. Establish laws. Discover Blank Spaces. Encounter strange forces that existed before humanity arrived. Decide what deserves to survive from the world that came before.',
      'Every choice contributes to something larger.',
      'Within persistent multiplayer worlds, communities of players collectively shape their own version of the Scribbylinth. Different worlds can develop different governments, territories, economies, alliances, histories, and interpretations of what reality should become. At rare moments, those worlds may touch, allowing travelers to cross between realities and encounter civilizations shaped by entirely different choices.',
      'There is no single agreed-upon truth waiting to be discovered.',
    ],
    closing: 'There is only what can be written. And what others will agree to keep.',
  },
  {
    slug: 'shoots-and-ladders', title: 'Shoots and Ladders!', category: 'Arcade & action', genre: 'Endless arcade',
    tagline: 'No Chutes! Only Shoots!', image: 'shoots-and-ladders', secondaryImage: 'shoots-and-ladders-world',
    alt: 'Animated numbered tiles and ladders on a strange, firelit board.', secondaryAlt: 'A board stretches into the darkness in a Shoots and Ladders presentation image.', accent: '#ebae68',
    short: 'Shoot ladders, dodge living obstacles, and race across an endless board that gets faster, stranger, and more dangerous the farther you go.',
    shortAlternatives: [
      'An endless board game gone completely wrong. Shoot your way forward, protect your score, dodge the chaos, and decide when you’ve had enough.',
      'Up doesn’t exist. Shoot ladders, survive chutes, dodge bizarre obstacles, and push your luck as an endless board grows faster and stranger.',
    ],
    paragraphs: [
      'An endless arcade game played across a board that gets faster, stranger, and more dangerous the farther you go.',
      'Target ladders to launch yourself across the board, blasting apart each one you leave behind as you race through an ever-changing path of numbered spaces. Avoid living obstacles, holes, snapping tiles, unexpected chutes, and increasingly bizarre events while trying to build and protect your score.',
      'There are no levels and no finish line. The board continuously generates ahead of you, warping and escalating as your run grows longer. Eventually, surviving means knowing when to keep going and when you’ve had enough.',
      'When you’re ready to quit, burn the board, lock in your score, and see how far you made it.',
    ], closing: 'No Chutes! Only Shoots!',
  },
  {
    slug: 'early-man-experiment', title: 'Early Man Experiment', category: 'Stories & worlds', genre: 'AI survival & storytelling',
    tagline: 'How long will your influence last?', image: 'early-man-experiment', secondaryImage: 'early-man-experiment-world',
    alt: 'An early human examines a tool above a wide prehistoric valley.', secondaryAlt: 'A fire burns inside a cave overlooking a moonlit prehistoric landscape.', accent: '#dbc292',
    short: 'Begin 40,000 years ago. Teach, explore, make music, build a tribe, and watch your unique AI-driven story unfold across generations and time.',
    shortAlternatives: [
      'Guide an intelligent early human, build a tribe, explore a changing world, and watch your choices echo across generations and into the future.',
      'Talk to Early Man, share modern knowledge, explore through conversation, and help a prehistoric tribe survive for generations in an AI-driven world.',
    ],
    paragraphs: [
      'What would happen if the first human you met could hear your voice, and you knew things he could never imagine?',
      'Early Man Experiment is an AI-driven survival and storytelling experience beginning 40,000 years in the past. Form a connection with an intelligent early human, overcome the language barrier, explore a uniquely generated prehistoric world through conversation, and share knowledge that can change the course of his life.',
      'You don’t control him. You talk to him. He remembers, learns, experiments, makes his own decisions, and lives his life even while you’re away. Help him explore unknown lands, discover resources, create tools, encounter other people, develop music, and build a tribe capable of surviving for generations.',
      'Every conversation matters. Every player’s history is different.',
      'Eventually tribes fall, generations disappear, and time moves forward. First Hearth remains as travelers from different ages seek refuge from the chaos outside. Their stories become part of yours as humanity moves toward a distant future where the mysteries of the past may finally be understood.',
      'Teach. Explore. Survive. Build. Remember.',
    ], closing: 'How long will your influence last?',
  },
  {
    slug: 'mower-madness', title: 'Mower Madness', category: 'Arcade & action', genre: 'Top-down arcade action',
    tagline: 'The grass is only the beginning.', image: 'mower-madness', secondaryImage: 'mower-madness-world',
    alt: 'A red riding mower charges through wild grass and hungry plant creatures.', secondaryAlt: 'An overgrown garden surrounds a pond and a small wooden bridge.', accent: '#c0d879',
    short: 'Turn an overgrown nightmare into the perfect lawn. Mow, fight creatures, dodge hazards, find power-ups and survive the madness.',
    shortAlternatives: [
      'Mow every blade, battle bizarre creatures, grab upgrades and survive increasingly chaotic yards in the top-down arcade action of Mower Madness.',
      'The grass needs cutting, but something is hiding in it. Fire up your mower, fight back, grab upgrades and finish the lawn in Mower Madness.',
    ],
    paragraphs: [
      'Mower Madness turns a simple weekend chore into an all-out battle for the perfect lawn. Take control of a riding mower and cut your way through increasingly wild courses packed with dangerous creatures, hidden power-ups, environmental hazards, and unexpected surprises.',
      'Mow every patch of grass while managing fuel and health, fighting off enemies, navigating tight obstacles, and upgrading your equipment along the way. Step off the mower to explore, discover side activities like fishing, and take on challenges scattered throughout each yard.',
      'Every course starts overgrown. Every strip you cut brings order to the chaos. But the closer you get to finishing the job, the crazier things become.',
    ], closing: 'Cut the grass. Fight the creatures. Finish the lawn. Welcome to Mower Madness.',
  },
  {
    slug: 'cleaning-chaos', title: 'Cleaning Chaos', category: 'Arcade & action', genre: 'Brick-breaker meets arcade shooter',
    tagline: 'You’re a broom. The spiders picked the wrong house.', image: 'cleaning-chaos', secondaryImage: 'cleaning-chaos-world',
    alt: 'A battle broom sweeps a glowing arc through a spider-infested floor.', secondaryAlt: 'Cleaning Chaos artwork with a battle broom surrounded by invading spiders.', accent: '#74d9ee',
    short: 'One broom. Too many spiders. Smash through plants, grab power-ups, and clean up the debris in an arcade battle where a spotless floor means boss time.',
    shortAlternatives: [
      'Smash plants, blast spiders, and sweep up the chaos! Take control of a wild broom in a frantic arcade showdown where housework fights back. Get ready!',
      'Think cleaning is easy? Try it with exploding spiders! Bounce, blast, and sweep your way through messy arcade mayhem, then take on a giant spider boss.',
    ],
    paragraphs: [
      'You’re a broom. The spiders picked the wrong house. Cleaning Chaos turns a simple cleanup job into an all-out arcade battle. Armed with bristles, firepower, and a bouncing ball, you’ll smash through overgrown plants, blast invading spiders, and sweep up the wreckage—all while trying to stay in one piece.',
      'Think you can handle a little housework? The housework has other plans. Everything you break leaves a mess, and the spiders aren’t about to let you tidy up in peace. Some chase you down. Some leave dirty trails. Others explode and undo your hard work. You’ll have to keep moving, pick your shots, and decide what needs your attention most: the ball you’re about to miss, the spider closing in, or that last patch of dirt across the board.',
      'Luckily, this broom has a few tricks up its sleeve. Grab power-ups to sweep wider, move faster, freeze enemies, or slip out of danger. Turn a desperate scramble into a cleaning spree—but don’t get too comfortable. A spotless floor is your invitation to a spider boss battle, complete with fresh messes and more unwanted guests.',
      'Part brick-breaker, part arcade shooter, and part cleaning frenzy, Cleaning Chaos puts your reflexes and multitasking to the test. Clear the board, survive the boss, and get ready to do it all again.',
    ], closing: 'It’s a dirty job. Bring a battle broom.',
  },
];

export const routes = ['/', '/games/', ...games.map(g => `/games/${g.slug}/`), '/studio/', '/beta/echoes-of-history/', '/privacy/'];

export function normalizePath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}

export function pageMeta(path: string) {
  const game = games.find(g => path === `/games/${g.slug}/`);
  if (game) return { title: `${game.title} — Glitzy Game Studios`, description: game.short, image: game.image };
  const pages: Record<string, { title: string; description: string; image: string }> = {
    '/': { title: 'Glitzy Game Studios — Find your next world', description: 'Six original games. Six different worlds. Explore the Glitzy Game Studios collection and enter the Echoes of History beta.', image: 'studio-worlds' },
    '/games/': { title: 'The collection — Glitzy Game Studios', description: 'Discover six original worlds, from conversations across history to wonderfully chaotic arcade adventures.', image: 'studio-worlds' },
    '/studio/': { title: 'The studio — Glitzy Game Studios', description: 'Meet the creative spirit behind six distinct game worlds. Welcome to Glitzy Game Studios.', image: 'studio-workshop' },
    '/beta/echoes-of-history/': { title: 'Play the Echoes of History beta — Glitzy Game Studios', description: 'Enter the Archive. Find out how to access the Echoes of History browser beta, sign in, or request an invitation.', image: 'echoes' },
    '/privacy/': { title: 'Website privacy — Glitzy Game Studios', description: 'How this studio website handles browsing data and links to the Echoes of History beta.', image: 'studio-worlds' },
  };
  return pages[path] ?? { title: 'Page not found — Glitzy Game Studios', description: 'Find your way back to the Glitzy Game Studios collection.', image: 'studio-worlds' };
}

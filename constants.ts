import { Era, Region, Faction, Artifact, Character } from './types';

export const ERAS: Era[] = [
  {
    id: 'collapse',
    name: 'Collapse of the Era of the Globe',
    yearRange: '0 - 50 PC (Post-Collapse)',
    description: 'The shattering of the old world order due to resource scarcity and the Great Silence.',
    details: 'Before the Collapse, the world was unified under a global network. When the network failed, mass starvation and infrastructure decay followed. The "Era of the Globe" is now a mythologized golden age.'
  },
  {
    id: 'anarchy',
    name: 'Era of Anarchy',
    yearRange: '51 - 200 PC',
    description: 'Warlords and tribal mysticism dominate the shattered continents.',
    details: 'During this period, no central government existed. The rise of local "Protectorates" laid the groundwork for modern city-states. The "Halphadites" emerged as a dominant raiding force in the south.'
  },
  {
    id: 'khynmour',
    name: 'Rise of the Khynmour Republic',
    yearRange: '201 - 350 PC',
    description: 'The first attempt at restoring complex governance in the north.',
    details: 'Khynmour scholars rediscovered steam power and printing. They established the first Republic, though it was plagued by internal corruption and the "Urban Tithe" riots.'
  },
  {
    id: 'commonwealth',
    name: 'Formation of the Commonwealth',
    yearRange: '351 - 480 PC',
    description: 'The unification of the northern city-states under the Revolutionary Montague.',
    details: 'Montague led the People’s Army to overthrow the decaying Khynmour elite. The Commonwealth was born on principles of shared labor and state atheism.'
  },
  {
    id: 'indros',
    name: 'Indros Industrialisation',
    yearRange: '481 - 550 PC',
    description: 'Rapid technological expansion in the eastern archipelago of Indros.',
    details: 'Indros, previously isolated, adopted aggressive factory-city models. Their output of steel and munitions quickly surpassed the mainland, leading to the "Smog Treaties".'
  },
  {
    id: 'gap-pass',
    name: 'Gap Pass Campaign',
    yearRange: '551 - 560 PC',
    description: 'A bloody territorial war between the Commonwealth and Indros proxies.',
    details: 'Fought over the strategic mountain pass known as "The Gap". Tens of thousands perished in trench warfare. It ended in a stalemate but solidified borders.'
  },
  {
    id: 'ryenarkia',
    name: 'Rise of Ryenarkia',
    yearRange: '561 - 600 PC',
    description: 'The unification of southern monarchies under the Imperial Cult.',
    details: 'Claiming divine mandate from the "Old Gods" of the Globe era, Emperor Darwues united the south against the "godless" Commonwealth.'
  },
  {
    id: 'cold-war',
    name: 'Modern Cold War',
    yearRange: '601 PC - Present',
    description: 'Ideological standoff between the Commonwealth and the Ryenarkian Empire.',
    details: 'A delicate peace held together by nuclear deterrence (relic weapons) and espionage. Proxy wars flare in the tribal territories and the Gap.'
  }
];

export const REGIONS: Region[] = [
  {
    id: 'commonwealth',
    name: 'The Commonwealth',
    description: 'An industrial socialist union of city-states. Strict, militaristic, and fiercely anti-monarchist.',
    politicalSystem: 'Council Republic',
    conflicts: ['Border skirmishes with Ryenarkia', 'Internal dissent in Sector 7'],
    color: '#8b3a3a',
    coordinates: 'M 50 50 L 150 50 L 180 120 L 120 200 L 40 180 Z'
  },
  {
    id: 'ryenarkia',
    name: 'Ryenarkian Empire',
    description: 'A sprawling theocratic empire valuing tradition, hierarchy, and divine right.',
    politicalSystem: 'Absolute Monarchy (Theocratic)',
    conflicts: ['Suppression of Jindu rebels', 'Cold War with Commonwealth'],
    color: '#4b3a8b',
    coordinates: 'M 200 100 L 350 100 L 380 250 L 250 300 L 180 200 Z'
  },
  {
    id: 'gap',
    name: 'The Gap',
    description: 'A neutral, lawless mountain corridor controlled by Merchant Houses.',
    politicalSystem: 'Plutocracy',
    conflicts: ['Mercenary wars', 'Smuggling suppression'],
    color: '#cfaa62',
    coordinates: 'M 150 50 L 200 50 L 220 150 L 180 120 Z'
  },
  {
    id: 'indros',
    name: 'Indros',
    description: 'Technocratic archipelago nation focused on efficiency and manufacturing.',
    politicalSystem: 'Corporate Syndicate',
    conflicts: ['Trade disputes with The Gap'],
    color: '#4a6fa5',
    coordinates: 'M 400 50 L 500 60 L 480 180 L 380 150 Z'
  },
  {
    id: 'jindu',
    name: 'Jindu / Southriver',
    description: 'Agricultural heartland suffering under Ryenarkian occupation.',
    politicalSystem: 'Occupied Territory',
    conflicts: ['Guerilla resistance'],
    color: '#647a46',
    coordinates: 'M 250 300 L 380 250 L 400 400 L 200 400 Z'
  }
];

export const FACTIONS: Faction[] = [
  {
    id: 'city-council',
    name: 'City Council Government',
    type: 'Government',
    slogan: 'Order through Unity.',
    description: 'The ruling body of the Commonwealth. Bureaucratic and severe.',
    ideology: 'Collectivism',
    leader: 'High Councilor Vane',
    color: 'bg-red-800',
    logo: 'landmark'
  },
  {
    id: 'imperial-cult',
    name: 'Ryenarkian Imperial Cult',
    type: 'Religious/State',
    slogan: 'The Blood is the Crown.',
    description: 'The priesthood that enforces the Emperor’s will and maintains the relic archives.',
    ideology: 'Divine Right / Traditionalism',
    leader: 'Arch-Lector Sael',
    color: 'bg-purple-800',
    logo: 'crown'
  },
  {
    id: 'merchant-houses',
    name: 'Gap Merchant Houses',
    type: 'Corporate',
    slogan: 'Everything has a price.',
    description: 'A loose alliance of wealthy trading families controlling the mountain passes.',
    ideology: 'Capitalism / Neutrality',
    leader: 'Grand Prince Oland',
    color: 'bg-yellow-700',
    logo: 'coins'
  },
  {
    id: 'montague-rev',
    name: 'Revolutionary Commonwealth',
    type: 'Military / Political',
    slogan: 'Break the Chains of the Past.',
    description: 'The original founders of the Commonwealth, now a radical faction within the government.',
    ideology: 'Radical Socialism',
    leader: 'General Kaelen (Descendant)',
    color: 'bg-red-600',
    logo: 'flag'
  }
];

export const ARTIFACTS: Artifact[] = [
  {
    id: 'pamphlet',
    name: 'The Red Dawn Pamphlet',
    type: 'Propaganda',
    origin: 'Commonwealth (Early Era)',
    description: 'A faded manifesto calling for the end of the Khynmour Republic. "Bread not Stone" is scrawled on the back.',
  },
  {
    id: 'relic-rifle',
    name: 'Mi’yam Relic Rifle',
    type: 'Weapon',
    origin: 'Pre-Collapse',
    description: 'A coil-gun from the Era of the Globe. No longer functional, but used as a symbol of authority by Ryenarkian officers.',
  },
  {
    id: 'graffiti',
    name: 'Urban Tithe Slogans',
    type: 'Cultural',
    origin: 'Khynmour Ruins',
    description: 'Chalk rubbings preserved from the riots. "They eat while we bleed."',
  },
  {
    id: 'mask',
    name: 'Mask of the Wifuni',
    type: 'Ceremonial',
    origin: 'Tribal Territories',
    description: 'A wooden mask worn during the Harvest of Ash festivals in the unclaimed lands.',
  }
];

export const CHARACTERS: Character[] = [
  {
    id: 'darwues',
    name: 'Darwues the Emperor',
    title: 'Sovereign of Ryenarkia',
    faction: 'Ryenarkian Empire',
    description: 'The aging monarch who claims direct lineage to the Old World CEOs (now deified). He seeks to preserve tradition at any cost.',
    traits: ['Authoritarian', 'Pious', 'Strategic']
  },
  {
    id: 'montague',
    name: 'Montague the Revolutionary',
    title: 'Founder (Deceased)',
    faction: 'Commonwealth',
    description: 'The historical figure who united the north. His preserved body is on display in the Capital, a pilgrimage site for loyalists.',
    traits: ['Charismatic', 'Ruthless', 'Visionary']
  },
  {
    id: 'brenna',
    name: 'Brenna of Indros',
    title: 'Iron Admiral',
    faction: 'Indros',
    description: 'Commander of the Indros naval blockade. Known for her mechanical prosthetic arm and cold demeanor.',
    traits: ['Calculating', 'Technocrat', 'Patriot']
  }
];
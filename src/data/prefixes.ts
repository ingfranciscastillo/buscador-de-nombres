export type GeneratorTheme = 'fantasia' | 'sci-fi' | 'horror' | 'medieval' | 'anime' | 'comun' | 'salvaje'

export interface PrefixSuffix {
  value: string
  theme: GeneratorTheme[]
}

export const prefixes: PrefixSuffix[] = [
  // Fantasía
  { value: 'Ael', theme: ['fantasia'] },
  { value: 'Thal', theme: ['fantasia'] },
  { value: 'Gal', theme: ['fantasia'] },
  { value: 'Eil', theme: ['fantasia'] },
  { value: 'Mor', theme: ['fantasia', 'horror'] },
  { value: 'Syl', theme: ['fantasia'] },
  { value: 'Nar', theme: ['fantasia'] },
  { value: 'Drac', theme: ['fantasia'] },
  { value: 'Aer', theme: ['fantasia'] },
  { value: 'Fae', theme: ['fantasia'] },
  { value: 'Myth', theme: ['fantasia'] },
  { value: 'Rav', theme: ['fantasia'] },
  { value: 'Zeph', theme: ['fantasia'] },
  { value: 'Lyr', theme: ['fantasia'] },
  { value: 'Ombr', theme: ['fantasia'] },
  
  // Sci-Fi
  { value: 'Nex', theme: ['sci-fi'] },
  { value: 'Cybr', theme: ['sci-fi'] },
  { value: 'Quan', theme: ['sci-fi'] },
  { value: 'Synth', theme: ['sci-fi'] },
  { value: 'Astr', theme: ['sci-fi'] },
  { value: 'Chron', theme: ['sci-fi'] },
  { value: 'Mecha', theme: ['sci-fi'] },
  { value: 'Void', theme: ['sci-fi'] },
  { value: 'Stell', theme: ['sci-fi'] },
  { value: 'Ion', theme: ['sci-fi'] },
  { value: 'Xen', theme: ['sci-fi'] },
  { value: 'Prot', theme: ['sci-fi'] },
  
  // Horror / Oscuro
  { value: 'Necr', theme: ['horror'] },
  { value: 'Vamp', theme: ['horror'] },
  { value: 'Ghou', theme: ['horror'] },
  { value: 'Wraith', theme: ['horror'] },
  { value: 'Shad', theme: ['horror'] },
  { value: 'Dread', theme: ['horror'] },
  { value: 'Grim', theme: ['horror'] },
  { value: 'Bane', theme: ['horror'] },
  { value: 'VoidH', theme: ['horror'] },
  
  // Medieval
  { value: 'Thorn', theme: ['medieval'] },
  { value: 'Wulf', theme: ['medieval'] },
  { value: 'Iron', theme: ['medieval'] },
  { value: 'Storm', theme: ['medieval'] },
  { value: 'Flame', theme: ['medieval'] },
  { value: 'Frost', theme: ['medieval'] },
  { value: 'Raven', theme: ['medieval'] },
  { value: 'Hawk', theme: ['medieval'] },
  { value: 'Bear', theme: ['medieval', 'salvaje'] },
  { value: 'Wolf', theme: ['medieval', 'salvaje'] },
  { value: 'Oak', theme: ['medieval'] },
  { value: 'Stone', theme: ['medieval'] },
  
  // Anime
  { value: 'Ken', theme: ['anime'] },
  { value: 'Yuu', theme: ['anime'] },
  { value: 'Hiro', theme: ['anime'] },
  { value: 'Sora', theme: ['anime'] },
  { value: 'Akira', theme: ['anime'] },
  { value: 'Ryu', theme: ['anime'] },
  { value: 'Kaze', theme: ['anime'] },
  { value: 'Hana', theme: ['anime'] },
  { value: 'Mei', theme: ['anime'] },
  { value: 'Shin', theme: ['anime'] },
  
  // Salvaje
  { value: 'Rex', theme: ['salvaje'] },
  { value: 'Fang', theme: ['salvaje'] },
  { value: 'Claw', theme: ['salvaje'] },
  { value: 'StormS', theme: ['salvaje'] },
  { value: 'Blaze', theme: ['salvaje'] },
  { value: 'Thunder', theme: ['salvaje'] },
  { value: 'Shadow', theme: ['salvaje'] },
  { value: 'Spirit', theme: ['salvaje'] },
  { value: 'Titan', theme: ['salvaje'] },
  { value: 'Kraken', theme: ['salvaje'] },
  
  // Comunes
  { value: 'Max', theme: ['comun'] },
  { value: 'Alex', theme: ['comun'] },
  { value: 'Sam', theme: ['comun'] },
  { value: 'Jay', theme: ['comun'] },
  { value: 'Ray', theme: ['comun'] },
  { value: 'Drew', theme: ['comun'] },
  { value: 'Blake', theme: ['comun'] },
  { value: 'Jordan', theme: ['comun'] },
  { value: 'Casey', theme: ['comun'] },
  { value: 'Morgan', theme: ['comun'] },
]

export const suffixes: PrefixSuffix[] = [
  // Fantasía
  { value: 'dor', theme: ['fantasia'] },
  { value: 'wyn', theme: ['fantasia'] },
  { value: 'ra', theme: ['fantasia'] },
  { value: 'thas', theme: ['fantasia'] },
  { value: 'mir', theme: ['fantasia'] },
  { value: 'nor', theme: ['fantasia'] },
  { value: 'iel', theme: ['fantasia'] },
  { value: 'ion', theme: ['fantasia'] },
  { value: 'ara', theme: ['fantasia'] },
  { value: 'ros', theme: ['fantasia'] },
  { value: 'myr', theme: ['fantasia'] },
  { value: 'lyn', theme: ['fantasia'] },
  { value: 'wyr', theme: ['fantasia'] },
  
  // Sci-Fi
  { value: 'ix', theme: ['sci-fi'] },
  { value: 'on', theme: ['sci-fi'] },
  { value: 'ex', theme: ['sci-fi'] },
  { value: 'ium', theme: ['sci-fi'] },
  { value: 'os', theme: ['sci-fi'] },
  { value: 'araS', theme: ['sci-fi'] },
  { value: 'ux', theme: ['sci-fi'] },
  { value: 'yn', theme: ['sci-fi'] },
  { value: 'zor', theme: ['sci-fi'] },
  { value: 'tek', theme: ['sci-fi'] },
  { value: 'vex', theme: ['sci-fi'] },
  
  // Horror
  { value: 'ius', theme: ['horror'] },
  { value: 'oth', theme: ['horror'] },
  { value: 'ath', theme: ['horror'] },
  { value: 'ax', theme: ['horror'] },
  { value: 'thul', theme: ['horror'] },
  { value: 'gor', theme: ['horror'] },
  { value: 'mos', theme: ['horror'] },
  { value: 'vore', theme: ['horror'] },
  
  // Medieval
  { value: 'ric', theme: ['medieval'] },
  { value: 'mund', theme: ['medieval'] },
  { value: 'ward', theme: ['medieval'] },
  { value: 'bert', theme: ['medieval'] },
  { value: 'win', theme: ['medieval'] },
  { value: 'fred', theme: ['medieval'] },
  { value: 'gar', theme: ['medieval'] },
  { value: 'brand', theme: ['medieval'] },
  { value: 'helm', theme: ['medieval'] },
  { value: 'ulf', theme: ['medieval'] },
  
  // Anime
  { value: 'shi', theme: ['anime'] },
  { value: 'ko', theme: ['anime'] },
  { value: 'chi', theme: ['anime'] },
  { value: 'moto', theme: ['anime'] },
  { value: 'kawa', theme: ['anime'] },
  { value: 'suke', theme: ['anime'] },
  { value: 'hiroA', theme: ['anime'] },
  { value: 'fumi', theme: ['anime'] },
  { value: 'haru', theme: ['anime'] },
  { value: 'yuki', theme: ['anime'] },
  
  // Salvaje
  { value: 'claw', theme: ['salvaje'] },
  { value: 'fang', theme: ['salvaje'] },
  { value: 'tooth', theme: ['salvaje'] },
  { value: 'paw', theme: ['salvaje'] },
  { value: 'mane', theme: ['salvaje'] },
  { value: 'scale', theme: ['salvaje'] },
  { value: 'wing', theme: ['salvaje'] },
  { value: 'heart', theme: ['salvaje'] },
  { value: 'soul', theme: ['salvaje'] },
  { value: 'breaker', theme: ['salvaje'] },
  
  // Comunes
  { value: 'son', theme: ['comun'] },
  { value: 'er', theme: ['comun'] },
  { value: 'ley', theme: ['comun'] },
  { value: 'wood', theme: ['comun'] },
  { value: 'ford', theme: ['comun'] },
  { value: 'port', theme: ['comun'] },
  { value: 'ton', theme: ['comun'] },
  { value: 'field', theme: ['comun'] },
  { value: 'well', theme: ['comun'] },
  { value: 'man', theme: ['comun'] },
]

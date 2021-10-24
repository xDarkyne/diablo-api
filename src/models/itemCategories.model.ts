export interface ItemCategories {
  head: string,
  shoulders: string,
  chest: string,
  bracers: string,
  gloves: string,
  waist: string,
  legs: string,
  boots: string,
  jewelry: string,
  offhand: string,
  follower: string,
}

export interface ExtendedItemCategories extends ItemCategories {
  // DemonHunter
  cloak: string,
  quiver: string,

  // Wizard
  wizardHat: string,
  orb: string,

  // WitchDoctor
  voodoMask: string,

  // Crusader
  crusaderShield: string,

  // Monk
  spiritStone: string,
  mojo: string,

  // Necromancer
  phylactery: string,

  // Barbarian
  mightyBelt: string,
  
  // All
  belt: string,
  necklace: string,
  ring: string,
  shield: string,

  // Follower
  enchantressFocus: string,
  scoundrelToken: string,
  templarRelict: string,
}

import { HeroClasses } from "../types/";
import { ItemCategories, ExtendedItemCategories } from "../models";

/**
 * Simple helper interface to structure
 * the data in the Categories table
 */
export interface ItemTypeCategory {
  slug: string,
  type: keyof ExtendedItemCategories,
  class: string,
}

export abstract class StorageHelper {
  /**
   * Table used for storing the character classes and having
   * easy access to their slugs for API endpoints.
   */
  public static Classes: Record<keyof HeroClasses, string> = {
    all: "all",
    barbarian: "barbarian",
    crusader: "crusader",
    demonHunter: "demon-hunter",
    monk: "monk",
    necromancer: "necromancer",
    witchDoctor: "witch-doctor",
    wizard: "wizard",

    // non playable
    enchantress: "enchantress",
    scoundrel: "scoundrel",
    templar: "templar",
  }

  /**
   * Table used for grouping item-types and provided additional information
   * like item-type or item-class
   */
  public static Categories: Record<keyof ItemCategories, ItemTypeCategory[]> = {
    head: [
      { slug: "helm", type: "head", class: this.Classes.all},
      { slug: "generichelm", type: "head", class: this.Classes.all },
      { slug: "helmbarbarian", type: "head", class: this.Classes.barbarian},
      { slug: "helmcrusader", type: "head", class: this.Classes.crusader},
      { slug: "helmdemonhunter", type: "head", class: this.Classes.demonHunter},
      { slug: "helmmonk", type: "head", class: this.Classes.monk},
      { slug: "helmnecromancer", type: "head", class: this.Classes.necromancer},
      { slug: "helmwitchdoctor", type: "head", class: this.Classes.witchDoctor},
      { slug: "helmwizard", type: "head", class: this.Classes.wizard},
      // special
      { slug: "spiritstonemonk", type: "spiritStone", class: this.Classes.monk },
      { slug: "voodoomask", type: "voodoMask", class: this.Classes.witchDoctor },
      { slug: "wizardhat", type: "wizardHat", class: this.Classes.wizard },
    ],
    shoulders: [
      { slug: "shoulders", type: "shoulders", class: this.Classes.all },
      { slug: "shouldersbarbarian", type: "shoulders", class: this.Classes.barbarian },
      { slug: "shoulderscrusader", type: "shoulders", class: this.Classes.crusader },
      { slug: "shouldersdemonhunter", type: "shoulders", class: this.Classes.demonHunter },
      { slug: "shouldersmonk", type: "shoulders", class: this.Classes.monk },
      { slug: "shouldersnecromancer", type: "shoulders", class: this.Classes.necromancer },
      { slug: "shoulderswitchdoctor", type: "shoulders", class: this.Classes.witchDoctor },
      { slug: "shoulderswizard", type: "shoulders", class: this.Classes.wizard },
    ],
    chest: [
      { slug: "chestarmor", type: "chest", class: this.Classes.all},
      { slug: "genericchestarmor", type: "chest", class: this.Classes.all},
      { slug: "chestarmorbarbarian", type: "chest", class: this.Classes.barbarian},
      { slug: "chestarmorcrusader", type: "chest", class: this.Classes.crusader},
      { slug: "chestarmordemonhunter", type: "chest", class: this.Classes.demonHunter},
      { slug: "chestarmormonk", type: "chest", class: this.Classes.monk},
      { slug: "chestarmornecromancer", type: "chest", class: this.Classes.necromancer},
      { slug: "chestarmorwitchdoctor", type: "chest", class: this.Classes.witchDoctor},
      { slug: "chestarmorwizard", type: "chest", class: this.Classes.wizard},
      // special
      { slug: "cloak", type: "cloak", class: this.Classes.demonHunter},
    ],
    gloves: [
      { slug: "gloves", type: "gloves", class: this.Classes.all},
      { slug: "glovesbarbarian", type: "gloves", class: this.Classes.barbarian},
      { slug: "glovescrusader", type: "gloves", class: this.Classes.crusader},
      { slug: "glovesdemonhunter", type: "gloves", class: this.Classes.demonHunter},
      { slug: "glovesmonk", type: "gloves", class: this.Classes.monk},
      { slug: "glovesnecromancer", type: "gloves", class: this.Classes.necromancer},
      { slug: "gloveswitchdoctor", type: "gloves", class: this.Classes.witchDoctor},
      { slug: "gloveswizard", type: "gloves", class: this.Classes.wizard},
    ],
    bracers: [
      { slug: "bracers", type: "bracers", class: this.Classes.all },
    ],
    waist: [
      { slug: "genericbelt", type: "belt", class: this.Classes.all },
      { slug: "beltbarbarian", type: "mightyBelt", class: this.Classes.barbarian }
    ],
    legs:  [
      { slug: "legs", type: "legs", class: this.Classes.all },
      { slug: "legsbarbarian", type: "legs", class: this.Classes.barbarian },
      { slug: "legscrusader", type: "legs", class: this.Classes.crusader },
      { slug: "legsdemonhunter", type: "legs", class: this.Classes.demonHunter },
      { slug: "legsmonk", type: "legs", class: this.Classes.monk },
      { slug: "legsnecromancer", type: "legs", class: this.Classes.necromancer },
      { slug: "legswitchdoctor", type: "legs", class: this.Classes.witchDoctor },
      { slug: "legswizard", type: "legs", class: this.Classes.wizard },
    ],
    boots: [
      { slug: "boots", type: "boots", class: this.Classes.all},
      { slug: "bootsbarbarian", type: "boots", class: this.Classes.barbarian},
      { slug: "bootscrusader", type: "boots", class: this.Classes.crusader},
      { slug: "bootsdemonhunter", type: "boots", class: this.Classes.demonHunter},
      { slug: "bootsmonk", type: "boots", class: this.Classes.monk},
      { slug: "bootsnecromancer", type: "boots", class: this.Classes.necromancer},
      { slug: "bootswitchdoctor", type: "boots", class: this.Classes.witchDoctor},
      { slug: "bootswizard", type: "boots", class: this.Classes.wizard},
    ],
    jewelry: [
      { slug: "amulet", type: "necklace", class: this.Classes.all },
      { slug: "ring", type: "ring", class: this.Classes.all },
    ],
    offhand: [
      { slug: "shield", type: "shield", class: this.Classes.all },
      { slug: "crusadershield", type: "crusaderShield", class: this.Classes.crusader },
      { slug: "quiver", type: "quiver", class: this.Classes.demonHunter },
      { slug: "necromanceroffhand", type: "phylactery", class: this.Classes.necromancer },
      { slug: "mojo", type: "mojo", class: this.Classes.witchDoctor },
      { slug: "orb", type: "orb", class: this.Classes.wizard },
    ],
    follower: [
      { slug: "enchantressspecial", type: "enchantressFocus", class: this.Classes.enchantress },
      { slug: "scoundrelspecial", type: "scoundrelToken", class: this.Classes.scoundrel },
      { slug: "templarspecial", type: "templarRelict", class: this.Classes.templar },
    ]
  }
}

import { ItemCategories, ExtendedItemCategories } from "../models";
import { Classes } from "../types/";

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
   * Table used for grouping item-types and provided additional information
   * like item-type or item-class
   */
  public static Categories: Record<keyof ItemCategories, ItemTypeCategory[]> = {
    head: [
      { slug: "helm", type: "head", class: Classes.all},
      { slug: "generichelm", type: "head", class: Classes.all },
      { slug: "helmbarbarian", type: "head", class: Classes.barbarian},
      { slug: "helmcrusader", type: "head", class: Classes.crusader},
      { slug: "helmdemonhunter", type: "head", class: Classes.demonHunter},
      { slug: "helmmonk", type: "head", class: Classes.monk},
      { slug: "helmnecromancer", type: "head", class: Classes.necromancer},
      { slug: "helmwitchdoctor", type: "head", class: Classes.witchDoctor},
      { slug: "helmwizard", type: "head", class: Classes.wizard},
      // special
      { slug: "spiritstonemonk", type: "spiritStone", class: Classes.monk },
      { slug: "voodoomask", type: "voodoMask", class: Classes.witchDoctor },
      { slug: "wizardhat", type: "wizardHat", class: Classes.wizard },
    ],
    shoulders: [
      { slug: "shoulders", type: "shoulders", class: Classes.all },
      { slug: "shouldersbarbarian", type: "shoulders", class: Classes.barbarian },
      { slug: "shoulderscrusader", type: "shoulders", class: Classes.crusader },
      { slug: "shouldersdemonhunter", type: "shoulders", class: Classes.demonHunter },
      { slug: "shouldersmonk", type: "shoulders", class: Classes.monk },
      { slug: "shouldersnecromancer", type: "shoulders", class: Classes.necromancer },
      { slug: "shoulderswitchdoctor", type: "shoulders", class: Classes.witchDoctor },
      { slug: "shoulderswizard", type: "shoulders", class: Classes.wizard },
    ],
    chest: [
      { slug: "chestarmor", type: "chest", class: Classes.all},
      { slug: "genericchestarmor", type: "chest", class: Classes.all},
      { slug: "chestarmorbarbarian", type: "chest", class: Classes.barbarian},
      { slug: "chestarmorcrusader", type: "chest", class: Classes.crusader},
      { slug: "chestarmordemonhunter", type: "chest", class: Classes.demonHunter},
      { slug: "chestarmormonk", type: "chest", class: Classes.monk},
      { slug: "chestarmornecromancer", type: "chest", class: Classes.necromancer},
      { slug: "chestarmorwitchdoctor", type: "chest", class: Classes.witchDoctor},
      { slug: "chestarmorwizard", type: "chest", class: Classes.wizard},
      // special
      { slug: "cloak", type: "cloak", class: Classes.demonHunter},
    ],
    gloves: [
      { slug: "gloves", type: "gloves", class: Classes.all},
      { slug: "glovesbarbarian", type: "gloves", class: Classes.barbarian},
      { slug: "glovescrusader", type: "gloves", class: Classes.crusader},
      { slug: "glovesdemonhunter", type: "gloves", class: Classes.demonHunter},
      { slug: "glovesmonk", type: "gloves", class: Classes.monk},
      { slug: "glovesnecromancer", type: "gloves", class: Classes.necromancer},
      { slug: "gloveswitchdoctor", type: "gloves", class: Classes.witchDoctor},
      { slug: "gloveswizard", type: "gloves", class: Classes.wizard},
    ],
    bracers: [
      { slug: "bracers", type: "bracers", class: Classes.all },
    ],
    waist: [
      { slug: "genericbelt", type: "belt", class: Classes.all },
      { slug: "beltbarbarian", type: "mightyBelt", class: Classes.barbarian }
    ],
    legs:  [
      { slug: "legs", type: "legs", class: Classes.all },
      { slug: "legsbarbarian", type: "legs", class: Classes.barbarian },
      { slug: "legscrusader", type: "legs", class: Classes.crusader },
      { slug: "legsdemonhunter", type: "legs", class: Classes.demonHunter },
      { slug: "legsmonk", type: "legs", class: Classes.monk },
      { slug: "legsnecromancer", type: "legs", class: Classes.necromancer },
      { slug: "legswitchdoctor", type: "legs", class: Classes.witchDoctor },
      { slug: "legswizard", type: "legs", class: Classes.wizard },
    ],
    boots: [
      { slug: "boots", type: "boots", class: Classes.all},
      { slug: "bootsbarbarian", type: "boots", class: Classes.barbarian},
      { slug: "bootscrusader", type: "boots", class: Classes.crusader},
      { slug: "bootsdemonhunter", type: "boots", class: Classes.demonHunter},
      { slug: "bootsmonk", type: "boots", class: Classes.monk},
      { slug: "bootsnecromancer", type: "boots", class: Classes.necromancer},
      { slug: "bootswitchdoctor", type: "boots", class: Classes.witchDoctor},
      { slug: "bootswizard", type: "boots", class: Classes.wizard},
    ],
    jewelry: [
      { slug: "amulet", type: "necklace", class: Classes.all },
      { slug: "ring", type: "ring", class: Classes.all },
    ],
    offhand: [
      { slug: "shield", type: "shield", class: Classes.all },
      { slug: "crusadershield", type: "crusaderShield", class: Classes.crusader },
      { slug: "quiver", type: "quiver", class: Classes.demonHunter },
      { slug: "necromanceroffhand", type: "phylactery", class: Classes.necromancer },
      { slug: "mojo", type: "mojo", class: Classes.witchDoctor },
      { slug: "orb", type: "orb", class: Classes.wizard },
    ],
    follower: [
      { slug: "enchantressspecial", type: "enchantressFocus", class: Classes.enchantress },
      { slug: "scoundrelspecial", type: "scoundrelToken", class: Classes.scoundrel },
      { slug: "templarspecial", type: "templarRelict", class: Classes.templar },
    ]
  }
}

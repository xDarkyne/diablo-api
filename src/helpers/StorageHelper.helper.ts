import { Classes, ItemTypes } from "../types/";

/**
 * Simple helper interface to structure
 * the data in the Categories table
 */
export interface ItemTypeCategory {
  slug: string,
  type: ItemTypes,
  class: string,
}

export abstract class StorageHelper {
  /**
   * Table used for grouping item-types and provided additional information
   * like item-type or item-class
   */
  public static Categories: Record<string, ItemTypeCategory[]> = {
    head: [
      { slug: "helm", type: ItemTypes.head, class: Classes.all},
      { slug: "generichelm", type: ItemTypes.head, class: Classes.all },
      { slug: "helmbarbarian", type: ItemTypes.head, class: Classes.barbarian},
      { slug: "helmcrusader", type: ItemTypes.head, class: Classes.crusader},
      { slug: "helmdemonhunter", type: ItemTypes.head, class: Classes.demonHunter},
      { slug: "helmmonk", type: ItemTypes.head, class: Classes.monk},
      { slug: "helmnecromancer", type: ItemTypes.head, class: Classes.necromancer},
      { slug: "helmwitchdoctor", type: ItemTypes.head, class: Classes.witchDoctor},
      { slug: "helmwizard", type: ItemTypes.head, class: Classes.wizard},
      // special
      { slug: "spiritstonemonk", type: ItemTypes.spiritStone, class: Classes.monk },
      { slug: "voodoomask", type: ItemTypes.voodoMask, class: Classes.witchDoctor },
      { slug: "wizardhat", type: ItemTypes.wizardHat, class: Classes.wizard },
    ],
    shoulders: [
      { slug: "shoulders", type: ItemTypes.shoulders, class: Classes.all },
      { slug: "shouldersbarbarian", type: ItemTypes.shoulders, class: Classes.barbarian },
      { slug: "shoulderscrusader", type: ItemTypes.shoulders, class: Classes.crusader },
      { slug: "shouldersdemonhunter", type: ItemTypes.shoulders, class: Classes.demonHunter },
      { slug: "shouldersmonk", type: ItemTypes.shoulders, class: Classes.monk },
      { slug: "shouldersnecromancer", type: ItemTypes.shoulders, class: Classes.necromancer },
      { slug: "shoulderswitchdoctor", type: ItemTypes.shoulders, class: Classes.witchDoctor },
      { slug: "shoulderswizard", type: ItemTypes.shoulders, class: Classes.wizard },
    ],
    chest: [
      { slug: "chestarmor", type: ItemTypes.chest, class: Classes.all},
      { slug: "genericchestarmor", type: ItemTypes.chest, class: Classes.all},
      { slug: "chestarmorbarbarian", type: ItemTypes.chest, class: Classes.barbarian},
      { slug: "chestarmorcrusader", type: ItemTypes.chest, class: Classes.crusader},
      { slug: "chestarmordemonhunter", type: ItemTypes.chest, class: Classes.demonHunter},
      { slug: "chestarmormonk", type: ItemTypes.chest, class: Classes.monk},
      { slug: "chestarmornecromancer", type: ItemTypes.chest, class: Classes.necromancer},
      { slug: "chestarmorwitchdoctor", type: ItemTypes.chest, class: Classes.witchDoctor},
      { slug: "chestarmorwizard", type: ItemTypes.chest, class: Classes.wizard},
      // special
      { slug: "cloak", type: ItemTypes.cloak, class: Classes.demonHunter},
    ],
    gloves: [
      { slug: "gloves", type: ItemTypes.gloves, class: Classes.all},
      { slug: "glovesbarbarian", type: ItemTypes.gloves, class: Classes.barbarian},
      { slug: "glovescrusader", type: ItemTypes.gloves, class: Classes.crusader},
      { slug: "glovesdemonhunter", type: ItemTypes.gloves, class: Classes.demonHunter},
      { slug: "glovesmonk", type: ItemTypes.gloves, class: Classes.monk},
      { slug: "glovesnecromancer", type: ItemTypes.gloves, class: Classes.necromancer},
      { slug: "gloveswitchdoctor", type: ItemTypes.gloves, class: Classes.witchDoctor},
      { slug: "gloveswizard", type: ItemTypes.gloves, class: Classes.wizard},
    ],
    bracers: [
      { slug: "bracers", type: ItemTypes.bracers, class: Classes.all },
    ],
    waist: [
      { slug: "genericbelt", type: ItemTypes.belt, class: Classes.all },
      { slug: "beltbarbarian", type: ItemTypes.mightyBelt, class: Classes.barbarian }
    ],
    legs:  [
      { slug: "legs", type: ItemTypes.legs, class: Classes.all },
      { slug: "legsbarbarian", type: ItemTypes.legs, class: Classes.barbarian },
      { slug: "legscrusader", type: ItemTypes.legs, class: Classes.crusader },
      { slug: "legsdemonhunter", type: ItemTypes.legs, class: Classes.demonHunter },
      { slug: "legsmonk", type: ItemTypes.legs, class: Classes.monk },
      { slug: "legsnecromancer", type: ItemTypes.legs, class: Classes.necromancer },
      { slug: "legswitchdoctor", type: ItemTypes.legs, class: Classes.witchDoctor },
      { slug: "legswizard", type: ItemTypes.legs, class: Classes.wizard },
    ],
    boots: [
      { slug: "boots", type: ItemTypes.boots, class: Classes.all},
      { slug: "bootsbarbarian", type: ItemTypes.boots, class: Classes.barbarian},
      { slug: "bootscrusader", type: ItemTypes.boots, class: Classes.crusader},
      { slug: "bootsdemonhunter", type: ItemTypes.boots, class: Classes.demonHunter},
      { slug: "bootsmonk", type: ItemTypes.boots, class: Classes.monk},
      { slug: "bootsnecromancer", type: ItemTypes.boots, class: Classes.necromancer},
      { slug: "bootswitchdoctor", type: ItemTypes.boots, class: Classes.witchDoctor},
      { slug: "bootswizard", type: ItemTypes.boots, class: Classes.wizard},
    ],
    jewelry: [
      { slug: "amulet", type: ItemTypes.necklace, class: Classes.all },
      { slug: "ring", type: ItemTypes.ring, class: Classes.all },
    ],
    offhand: [
      { slug: "shield", type: ItemTypes.shield, class: Classes.all },
      { slug: "crusadershield", type: ItemTypes.crusaderShield, class: Classes.crusader },
      { slug: "quiver", type: ItemTypes.quiver, class: Classes.demonHunter },
      { slug: "necromanceroffhand", type: ItemTypes.phylactery, class: Classes.necromancer },
      { slug: "mojo", type: ItemTypes.mojo, class: Classes.witchDoctor },
      { slug: "orb", type: ItemTypes.orb, class: Classes.wizard },
    ],
    follower: [
      { slug: "enchantressspecial", type: ItemTypes.enchantressFocus, class: Classes.enchantress },
      { slug: "scoundrelspecial", type: ItemTypes.scoundrelToken, class: Classes.scoundrel },
      { slug: "templarspecial", type: ItemTypes.templarRelict, class: Classes.templar },
    ]
  }
}

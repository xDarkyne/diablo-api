import { ItemCategories, HeroClasses } from "../types/";

export abstract class StorageHelper {
  public static Classes: Record<keyof HeroClasses, string> = {
    all: "all",
    barbarian: "barbarian",
    crusader: "crusader",
    demonHunter: "demon-hunter",
    monk: "monk",
    necromancer: "necromancer",
    witchDoctor: "witch-doctor",
    wizard: "wizard"
  }

  public static Categories: Record<keyof ItemCategories, [string, string][]> = {
    boots: [
      ["boots", this.Classes.all],
      ["bootsbarbarian", this.Classes.barbarian],
      ["bootscrusader", this.Classes.crusader],
      ["bootsdemonhunter", this.Classes.demonHunter],
      ["bootsmonk", this.Classes.monk],
      ["bootsnecromancer", this.Classes.necromancer],
      ["bootswitchdoctor", this.Classes.witchDoctor],
      ["bootswizard", this.Classes.wizard],
    ],
    head: [

    ],
    shoulders: [

    ],
    chest: [

    ],
    gloves: [
      ["gloves", this.Classes.all],
      ["glovesbarbarian", this.Classes.barbarian],
      ["glovescrusader", this.Classes.crusader],
      ["glovesdemonhunter", this.Classes.demonHunter],
      ["glovesmonk", this.Classes.monk],
      ["glovesnecromancer", this.Classes.necromancer],
      ["gloveswitchdoctor", this.Classes.witchDoctor],
      ["gloveswizard", this.Classes.wizard],
    ]
  }
}

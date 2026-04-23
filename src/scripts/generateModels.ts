import fs from "fs";
import path from "path";

const baseDir = path.resolve("src/assets/chars");
const outputFile = path.resolve("public/list/models.json");

type Variant = {
  name: string,
  label: string,
  path: string
};

type Character = {
  id: string
  name: string,
  variants: Variant[]
};

const map: Record<string, Character> = {};

const charactersList: Record<string, string> = {
  "103": "Amber",
  "106": "???",
  "107": "Tilia",
  "108": "Kasimira",
  "109": "???",
  "110": "Firenze",
  "111": "Iris",
  "112": "Noya",
  "113": "Shimiao",
  "114": "???",
  "115": "???",
  "116": "Ridge",
  "117": "Jinglin",
  "118": "Coronis",
  "119": "Nanoha",
  "120": "Canace",
  "123": "Ann",
  "125": "Freesia",
  "126": "Flora",
  "127": "Teresa",
  "129": "???",
  "130": "Donna",
  "132": "Minova",
  "133": "Nazuka",
  "134": "Fuyuka",
  "135": "Mistique",
  "136": "???",
  "137": "???",
  "139": "???",
  "140": "???",
  "141": "Chixia",
  "142": "Cosette",
  "143": "Wraith",
  "144": "Chitose",
  "145": "Otoha",
  "147": "Caramel",
  "149": "Gerie",
  "150": "Laru",
  "155": "Shia",
  "156": "Nazuna",
  "157": "???",
  "158": "Snowish Laru",
  "159": "Springseek Coronis",
  "160": "???"
}

function getModelTypeLabel(key: string): string {
  let label: string = "Unknow";

  switch(key) {
    case "1_L":
      label = "Default";
      break;
    case "1_F":
      label = "Memory Snapshot";
      break;
    case "1_T":
      label = "Talent";
      break;
    case "2_L":
      label = "Awakened";
      break;
  }

  return label;
}

for (const charId of fs.readdirSync(baseDir)) {
  const charPath = path.join(baseDir, charId);

  if (!fs.statSync(charPath).isDirectory()) continue;

  for (const variant of fs.readdirSync(charPath)) {
    const variantPath = path.join(charPath, variant);

    if (!fs.statSync(variantPath).isDirectory()) continue;

    const files = fs.readdirSync(variantPath);
    const modelFile = files.find((f) => f.endsWith(".model3.json"));

    if (!modelFile) continue;

    const charName = charactersList[modelFile.slice(0,3)];

    if (!map[charName]) {
      map[charName] = {
        id: charId,
        name: charName,
        variants: []
      };
    }

    map[charName].variants.push({
      name: variant,
      label: getModelTypeLabel(modelFile.slice(4, 7)),
      path: `/assets/chars/${charId}/${variant}/${modelFile}`
    })
  }
}

const result: Character[] = Object.values(map);

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

console.log(`Generated ${result.length} characters`);

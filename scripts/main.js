const fs = require('fs');
const GLOBAL_URL = "https://ddragon.leagueoflegends.com/cdn";

const create_database = require("./create_database.js");

function formattingImage(championName, patch) {
    let full = `${GLOBAL_URL}/img/champion/splash/${championName}_0.jpg`;
    let loading = `${GLOBAL_URL}/img/champion/loading/${championName}_0.jpg`;
    let square = `${GLOBAL_URL}/${patch}/img/champion/${championName}.png`;

    return {
        full,
        loading,
        square,
    };
};

function formattingSkins(championName, skins) {
    const newSkins = [];
    const define_url = (championName, num, type) => `${GLOBAL_URL}/img/champion/${type}/${championName}_${num}.jpg`;

    const modelView = (id) => `https://modelviewer.lol/pt-BR/model-viewer?id=${id}`;

    for (let i in skins) {
        const skin = skins[i];
        const newSkin = {
            id: skin.id,
            name: skin.name,
            splash: define_url(championName, skin.num, 'splash'),
            centered: define_url(championName, skin.num, 'centered'),
            loading: define_url(championName, skin.num, 'loading'),
            model_view: modelView(skin.id),
        };
        newSkins.push(newSkin);
    }

    return newSkins;
};

function formattingSpells(spells, patch) {
    const newSpells = [];

    for (let i in spells) {
        const spell = spells[i];
        const newSpell = {
            id: spell.id,
            name: spell.name,
            description: spell.description,
            image: `${GLOBAL_URL}/${patch}/img/spell/${spell.id}.png`,
        };
        newSpells.push(newSpell);
    }

    return newSpells;
};

function formattingPassive(passive, patch) {
    const passiveName = passive.image.full;

    const newPassive = {
        name: passive.name,
        description: passive.description,
        image: `${GLOBAL_URL}/${patch}/img/passive/${passiveName}`,
    };

    return newPassive;
}

async function dataFilteringAndFormatting(championFull, patch) {
    const newChampionFull = {
        keys: championFull.keys,
    };

    for (let i in championFull.data) {
        const champion = championFull.data[i];
        const newChampion = {
            id: champion.id,
            key: champion.key,
            name: champion.name,
            title: champion.title,
            image: formattingImage(champion.id, patch),
            skins: formattingSkins(champion.id, champion.skins),
            lore: champion.lore,
            tags: champion.tags,
            partype: champion.partype,
            info: champion.info,
            stats: champion.stats,
            spells: formattingSpells(champion.spells, patch),
            passive: formattingPassive(champion.passive, patch),
        };
        newChampionFull[champion.id] = newChampion;
    }

    return newChampionFull;
};

async function writeJSONFile(data, fileName, fn) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(fileName, jsonData, (err) => {
        if (err) {
            console.error('Erro ao escrever arquivo JSON:', err);
            return;
        }
        console.log('Arquivo JSON foi salvo com sucesso!');
    });
}

async function readFileAndDefinePatch() {
    return new Promise((resolve, reject) => {
        const dir_name = "./data/";
        fs.readdir(dir_name, (err, files) => {
            if (err) {
                reject(err);
            } else {
                console.log("Arquivos com nome _global:");
                files.forEach(file => {
                    if (file.includes("_global")) {
                        resolve(file.replace('_global', ''));
                        console.log(file);
                    }
                });
            }
        });
    });
}

async function main() {
    const patch = await readFileAndDefinePatch();
    const championFull = require(`../data/${patch}_global/data/pt_BR/championFull.json`);
    // const championFull = require(`../data/${patch}_global/${patch}/data/pt_BR/championFull.json`);
    const newChampionFull = await dataFilteringAndFormatting(championFull, patch);
    await writeJSONFile(newChampionFull, './data/newChampionsFull_Filtered.json');
    await create_database(newChampionFull, patch);
    console.log(`Database patch${patch} created`);
}

main();
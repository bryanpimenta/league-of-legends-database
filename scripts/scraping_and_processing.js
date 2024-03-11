const fs = require('fs');

function formattingImage(championName, patch) {
    const URL = "https://ddragon.leagueoflegends.com/cdn";

    let full = `${URL}/img/champion/splash/${championName}_0.jpg`;
    let loading = `${URL}/img/champion/loading/${championName}_0.jpg`;
    let square = `${URL}/${patch}/img/champion/${championName}.png`;

    return {
        full,
        loading,
        square,
    };
};

function formattingSkins(championName, skins) {
    const newSkins = [];
    const URL = "https://ddragon.leagueoflegends.com/cdn";
    const full = (championName, num) => `${URL}/img/champion/splash/${championName}_${num}.jpg`;
    const loading = (championName, num) => `${URL}/img/champion/loading/${championName}_${num}.jpg`;

    for (let i in skins) {
        const skin = skins[i];
        const newSkin = {
            id: skin.id,
            name: skin.name,
            splashArt: full(championName, skin.num),
            splashLoading: loading(championName, skin.num)
        };
        newSkins.push(newSkin);
    }

    return newSkins;
};

function formattingSpells(spells, patch) {
    const newSpells = [];
    const URL = "https://ddragon.leagueoflegends.com/cdn";

    for (let i in spells) {
        const spell = spells[i];
        const newSpell = {
            id: spell.id,
            name: spell.name,
            description: spell.description,
            image: `${URL}/${patch}/img/spell/${spell.id}.png`,
        };
        newSpells.push(newSpell);
    }

    return newSpells;
};

function formattingPassive(passive, patch) {
    const URL = "https://ddragon.leagueoflegends.com/cdn";
    const passiveName = passive.image.full;

    const newPassive = {
        name: passive.name,
        description: passive.description,
        image: `${URL}/${patch}/img/passive/${passiveName}`,
    };

    return newPassive;
}

async function dataFilteringAndFormatting(championFull, patch) {
    const newChampionFull = {};

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

function writeJSONFile(data, fileName) {
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
    const championFull = require(`../data/${patch}_global/${patch}/data/pt_BR/championFull.json`);
    const newChampionFull = await dataFilteringAndFormatting(championFull, patch);
    writeJSONFile(newChampionFull, './data/newChampionsFull_Filtered.json');
}

main();
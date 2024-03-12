const fs = require('fs');

function escapeSingleQuotes(str) {
    return str.replace(/'/g, "\\'");
}

const leagueOfLegends_database = `CREATE DATABASE IF NOT EXISTS LeagueOfLegendsDataBase;

USE LeagueOfLegendsDataBase;`;

const champion = `CREATE TABLE Champion (
    \`key\` VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    title VARCHAR(255),
    lore TEXT,
    tags TEXT,
    partype VARCHAR(255),
    image_full VARCHAR(255),
    image_loading VARCHAR(255),
    image_square VARCHAR(255)
);`;

const skins = `CREATE TABLE ChampionSkin (
    id INT PRIMARY KEY,
    champion_id VARCHAR(255),
    name VARCHAR(255),
    splash VARCHAR(255),
    centered VARCHAR(255),
    loading VARCHAR(255),
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

function insert_championSkin(data) {
    const skin_labels = ['id', 'champion_id', 'name', 'splash', 'centered', 'loading'];
    let insert = `INSERT INTO ChampionSkin (${skin_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        const championName = data[champion];
        const skins = championName.skins;
        skins.forEach(skin => {
            insert += '\n';
            insert += `('${skin.id}', '${data[champion].key}', '${escapeSingleQuotes(skin.name)}', '${skin.splash}', '${skin.centered}', '${skin.loading}'),`;
        });
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}

const info = `CREATE TABLE ChampionInfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id CHAR(255),
    attack INT,
    defense INT,
    magic INT,
    difficulty INT,
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

function insert_championInfo(data) {
    const info_labels = ['champion_id', 'attack', 'defense', 'magic', 'difficulty'];
    let insert = `INSERT INTO ChampionInfo (${info_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        const championName = data[champion];
        const info = championName.info;
        insert += '\n';
        insert += `('${data[champion].key}', '${info.attack}', '${info.defense}', '${info.magic}', '${info.difficulty}'),`;
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}

const stats = `CREATE TABLE ChampionStats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id CHAR(255),
    hp INT,
    hpperlevel INT,
    mp INT,
    mpperlevel INT,
    movespeed INT,
    armor INT,
    armorperlevel INT,
    spellblock INT,
    spellblockperlevel INT,
    attackrange INT,
    hpregen INT,
    hpregenperlevel INT,
    mpregen INT,
    mpregenperlevel INT,
    crit INT,
    critperlevel INT,
    attackdamage INT,
    attackdamageperlevel INT,
    attackspeedperlevel INT,
    attackspeed INT,
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

function insert_championStats(data) {
    const stats_labels = ['champion_id', 'hp', 'hpperlevel', 'mp', 'mpperlevel', 'movespeed', 'armor', 'armorperlevel', 'spellblock', 'spellblockperlevel', 'attackrange', 'hpregen', 'hpregenperlevel', 'mpregen', 'mpregenperlevel', 'crit', 'critperlevel', 'attackdamage', 'attackdamageperlevel', 'attackspeedperlevel', 'attackspeed'];
    let insert = `INSERT INTO ChampionStats (${stats_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        const championName = data[champion];
        const stats = championName.stats;
        insert += '\n';
        insert += `('${data[champion].key}', '${stats.hp}', '${stats.hpperlevel}', '${stats.mp}', '${stats.mpperlevel}', '${stats.movespeed}', '${stats.armor}', '${stats.armorperlevel}', '${stats.spellblock}', '${stats.spellblockperlevel}', '${stats.attackrange}', '${stats.hpregen}', '${stats.hpregenperlevel}', '${stats.mpregen}', '${stats.mpregenperlevel}', '${stats.crit}', '${stats.critperlevel}', '${stats.attackdamage}', '${stats.attackdamageperlevel}', '${stats.attackspeedperlevel}', '${stats.attackspeed}'),`;
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}

const spells = `CREATE TABLE ChampionSpell (
    id CHAR(255) PRIMARY KEY,
    champion_id CHAR(255),
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

function insert_championSpell(data) {
    const spells_labels = ['id', 'champion_id', 'name', 'description', 'image'];
    let insert = `INSERT INTO ChampionSpell (${spells_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        const championName = data[champion];
        const spells = championName.spells;
        spells.forEach(spell => {
            insert += '\n';
            insert += `('${escapeSingleQuotes(spell.id)}', '${data[champion].key}', '${escapeSingleQuotes(spell.name)}', '${escapeSingleQuotes(spell.description)}', '${spell.image}'),`;
        });
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}


const passive = `CREATE TABLE ChampionPassive (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id CHAR(255),
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

function insert_championPassive(data) {
    const passive_labels = ['champion_id', 'name', 'description', 'image'];
    let insert = `INSERT INTO ChampionPassive (${passive_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        const championName = data[champion];
        const passive = championName.passive;
        insert += '\n';
        insert += `('${data[champion].key}', '${escapeSingleQuotes(passive.name)}', '${escapeSingleQuotes(passive.description)}', '${passive.image}'),`;
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}

function insert_champion(data) {
    const champion_labels = ['name', 'title', 'lore', 'tags', 'partype', 'image_full', 'image_loading', 'image_square'];
    let insert = `INSERT INTO Champion (\`key\`, ${champion_labels.join(', ')}) VALUES`;
    Object.values(data.keys).forEach(champion => {
        champ = escapeSingleQuotes(data[champion].name);
        lore = escapeSingleQuotes(data[champion].lore);
        insert += '\n';
        insert += `('${data[champion].key}', '${champ}', '${data[champion].title}', '${lore}', '${data[champion].tags}', '${data[champion].partype}', '${data[champion].image.full}', '${data[champion].image.loading}', '${data[champion].image.square}'),`;
    });

    insert = insert.slice(0, -1);
    insert += ';';

    return insert;
}

async function writeSQLFile(data, fileName, fn) {
    fs.writeFile(fileName, data, fn);
}

async function create_database(newChampionFull, patch) {
    const champion_table = champion;
    const champion_insert = insert_champion(newChampionFull);

    const skins_table = skins;
    const skin_insert = insert_championSkin(newChampionFull);

    const info_table = info;
    const info_insert = insert_championInfo(newChampionFull);

    const stats_table = stats;
    const stats_insert = insert_championStats(newChampionFull);

    const spells_table = spells;
    const spells_insert = insert_championSpell(newChampionFull);

    const passive_table = passive;
    const passive_insert = insert_championPassive(newChampionFull);

    const database = `${leagueOfLegends_database}\n\n${champion_table}\n\n${champion_insert}\n\n${skins_table}\n\n${skin_insert}\n\n${info_table}\n\n${info_insert}\n\n${stats_table}\n\n${stats_insert}\n\n${spells_table}\n\n${spells_insert}\n\n${passive_table}\n\n${passive_insert}`;
    await writeSQLFile(database, `database_${patch}.sql`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`File database_${patch}.sql created`);
        }
    });
}

module.exports = create_database;
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

const info = `CREATE TABLE ChampionInfo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id CHAR(255),
    attack INT,
    defense INT,
    magic INT,
    difficulty INT,
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

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

const spells = `CREATE TABLE ChampionSpell (
    id CHAR(255) PRIMARY KEY,
    champion_id CHAR(255),
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

const passive = `CREATE TABLE ChampionPassive (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id CHAR(255),
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (champion_id) REFERENCES Champion(\`key\`)
);`;

module.exports = {
    leagueOfLegends_database,
    champion, 
    skins, 
    info, 
    stats, 
    spells, 
    passive
};

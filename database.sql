-- Tabela para armazenar informações básicas dos campeões
CREATE TABLE Champion (
    id VARCHAR(50) PRIMARY KEY,
    key VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    lore TEXT,
    partype VARCHAR(50) NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    magic INT NOT NULL,
    difficulty INT NOT NULL,
    UNIQUE (key)
);

-- Tabela para armazenar estatísticas dos campeões
CREATE TABLE ChampionStats (
    id VARCHAR(50) PRIMARY KEY,
    hp INT NOT NULL,
    hpperlevel INT NOT NULL,
    mp INT NOT NULL,
    mpperlevel INT NOT NULL,
    movespeed INT NOT NULL,
    armor FLOAT NOT NULL,
    armorperlevel FLOAT NOT NULL,
    spellblock FLOAT NOT NULL,
    spellblockperlevel FLOAT NOT NULL,
    attackrange INT NOT NULL,
    hpregen FLOAT NOT NULL,
    hpregenperlevel FLOAT NOT NULL,
    mpregen FLOAT NOT NULL,
    mpregenperlevel FLOAT NOT NULL,
    crit FLOAT NOT NULL,
    critperlevel FLOAT NOT NULL,
    attackdamage FLOAT NOT NULL,
    attackdamageperlevel FLOAT NOT NULL,
    attackspeed FLOAT NOT NULL,
    attackspeedperlevel FLOAT NOT NULL,
    FOREIGN KEY (id) REFERENCES Champion(id)
);

-- Tabela para armazenar informações das skins dos campeões
CREATE TABLE ChampionSkin (
    id VARCHAR(50) PRIMARY KEY,
    champion_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    splash VARCHAR(255) NOT NULL,
    centered VARCHAR(255) NOT NULL,
    loading VARCHAR(255) NOT NULL,
    FOREIGN KEY (champion_id) REFERENCES Champion(id)
);

-- Tabela para armazenar informações das habilidades dos campeões
CREATE TABLE ChampionAbility (
    id VARCHAR(50) PRIMARY KEY,
    champion_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (champion_id) REFERENCES Champion(id)
);

-- Tabela para armazenar informações sobre a habilidade passiva dos campeões
CREATE TABLE ChampionPassive (
    id VARCHAR(50) PRIMARY KEY,
    champion_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (champion_id) REFERENCES Champion(id)
);

/* view para listar todos os campeões e suas skins */
CREATE VIEW vw_skins AS
SELECT
    ChampionSkin.name AS skin,
    Champion.name AS campeao,
    ChampionSkin.splash AS splash_art,
    ChampionSkin.centered AS splash_centralizada,
    ChampionSkin.loading AS splash_loading
FROM ChampionSkin
    JOIN Champion ON ChampionSkin.champion_id = Champion.key
WHERE
    ChampionSkin.name != "default";

/* view para mostrar algumas infos dos campeões */
CREATE VIEW vw_info_campeao AS
SELECT
    Champion.name AS nome,
    ChampionInfo.attack AS ataque,
    ChampionInfo.defense AS defesa,
    ChampionInfo.magic AS magia,
    ChampionInfo.difficulty AS dificuldade
FROM ChampionInfo
    JOIN Champion ON Champion.key = ChampionInfo.champion_id;

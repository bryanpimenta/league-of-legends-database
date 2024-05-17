
SELECT skin, campeao FROM vw_skins ORDER BY campeao;

/* quantidade de skins por campeão usando a view */
SELECT campeao, COUNT(*) AS quantidade_de_skins
FROM vw_skins
GROUP BY
    campeao
ORDER BY quantidade_de_skins DESC;

/* campeões mais difíceis usando a view*/
SELECT *
FROM vw_info_campeao
WHERE
    dificuldade LIKE 10
ORDER BY nome
LIMIT 10;
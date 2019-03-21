DROP SCHEMA IF EXISTS api CASCADE;
CREATE SCHEMA api;

CREATE TABLE api.categories(
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(500) NOT NULL CHECK (name != ''),
	parent_category INTEGER REFERENCES api.categories(category_id)
);
CREATE TABLE api.chapters(
	chapter_id SERIAL PRIMARY KEY,
	title VARCHAR(500) NOT NULL CHECK (title != ''),
	content VARCHAR(100000) NOT NULL CHECK (content != ''),
	category_id INTEGER NOT NULL REFERENCES api.categories(category_id),
	next_chapter INTEGER REFERENCES api.chapters(chapter_id)
);
CREATE TABLE api.questions(
	question_id SERIAL PRIMARY KEY,
	title VARCHAR(1000) NOT NULL CHECK (title != ''),
	answer_explanation VARCHAR(10000) NOT NULL CHECK (answer_explanation != ''),
	category_id INTEGER REFERENCES api.categories(category_id)
);

CREATE TABLE api.answers(
	answer_id SERIAL NOT NULL,
	content VARCHAR(10000) NOT NULL CHECK (content != ''),
	is_correct BOOLEAN NOT NULL DEFAULT false,
	question_id INTEGER REFERENCES api.questions(question_id),
	PRIMARY KEY(question_id, answer_id)
);

--categories INSERTION
INSERT INTO api.categories VALUES(1, 'La voie publique', NULL);
INSERT INTO api.categories VALUES(2, 'La chaussée', 1);
INSERT INTO api.categories VALUES(3, 'Les bandes de circulation', 1);
INSERT INTO api.categories VALUES(4, 'La piste cyclable', 1);
INSERT INTO api.categories VALUES(5, 'L''autoroute', 1);
INSERT INTO api.categories VALUES(6, 'La route pour automobiles', 1);
INSERT INTO api.categories VALUES(7, 'Endroits particuliers', 1);

INSERT INTO api.categories VALUES(8, 'Les usagers de la route', NULL);
INSERT INTO api.categories VALUES(9, 'Les piétons', 8);
INSERT INTO api.categories VALUES(10, 'Les conducteurs de véhicules', 8);


INSERT INTO api.categories VALUES(11, 'La voiture', NULL);
INSERT INTO api.categories VALUES(12, 'La MMA - LE MEC', 11);
INSERT INTO api.categories VALUES(13, 'Chargement de véhicules', 11);
INSERT INTO api.categories VALUES(14, 'Les feux d''une voiture et la corne', 11);


INSERT INTO api.categories VALUES(15, 'La vitesse', NULL);
INSERT INTO api.categories VALUES(16, 'La vitesse maximale', 15);
INSERT INTO api.categories VALUES(17, 'La distance d''arrêt', 15);


INSERT INTO api.categories VALUES(18, 'Croisement et Dépassement', NULL);
INSERT INTO api.categories VALUES(19, 'Le croisement', 18);
INSERT INTO api.categories VALUES(20, 'Dépaser par la gauche', 18);
INSERT INTO api.categories VALUES(21, 'Dépassement par la gauche interdit', 18);

INSERT INTO api.categories VALUES(22, 'La priorité', NULL);
INSERT INTO api.categories VALUES(23, 'Les personnes qualifiées', 22);
INSERT INTO api.categories VALUES(24, 'Les signaux lumineux de circulation', 22);
INSERT INTO api.categories VALUES(25, 'Les panneux', 22);
INSERT INTO api.categories VALUES(26, 'La priorité de droite', 22);
INSERT INTO api.categories VALUES(27, 'Tourner à droite et à gauche', 22);
INSERT INTO api.categories VALUES(28, 'Train - Tram - Autobus', 22);

INSERT INTO api.categories VALUES(29, 'Où circuler', NULL);
INSERT INTO api.categories VALUES(30, 'Sens interdits', 29);
INSERT INTO api.categories VALUES(31, 'Direction obligatoire', 29);

INSERT INTO api.categories VALUES(32, 'Arrêt et stationnement', NULL);
INSERT INTO api.categories VALUES(33, 'Arrêt et stationnement (1)', 32);
INSERT INTO api.categories VALUES(34, 'Arrêt et stationnement (2)', 32);
INSERT INTO api.categories VALUES(35, 'Arrêt et stationnement (3)', 32);

INSERT INTO api.categories VALUES(36, 'Divers', NULL);
INSERT INTO api.categories VALUES(37, 'Alcool et drogues', 36);
INSERT INTO api.categories VALUES(38, 'Accident', 36);
INSERT INTO api.categories VALUES(39, 'La consommation du carburant', 36);
INSERT INTO api.categories VALUES(40, 'La technique', 36);
INSERT INTO api.categories VALUES(41, 'Infractions du 3ème et 4ème degré', 36);


--chapters INSERTION
INSERT INTO api.chapters VALUES(9, 'Vitesse maximale autorisée', 'Contrairement aux routes ordinaires, où l''on peut rouler jusqu''à 90 km/h, sur l''autoroute on peut rouler jusqu''à 120 km/h. Cela n''est évidemment permis que si les conditions de circulation justifient cette vitesse et qu''aucun agent qualifié ou panneau de signalisation ne l''interdise.', 5, NULL);
INSERT INTO api.chapters VALUES(8, 'L''autoroute', 'Une autoroute est une voie publique dont le commencement ou l''accès est indiqué par le premier panneau de signalisation et dont la fin est indiquée par le deuxième. Il est agréable de rouler sur une autoroute car il n''y a pas de feux de signalisation ni de jonctions prioritaires. Les véhicules à moteur et trains de véhicules peuvent circuler sur l''autoroute, sauf: les cyclomoteurs; les véhicules agricoles; les quadricycles sans habitacle; les trains de véhicules forains.', 5, 9);

INSERT INTO api.chapters VALUES(7, 'Signal d''obligation', 'Ce signal d''obligation qui montre les piétons et la bicyclette côte à côte, signifie que les bicyclettes, les cyclomoteurs classe A et également les piétons sont tenus d''utiliser cette partie de la voie publique.\nLes cyclomoteurs classe B ne peuvent pas l''emprunter.\n\nSi les piétons et la bicyclette se trouvent l''un au-dessus de l''autre, seuls les bicyclettes et les piétons doivent emprunter cette partie de la voie publique.\nLes cyclomoteurs de classe A et de classe B ne peuvent pas l''emprunter.', 4, NULL);
INSERT INTO api.chapters VALUES(6, 'Qu''est-ce qu''une piste cyclable?', 'Une piste cyclable est une partie de la voie publique, sur laquelle les bicyclettes et les cyclomoteurs classe A doivent circuler. Parfois, les conducteurs de cyclomoteurs classe B sont aussi tenus d''emprunter la piste cyclable. Une piste cyclable est indiquée par: l''un des signaux d''obligation ci-dessus, ou deux lignes discontinues parallèles de couleur blanche, entre lesquelles la largeur n''est pas suffisante pour permettre la circulation des véhicules automobiles. La piste cyclable peut se trouver à droite ou à gauche de la chaussée. Elle est parfois peinte en rouge, mais ce n''est pas obligatoire.', 4, 7);

INSERT INTO api.chapters VALUES(5, 'Flèches sur les bandes de circulation', 'Près des intersections, des flèches sont parfois peintes sur la chaussée. Ces flèches indiquent la direction que les conducteurs doivent prendre. Ces flèches sont également des marques routières. S''il y a plusieurs bandes de circulation, ce signal d''indication bleu est souvent placé à côté de la chaussée.', 3, NULL);
INSERT INTO api.chapters VALUES(4, 'Les bandes de circulation', 'Une chaussée peut être subdivisée en bandes de circulation à l''aide du marquage routier. Dans ce cas, le marquage routier signifie : une ou plusieurs lignes de couleur blanche, soit continues, soit discontinues indiquées au milieu de la chaussée. Ce marquage routier divise la chaussée en deux ou plusieurs bandes de circulation.', 3, 5);

INSERT INTO api.chapters VALUES(3, 'Un terrain non public', 'Un terrain non public, comme le terrain de manœuvres d''une auto-école ou le parking d''un terrain industriel, est un endroit où nous ne pourrions nous rendre avec notre véhicule, que si nous avions une bonne raison et la permission de le faire.', 2, NULL);
INSERT INTO api.chapters VALUES(2, 'Un terrain public', 'Un terrain public, comme le parking d''un restaurant ou une station-service, est un lieu public où nous pouvons nous rendre avec notre véhicule, pour autant que nous ayons une bonne raison de le faire.', 2, 3);
INSERT INTO api.chapters VALUES(1, 'Une voie public', 'Une voie publique, par exemple une route, un pont, un tunnel, un sentier, un chemin de terre, une place, une autoroute ..., est un lieu public où nous pouvons nous rendre sans problème avec nos véhicules, lorsque nous souhaitons nous déplacer.{"\n"}Notre présence à cet endroit ne nécessite aucune justification.', 2, 2);

-- --questions INSERTION
INSERT INTO api.questions VALUES(1, 'Pour débarquer un passager, je m’immobilise : ', 'La piste cyclable: partie de la voie publique réservée à la circulation des cyclistes et cyclomoteurs de class A. La piste cyclable ne fait pas partie de la chaussée, elle ne peut donc pas être empruntée par les automobilistes. Le trottoir: partie de la voie publique, surélevée ou non par rapport au niveau de la chaussée. Aménagée pour les piétons. La séparation entre le trottoir et les autres parties de la voie publique est claire.', 2);
INSERT INTO api.answers VALUES(1, 'Sur le trottoir', false, 1);
INSERT INTO api.answers VALUES(2, 'Sur la piste cyclable', false, 1);
INSERT INTO api.answers VALUES(3, 'Sur la chaussée', true, 1);

INSERT INTO api.questions VALUES(2, 'Je dois contourner cet îlot directionnel : ', 'Le signal d''obligation vous l’impose', 2);
INSERT INTO api.answers VALUES(1, 'Au choix, par la gauche ou par la droite', false, 2);
INSERT INTO api.answers VALUES(2, 'Par la gauche', true, 2);
INSERT INTO api.answers VALUES(3, 'Par la droite', false, 2);

INSERT INTO api.questions VALUES(3, 'Sur ce dispositif surélevé, je dois rouler au maximum à : ', 'Un réducteur de vitesse consiste en une surélévation locale de la chaussée pour amener les conducteurs à réduire leur vitesse à 30 km/h. On ne peut pas circuler à une vitesse supérieure à 30 km/h dessus, dépasser par la gauche tout véhicule ou cycle, s''arrêter ou stationner (sauf exceptions locales)', 2);
INSERT INTO api.answers VALUES(1, '40 km/h', false, 3);
INSERT INTO api.answers VALUES(2, '35 km/h', false, 3);
INSERT INTO api.answers VALUES(3, '30 km/h', true, 3);

INSERT INTO api.questions VALUES(4, 'Où dois-je rouler ? ', 'Si la voie publique est une chaussée, le conducteur devra suivre cette chaussée en se tenant le plus près possible du bord droit de celle-ci. Rouler à droite est le principal fondement de la circulation.', 2);
INSERT INTO api.answers VALUES(1, 'Au milieu, ou à droite sur la chaussée, tant qu''il n''y a pas de conducteurs en sens inverse.', false, 4);
INSERT INTO api.answers VALUES(2, 'Du côté droit de la chaussée', false, 4);
INSERT INTO api.answers VALUES(3, 'Le plus plus près possible du bord droit de la chaussée.', true, 4);

INSERT INTO api.questions VALUES(5, 'Ce portique me permet de choisir la bande de circulation qui me conduit à destination : ', 'En présence des signaux routiers F13 ou F15, le conducteur peut choisir sa bande de circulation.', 2);
INSERT INTO api.answers VALUES(1, 'Même lorsque la circulation n''est pas dense', true, 5);
INSERT INTO api.answers VALUES(2, 'Uniquement lorsque la densité de la circulation le justifie', false, 5);


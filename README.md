<div style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.3); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); margin-bottom: 20px; color: #eee; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
<h1 style="color: #fff; text-align: center; font-size: 2.5em; margin-top: 0; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Discord Token Checker</h1>
<p style="text-align: center; font-size: 1.1em; line-height: 1.5; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Ce projet est un outil simple et efficace conçu pour vérifier la validité d'une liste de tokens Discord. Il permet d'identifier rapidement quels tokens sont toujours actifs et fonctionnels, ce qui peut être utile pour la gestion de comptes ou l'audit.</p>
</div>

<div style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.3); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); margin-bottom: 20px; color: #eee; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
<h2 style="color: #fff; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Structure et Fonctionnement</h2>

<h3 style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Structure des Fichiers</h3>
<pre style="background-color: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.1); color: #ccc; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>

─src/
│   index.js
│
└───Tokens/
token_list.txt
valid_tokens.txt
</code></pre>

<ul style="list-style-type: none; padding-left: 0;">
    <li style="margin-bottom: 8px;"><strong style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>src/index.js</code></strong> : C'est le script principal qui exécute la logique de vérification des tokens.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>src/Tokens/token_list.txt</code></strong> : Ce fichier est votre entrée. Vous devez y placer tous les tokens Discord que vous souhaitez vérifier, un token par ligne.</li>
    <li><strong style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>src/Tokens/valid_tokens.txt</code></strong> : Ce fichier est la sortie du script. Après l'exécution, tous les tokens trouvés comme valides seront écrits ici, un par ligne.</li>
</ul>

<h3 style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Fonctionnement Détaillé</h3>
<p style="font-family: 'Oswald', 'Arial Narrow', sans-serif;">Le script <code>index.js</code> opère en plusieurs étapes pour vérifier chaque token de manière séquentielle :</p>
<ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Lecture des Tokens</strong> : Le script commence par lire le contenu du fichier <code>src/Tokens/token_list.txt</code>. Il divise le contenu en lignes, supprime les espaces inutiles et filtre les lignes vides pour obtenir une liste propre de tokens à vérifier.
    </li>
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Vérification Séquentielle</strong> : Pour chaque token de la liste, une fonction asynchrone <code>checkToken</code> est appelée. Le script parcourt les tokens un par un, affichant une progression dans la console (par exemple, <code>[<span style="color: #FF6347;">1</span>/<span style="color: #FF6347;">10</span>]</code> pour le premier token sur dix).
    </li>
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Connexion à Discord</strong> : La fonction <code>checkToken</code> crée une nouvelle instance de <code>Client</code> (issue de la bibliothèque <code><span style="color: #4169E1;">discord.js-selfbot-v13</span></code>, conçue pour les tokens d'utilisateur) et tente de se connecter à Discord en utilisant le token fourni.
    </li>
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Gestion des Événements</strong> :
        <ul style="list-style-type: circle; padding-left: 20px;">
            <li style="margin-bottom: 5px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong><code>client.on("ready")</code></strong> : Si le client se connecte avec succès (l'événement <code>ready</code> est émis), le token est considéré comme valide. Le tag de l'utilisateur est affiché dans la console, le token est ajouté au fichier <code>valid_tokens.txt</code>, et la connexion est détruite pour libérer les ressources.</li>
            <li style="margin-bottom: 5px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong><code>client.on("rateLimit")</code></strong> : Si une limite de taux (rate limit) de l'API Discord est détectée, le script met en pause la vérification pendant 5 secondes pour éviter d'être bloqué par Discord.</li>
            <li style="margin-bottom: 5px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong><code>client.on("error")</code> ou <code>client.login().catch()</code></strong> : Si une erreur survient pendant la connexion (par exemple, token invalide, réseau inaccessible) ou si l'événement <code>error</code> est déclenché, le token est considéré comme invalide. Un message d'erreur est affiché dans la console.</li>
        </ul>
    </li>
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Sauvegarde des Tokens Valides</strong> : Chaque token valide est ajouté à la fin du fichier <code>src/Tokens/valid_tokens.txt</code>, garantissant que vous avez une liste consolidée de tous les tokens fonctionnels.
    </li>
    <li style="font-family: 'Oswald', 'Arial Narrow', sans-serif;">
        <strong>Fin de la Vérification</strong> : Une fois que tous les tokens de la liste ont été traités, un message de confirmation "Vérification terminée." est affiché dans la console.
    </li>
</ol>
<p style="font-family: 'Oswald', 'Arial Narrow', sans-serif;">Ce processus est entièrement automatisé une fois le script lancé, vous fournissant une liste propre de tokens fonctionnels.</p>

</div>

<div style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.3); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); margin-bottom: 20px; color: #eee; font-family: 'Oswald', 'Arial Narrow', sans-serif;">
<h2 style="color: #fff; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Manière de l'Installer et de l'Utiliser</h2>

<h3 style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Prérequis</h3>
<p style="font-family: 'Oswald', 'Arial Narrow', sans-serif;">Assurez-vous d'avoir <a href="[https://nodejs.org/en/download/](https://nodejs.org/en/download/)" style="color: #4169E1; text-decoration: none;">Node.js</a> et <code>npm</code> (qui vient avec Node.js) installés sur votre machine.</p>

<h3 style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Installation</h3>
<ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong>Téléchargez le projet</strong> : Clonez ce dépôt Git ou téléchargez directement les fichiers du projet.
        <pre style="background-color: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.1); color: #ccc; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>

git clone <URL_DU_DEPOT>
cd <NOM_DU_DOSSIER_DU_PROJET>
</code></pre>
<p style="font-size: 0.9em; color: #aaa; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><em>(Remplacez <code><URL_DU_DEPOT></code> et <code><NOM_DU_DOSSIER_DU_PROJET></code> par les informations réelles si vous utilisez Git.)</em></p>
</li>
<li style="font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong>Installez les dépendances</strong> : Naviguez vers le répertoire racine du projet dans votre terminal et exécutez :
<pre style="background-color: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.1); color: #4169E1; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>
npm install discord.js-selfbot-v13
</code></pre>
<p style="font-size: 0.9em; color: #aaa; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><em>(Le script utilise spécifiquement <code>discord.js-selfbot-v13</code> pour la vérification des tokens utilisateur.)</em></p>
</li>
</ol>

<h3 style="color: #fff; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Utilisation</h3>
<ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong>Préparez vos tokens</strong> : Ouvrez le fichier <code>src/Tokens/token_list.txt</code> et collez-y tous les tokens que vous souhaitez vérifier, en plaçant <strong>un token par ligne</strong>.</li>
    <li style="margin-bottom: 10px; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong>Exécutez le script</strong> : Dans votre terminal, depuis le répertoire racine du projet, lancez le script avec Node.js :
        <pre style="background-color: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.1); color: #ccc; font-family: 'Oswald', 'Arial Narrow', sans-serif;"><code>

node src/index.js
</code></pre>
</li>
<li style="font-family: 'Oswald', 'Arial Narrow', sans-serif;"><strong>Récupérez les résultats</strong> : Une fois l'exécution terminée, le fichier <code>src/Tokens/valid_tokens.txt</code> contiendra la liste de tous les tokens qui ont été vérifiés comme valides.</li>
</ol>

</div>

<div style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.3); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); margin-bottom: 20px; color: #eee; font-family: 'Oswald', 'Arial Narrow', sans-serif;">

<p style="text-align: center; font-size: 1.1em; line-height: 1.5; font-family: 'Oswald', 'Arial Narrow', sans-serif;">J'espère que cet outil vous sera utile !</p>
<p style="text-align: center; font-size: 1.1em; line-height: 1.5; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Si vous avez des questions, des suggestions ou si vous souhaitez simplement discuter de développement ou de Discord, n'hésitez pas à m'ajouter en ami sur Discord : <strong style="color: #fff;">2xokr</strong>.</p>
<p style="text-align: center; font-size: 1.1em; line-height: 1.5; font-family: 'Oswald', 'Arial Narrow', sans-serif;">Au plaisir de vous retrouver !</p>
</div>#   D i s c o r d - T o c k e n - C h e k e r  
 
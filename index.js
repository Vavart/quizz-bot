/**********************************************************
Initialisation et écriture des dépendances
***********************************************************/
var fs          = require('fs'),
readline        = require('readline'),
{google}        = require('googleapis'),
request         = require('request');

require("dotenv").config();

/**********************************************************
Fonction qui récupère la feuille GoogleSheets
***********************************************************/

// Initialisation de deux tableaux pour les mots à stocker
// Variables globales
var motsAnglais1 = [];
var motsFrancais1 = [];

var motsAnglais2 = [];
var motsFrancais2 = [];

var motsAnglais3 = [];
var motsFrancais3 = [];

var indice = '';

/**
 * Feuille exemple proposée par Google
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

function recupMots(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({

    // Identifiant de ma feuille GoogleSheets (se situe juste après à d/)
    spreadsheetId: process.env.SHEETID,

    /*
     * "On récupère quelles valeurs ? D'où à où ?"
     * Format : NomDeLaFeuille!Plage
     * Note : Le nom de la feuille se trouve en bas de la page GoogleSheets
    */
    range: 'Data Base!A2:B',

  }, (err, res) => {

    // S'il y a une erreur on l'affiche dans la console
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;

    if (indice === '1') {
      // Si on trouve du contenu...
      if (rows.length) {

        /* On récupères les lignes de la feuille GoogleSheets (= rows).
         *
         * On les map pour ensuite obtenir un objet qui à chaque "indice"
         * comporte un tableau de 2 mots (un anglais et sa traduction).
         *
         * On a donc par "rows" un seul "row" qui contient les deux mots.
         *
         * L'extraction est effectuée avec row[0] (anglais) et row[1] (français).
        */

        rows.map((row) => {
          motsAnglais1.push(row[0]);
          motsFrancais1.push(row[1]);

        });

        // Vérification si les mots du GoogleSheets ont bien été ajouté
        // Et on prévient l'utilisateur dans la console

        if ((motsAnglais1.length) && (motsFrancais1.length)) {
          // Log
          let d = new Date();
          let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
          let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
          let infoLog = date + ' ' + hours + ' ' + 'Les mots du quiz n°1 ont été mis à jour!';
          console.log(infoLog);
        }

      // ...sinon c'est qu'il n'y a rien
      }

      else {
        console.log('No data found.');
      }
    }

    if (indice === '2') {
      // Si on trouve du contenu...
      if (rows.length) {

        /* On récupères les lignes de la feuille GoogleSheets (= rows).
         *
         * On les map pour ensuite obtenir un objet qui à chaque "indice"
         * comporte un tableau de 2 mots (un anglais et sa traduction).
         *
         * On a donc par "rows" un seul "row" qui contient les deux mots.
         *
         * L'extraction est effectuée avec row[0] (anglais) et row[1] (français).
        */

        rows.map((row) => {
          motsAnglais2.push(row[0]);
          motsFrancais2.push(row[1]);

        });

        // Vérification si les mots du GoogleSheets ont bien été ajouté
        // Et on prévient l'utilisateur dans la console

        if ((motsAnglais2.length) && (motsFrancais2.length)) {
          // Log
          let d = new Date();
          let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
          let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
          let infoLog = date + ' ' + hours + ' ' + 'Les mots du quiz n°2 ont été mis à jour!';
          console.log(infoLog);
        }

      // ...sinon c'est qu'il n'y a rien
      }

      else {
        console.log('No data found.');
      }
    }

    if (indice === '3') {
      // Si on trouve du contenu...
      if (rows.length) {

        /* On récupères les lignes de la feuille GoogleSheets (= rows).
         *
         * On les map pour ensuite obtenir un objet qui à chaque "indice"
         * comporte un tableau de 2 mots (un anglais et sa traduction).
         *
         * On a donc par "rows" un seul "row" qui contient les deux mots.
         *
         * L'extraction est effectuée avec row[0] (anglais) et row[1] (français).
        */

        rows.map((row) => {
          motsAnglais3.push(row[0]);
          motsFrancais3.push(row[1]);

        });

        // Vérification si les mots du GoogleSheets ont bien été ajouté
        // Et on prévient l'utilisateur dans la console

        if ((motsAnglais3.length) && (motsFrancais3.length)) {
          // Log
          let d = new Date();
          let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
          let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
          let infoLog = date + ' ' + hours + ' ' + 'Les mots du quiz n°3 ont été mis à jour!';
          console.log(infoLog);
        }

      // ...sinon c'est qu'il n'y a rien
      }

      else {
        console.log('No data found.');
      }
    }


  });
}

/**********************************************************
Initialisation et démarrage du bot
***********************************************************/

const Discord = require('discord.js');
const bot = new Discord.Client();

// Token
bot.login(process.env.BOTTOKEN);

// Fonction qui s'éxécute quand le bot est prêt
bot.on('ready', readyDiscord);
function readyDiscord() {
  console.log("Le Quizz peut commencer");

}

/**********************************************************
Réaction aux messages
***********************************************************/
const logoBot = 'https://cdn.discordapp.com/attachments/797935531278336030/798278409885057064/QuizzBot.png';

// Salons
const channelIDinfo = 799019382926737418;
const channelID1 = 799016634005979226;
const channelID2 = 799017040870506567;
const channelID3 = 799017022234296331;


// Est-ce qu'on a posé la question dans le salon ? <=>  On ne peut pas relancer !quiz et les questions s'enchaînent
//                                                 oui
var questionPosee1 = false;
var questionPosee2 = false;
var questionPosee3 = false;

var motATraduire1 = '';
var motATraduire2 = '';
var motATraduire3 = '';

var timeOut1 = '';
var timeOut2 = '';
var timeOut3 = '';

// On définit le nombre de questions et le score pour faire un rapport
var score1 = 0;
var nbQuestions1 = 0;

var score2 = 0;
var nbQuestions2 = 0;

var score3 = 0;
var nbQuestions3 = 0;

// Tableaux généraux des mots appris
var motsAppris1 = [];
var motsAppris2 = [];
var motsAppris3 = [];

bot.on('message', gotMessage);

function gotMessage (msg) {

  // InfoBulle
  if (msg.channel.id == channelIDinfo && !msg.author.bot && msg.content == '!infobulle') {

    Info (msg);
    msg.delete();

    // Log
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a activé !infobulle';
    console.log(infoLog);
    return
  }

  // ------------------- PREMIER CHANNEL -------------------
  if (msg.channel.id == channelID1 && msg.content == '!quiz' && !questionPosee1) {

    indice = '1';
    score1 = 0;
    // On récupère les mots à chaque fois qu'on lance le quiz "actualisation"
    getGoogleSheets()

    const embedQuiz= new Discord.MessageEmbed()
      .setTitle('Le Quiz va bientôt commencer! Préparez-vous !')
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: "N'oublie pas!",
          value: 'Taper `!end` à tout moment pour stopper le Quiz :wink:',
        }
      )

    msg.channel.send(embedQuiz);

    questionPosee1 = true;
    timeOut1 = setTimeout(function(){ Quiz1 (msg); }, 1500);


    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a lancé le Quiz n°1';
    console.log(infoLog);

    return
  }

  // Si un quiz est déjà lancé dans le salon
  if (msg.channel.id == channelID1 && msg.content == '!quiz' && questionPosee1) {

    const embedErreur = new Discord.MessageEmbed()
      .setTitle("Hola que fais-tu camarade ?!")
      .setThumbnail(logoBot)
      .setColor('#197CB8')
      .addFields(
        {
          name: `Tu ne peux pas réaliser cette action :`,
          value: "Un quiz est déjà en cours dans ce salon ! Tape `!end` si tu souhaites y mettre fin :wink: ",
        }
      )
    msg.channel.send(embedErreur);
    return
  }

  // Si on veut juste arrêter de jouer
  if (msg.channel.id == channelID1 && msg.content == '!end') {

    questionPosee1 = false;
    clearTimeout(timeOut1);

    const embedEnd = new Discord.MessageEmbed()
      .setTitle("Le Quiz s'est arrêté !")
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: `Tu as eu ${score1}/${nbQuestions1} bonnes réponses pour cette session! :call_me:`,
          value: "Tape `!quiz` pour le relancer! :wink: ",
        }
      )
    msg.channel.send(embedEnd);

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a arrêté le Quiz n°1';
    console.log(infoLog);

    return
  }

  // Réception et vérification de la réponse
  if (msg.channel.id == channelID1 && questionPosee1 && !msg.author.bot && msg.content !== '!quiz') {

    reponseQuiz1 (msg);
    return
  }

  // ------------------- DEUXIEME CHANNEL -------------------
  if (msg.channel.id == channelID2 && msg.content == '!quiz' && !questionPosee2) {

    indice = '2';
    score2 = 0;
    // On récupère les mots à chaque fois qu'on lance le quiz "actualisation"
    getGoogleSheets()

    const embedQuiz= new Discord.MessageEmbed()
      .setTitle('Le Quiz va bientôt commencer! Préparez-vous !')
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: "N'oublie pas!",
          value: 'Taper `!end` à tout moment pour stopper le Quiz :wink:',
        }
      )

    msg.channel.send(embedQuiz);
    questionPosee2 = true;

    timeOut2 = setTimeout(function(){ Quiz2 (msg); }, 1500);


    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a lancé le Quiz n°2';
    console.log(infoLog);

    return
  }

  // Si un quiz est déjà lancé dans le salon
  if (msg.channel.id == channelID2 && msg.content == '!quiz' && questionPosee2) {

    const embedErreur = new Discord.MessageEmbed()
      .setTitle("Hola que fais-tu camarade ?!")
      .setThumbnail(logoBot)
      .setColor('#197CB8')
      .addFields(
        {
          name: `Tu ne peux pas réaliser cette action :`,
          value: "Un quiz est déjà en cours dans ce salon ! Tape `!end` si tu souhaites y mettre fin :wink: ",
        }
      )
    msg.channel.send(embedErreur);
    return
  }

  // Si on veut juste arrêter de jouer
  if (msg.channel.id == channelID2 && msg.content == '!end') {

    questionPosee2 = false;
    clearTimeout(timeOut2);
    const embedEnd = new Discord.MessageEmbed()
      .setTitle("Le Quiz s'est arrêté !")
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: `Tu as eu ${score2}/${nbQuestions2} bonnes réponses pour cette session! :call_me:`,
          value: "Tape `!quiz` pour le relancer! :wink: ",
        }
      )
    msg.channel.send(embedEnd);

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a arrêté le Quiz n°2';
    console.log(infoLog);
    return
  }

  // Réception et vérification de la réponse
  if (msg.channel.id == channelID2 && questionPosee2 && !msg.author.bot && msg.content !== '!quiz') {

    reponseQuiz2 (msg);
    return
  }

  // ------------------- TROISIEME CHANNEL -------------------
  if (msg.channel.id == channelID3 && msg.content == '!quiz' && !questionPosee3) {

    indice = '3';
    score3 = 0;
    // On récupère les mots à chaque fois qu'on lance le quiz "actualisation"
    getGoogleSheets()

    const embedQuiz= new Discord.MessageEmbed()
      .setTitle('Le Quiz va bientôt commencer! Préparez-vous !')
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: "N'oublie pas!",
          value: 'Taper `!end` à tout moment pour stopper le Quiz :wink:',
        }
      )

    msg.channel.send(embedQuiz);

    questionPosee3 = true;
    timeOut3 = setTimeout(function(){ Quiz3 (msg); }, 1500);

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a lancé le Quiz n°3';
    console.log(infoLog);
    return
  }

  // Si un quiz est déjà lancé dans le salon
  if (msg.channel.id == channelID3 && msg.content == '!quiz' && questionPosee3) {

    const embedErreur = new Discord.MessageEmbed()
      .setTitle("Hola que fais-tu camarade ?!")
      .setThumbnail(logoBot)
      .setColor('#197CB8')
      .addFields(
        {
          name: `Tu ne peux pas réaliser cette action :`,
          value: "Un quiz est déjà en cours dans ce salon ! Tape `!end` si tu souhaites y mettre fin :wink: ",
        }
      )
    msg.channel.send(embedErreur);
    return
  }

  // Si on veut juste arrêter de jouer
  if (msg.channel.id == channelID3 && msg.content == '!end') {

    questionPosee3 = false;
    clearTimeout(timeOut3);
    const embedEnd = new Discord.MessageEmbed()
      .setTitle("Le Quiz s'est arrêté !")
      .setThumbnail(logoBot)
      .setColor('#fd9e27')
      .addFields(
        {
          name: `Tu as eu ${score3}/${nbQuestions3} bonnes réponses pour cette session! :call_me:`,
          value: "Tape `!quiz` pour le relancer! :wink: ",
        }
      )
    msg.channel.send(embedEnd);

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
    let hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let infoLog = date + ' ' + hours + ' ' + msg.author.username + ' a arrêté le Quiz n°3';
    console.log(infoLog);

    return
  }

  // Réception et vérification de la réponse
  if (msg.channel.id == channelID3 && questionPosee3 && !msg.author.bot && msg.content !== '!quiz') {

    reponseQuiz3 (msg);
    return
  }

}

/**********************************************************
Fonctions du  Quiz
Quiz : Pose une question
reponseQuiz : Vérification de la réponse
***********************************************************/

function Quiz1 (msg) {

  i = getRandomIntInclusive(0,motsFrancais1.length-1);
  motATraduire1 = motsFrancais1[i];

  // L'un ou l'autre, cela ne change rien
  // Le -1 est pour éviter la traduction d'un mot undefined
  if (motsAppris1.length === motsFrancais1.length) {
    motsAppris1 = [];
  }

  // Si le mot a déjà été appris ==> On cherche un autre mot
  if (motsAppris1.includes(motATraduire1)) {
    Quiz1 (msg);
    return
  }


  const embedQuestion = new Discord.MessageEmbed()
    .setTitle('Traduis rapidement !')
    .setThumbnail(logoBot)
    .setColor('#fd9e27')
    .addFields(
      {
        name: "Question : ",
        value: `Quelle est la traduction de **${motATraduire1}** ?`,
      }
    )

  msg.channel.send(embedQuestion);
  return}
function reponseQuiz1 (msg) {


  // Donc l'utilisateur a répondu a une question
  nbQuestions1 += 1;

  // On récupère l'indice du mot à traduire pour le comparer avec l'indice de la traduction
  let indiceMotTraduit = motsFrancais1.indexOf(motATraduire1);

  // Réponse de l'utilisateur
  let reponse = msg.content.toLowerCase();

  // Test si la réponse est correcte
  // oui...
  if (reponse == motsAnglais1[indiceMotTraduit]) {

    // Une bonne réponse
    score1 += 1;

    // Et donc le mot a été appris
    motsAppris1.push(motsFrancais1[indiceMotTraduit]);


    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Félicitations ! :clap:')
      .setThumbnail(logoBot)
      .setColor('#0CA00C')
      .addFields(
        {
          name: `Bravo ${msg.author.username} :champagne:`,
          value: "C'était la bonne réponse !",
        }
      )

    msg.channel.send(embedQuestion);
    timeOut1 = setTimeout(function(){ Quiz1 (msg); }, 1500);
    return
  }

  // ...non
  else {

    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Dommage ! :confused:')
      .setThumbnail(logoBot)
      .setColor('#CC2400')
      .addFields(
        {
          name: `Ne te décourage pas ${msg.author.username} :muscle:`,
          value: `La bonne réponse était : **${motsAnglais1[indiceMotTraduit]}**`,
        }
      )

    msg.channel.send(embedQuestion);
    questionPosee = false;

    timeOut = setTimeout(function(){ Quiz1 (msg); }, 1500);
    return
  }}

function Quiz2 (msg) {

  i = getRandomIntInclusive(0,motsFrancais2.length-1);
  motATraduire2 = motsFrancais2[i];

  // L'un ou l'autre, cela ne change rien
  // Le -1 est pour éviter la traduction d'un mot undefined
  if (motsAppris2.length === motsFrancais2.length) {
    motsAppris2 = [];
  }

  // Si le mot a déjà été appris ==> On cherche un autre mot
  if (motsAppris2.includes(motATraduire2)) {
    Quiz2 (msg);
    return
  }

  const embedQuestion = new Discord.MessageEmbed()
    .setTitle('Traduis rapidement !')
    .setThumbnail(logoBot)
    .setColor('#fd9e27')
    .addFields(
      {
        name: "Question : ",
        value: `Quelle est la traduction de **${motATraduire2}** ?`,
      }
    )

  msg.channel.send(embedQuestion);
  return}
function reponseQuiz2 (msg) {

  // Donc l'utilisateur a répondu a une question
  nbQuestions2 += 1;

  // On récupère l'indice du mot à traduire pour le comparer avec l'indice de la traduction
  let indiceMotTraduit = motsFrancais2.indexOf(motATraduire2);

  // Réponse de l'utilisateur
  let reponse = msg.content.toLowerCase();

  // Test si la réponse est correcte
  // oui...
  if (reponse == motsAnglais2[indiceMotTraduit]) {

    // Une bonne réponse
    score2 += 1;

    // Et donc le mot a été appris
    motsAppris2.push(motsFrancais2[indiceMotTraduit]);

    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Félicitations ! :clap:')
      .setThumbnail(logoBot)
      .setColor('#0CA00C')
      .addFields(
        {
          name: `Bravo ${msg.author.username} :champagne:`,
          value: "C'était la bonne réponse !",
        }
      )

    msg.channel.send(embedQuestion);
    timeOut2 = setTimeout(function(){ Quiz2 (msg); }, 1500);
    return
  }

  // ...non
  else {

    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Dommage ! :confused:')
      .setThumbnail(logoBot)
      .setColor('#CC2400')
      .addFields(
        {
          name: `Ne te décourage pas ${msg.author.username} :muscle:`,
          value: `La bonne réponse était : **${motsAnglais2[indiceMotTraduit]}**`,
        }
      )

    msg.channel.send(embedQuestion);
    questionPosee = false;
    timeOut = setTimeout(function(){ Quiz2 (msg); }, 1500);
    return
  }}

function Quiz3 (msg) {

  i = getRandomIntInclusive(0,motsFrancais3.length-1);
  motATraduire3 = motsFrancais3[i];

  // L'un ou l'autre, cela ne change rien
  // Le -1 est pour éviter la traduction d'un mot undefined
  if (motsAppris3.length === motsFrancais3.length) {
    motsAppris3 = [];
  }

  // Si le mot a déjà été appris ==> On cherche un autre mot
  if (motsAppris3.includes(motATraduire3)) {
    Quiz3 (msg);
    return
  }

  const embedQuestion = new Discord.MessageEmbed()
    .setTitle('Traduis rapidement !')
    .setThumbnail(logoBot)
    .setColor('#fd9e27')
    .addFields(
      {
        name: "Question : ",
        value: `Quelle est la traduction de **${motATraduire3}** ?`,
      }
    )

  msg.channel.send(embedQuestion);
  return}
function reponseQuiz3 (msg) {

  // Donc l'utilisateur a répondu a une question
  nbQuestions3 += 1;

  // On récupère l'indice du mot à traduire pour le comparer avec l'indice de la traduction
  let indiceMotTraduit = motsFrancais3.indexOf(motATraduire3);

  // Réponse de l'utilisateur
  let reponse = msg.content.toLowerCase();

  // Test si la réponse est correcte
  // oui...
  if (reponse == motsAnglais3[indiceMotTraduit]) {

    // Une bonne réponse
    score3 += 1;

    // Et donc le mot a été appris
    motsAppris3.push(motsFrancais3[indiceMotTraduit]);

    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Félicitations ! :clap:')
      .setThumbnail(logoBot)
      .setColor('#0CA00C')
      .addFields(
        {
          name: `Bravo ${msg.author.username} :champagne:`,
          value: "C'était la bonne réponse !",
        }
      )

    msg.channel.send(embedQuestion);
    timeOut3 = setTimeout(function(){ Quiz3 (msg); }, 1500);
    return
  }

  // ...non
  else {

    const embedQuestion = new Discord.MessageEmbed()
      .setTitle('Dommage ! :confused:')
      .setThumbnail(logoBot)
      .setColor('#CC2400')
      .addFields(
        {
          name: `Ne te décourage pas ${msg.author.username} :muscle:`,
          value: `La bonne réponse était : **${motsAnglais3[indiceMotTraduit]}**`,
        }
      )

    msg.channel.send(embedQuestion);
    questionPosee = false;
    timeOut = setTimeout(function(){ Quiz3 (msg); }, 1500);
    return
  }}

/**********************************************************
InfoBulle
***********************************************************/

function Info (msg) {

  const embedInfo = new Discord.MessageEmbed()
    .setTitle('Liste de commandes de QuizzBot & fonctionnement du Quiz :')
    .setThumbnail(logoBot)
    .setColor('#fd9e27')
    .addFields(
      {
        name: "`!quiz`",
        value: 'Lance le Quiz.',
      },
      {
        name: "`!end`",
        value: 'Arrête le Quiz en cours.',
      },
      {
        name: "`Déroulement du Quiz :`",
        value: "Lorsqu'une partie est lancée, des questions sont posées sans interruption tant que quelqu'un répond (Une question toutes les 1.5s). Comme dans un Quiz classique, le bot indique la bonne ou mauvaise réponse.\n\n Tu as 3 salons disponibles pour t'entraîner ci-dessous! Révise bien! :wink:\n\nLes données sont récupérées depuis ce GoogleSheets :\n https://docs.google.com/spreadsheets/d/1HsRsA9bjXFp5bROy9Kg6IoqR4_NEDG8rGTRrxNpIqBk/edit?usp=sharing\n\nViens ajouter tes propres mots !\n\n**Have Fun!**",
      },
    )

  return msg.channel.send(embedInfo);

}

/**********************************************************
Request pour lire le GoogleSheets
***********************************************************/

function getGoogleSheets (indice) {

  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), recupMots);
  });

}

/**********************************************************
Récupération d'un nombre entier aléatoire
***********************************************************/

// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
function getRandomIntInclusive(min, max) {

  min = Math.ceil(min); // Renvoie le plus petit entier supérieur ou égal à min.
  max = Math.floor(max); // Renvoie le plus grand entier qui est inférieur ou égal à max
  // math.random renvoie un nombre flottant pseudo-aléatoire compris dans l'intervalle [0, 1[
  return Math.floor(Math.random() * (max - min +1)) + min;
}

/**********************************************************
Fonctions d'authentification / Si jamais le token est perdu
ou lors du premier lien de l'application à un compte Google
***********************************************************/

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

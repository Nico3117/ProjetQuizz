/**
 * QuizzController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require("axios");

module.exports = {

  recupQuizz: async  function(req,res){
    var arrayToView = [];
    const retour = await axios.get('http://localhost:3001/collecOfQuizzes');

    for (let i = 0 ; i < retour.data.length; i ++){
      arrayToView.push(retour.data[i]);
    }

    return res.view('quizz/filtre' , {quizzArray: arrayToView} );
  },

  debutJeu: async  function(req,res){
    const lid = req.params.idJeu;

    const monQuizz = await axios.get('http://localhost:3001/collecOfQuizzesId', { params: { id: lid } });

    if (monQuizz.data.id === lid ){
      return res.view('quizz/game' , {quizz: monQuizz.data} );
    }
  },

  valid: async function(req, res){
    const valid = req.params.rep;
    const idQuizz = req.params.idQuizz;
    const idQuestion = req.params.repQuest;
    console.log(valid, idQuizz, idQuestion)
    const validRep = await axios.post('http://localhost:3001/validation', { rep: valid, idquizz : idQuizz, idquestion : idQuestion })
    .then(function (response) {
      console.log(response);
      if (response == true) {
        console.log('good');
        //get collection of quizzes
      }
      else if (response == false){
        console.log('not');
      }
    })
  }
};


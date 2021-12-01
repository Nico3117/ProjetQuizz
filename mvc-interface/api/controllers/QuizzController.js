/**
 * QuizzController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require("axios");

module.exports = {

  recupQuizz: async  function(req,res){

    var arrayOfQuizz = [];
    var arrayToView = [];

    const retour = await axios.get('http://localhost:3001/collecOfQuizzes');


    var array = [];

    for (let i = 0 ; i < retour.data.length; i ++){

      arrayToView.push(retour.data[i]);

    }
    return res.view('quizz/filtre' , {quizzArray: arrayToView} );




  },
  debutJeu: async  function(req,res){

    const lid = req.params.idJeu;


    const monQuizz = await axios.get('http://localhost:3001/collecOfQuizzesId', { params:{id: lid,
      }

    })
    if (monQuizz.data.catgories === "maths"){

      return res.view('quizz/gameMath' , {quizz: monQuizz.data} );

    }
    if (monQuizz.data.catgories === "geo"){

      return res.view('quizz/gameGeo' , {quizz: monQuizz.data} );

    }


  },


};


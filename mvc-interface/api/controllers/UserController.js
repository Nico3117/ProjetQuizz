/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require("axios");
module.exports = {

  connexion: async function (req, res) {

    var receptionQuizzFromMs ;
    var axios = require('axios');
    var statusReq;

    const email = req.params.email;
    const password = req.params.password;
    var drapeau = false;

    const retour = await axios.post('http://localhost:3000/login', {
      params: {
        email: email,
        password: password

      }
    }).then(function (response) {
      console.log(response);

      if (response.status === 200) {

        drapeau = true;
        //get collection of quizzes
        receptionQuizzFromMs = [
          {
            "id": "1",
            "title" : "Quizz1",
            "catgories": "maths",
            "level": "facile",
            "questions" : [
              {
                "id": "1",
                "question": "2+2",
                "reponse": "4"
              },
              {
                "id": "2",
                "question": "3+3",
                "reponse": "6"
              },
              {
                "id": "3",
                "question": "4+4",
                "reponse": "8"
              }
            ]
          },
          {
            "id": "2",
            "title" : "Quizz2",
            "catgories": "geo",
            "level": "facile",
            "questions" : [
              {
                "id": "1",
                "question": "La capitale de la France ?",
                "reponse": "Paris"
              },
              {
                "id": "2",
                "question": "La capitale de l'Espagne ?",
                "reponse": "Madrid"
              },
              {
                "id": "3",
                "question": "La capitale de l'Allemagne ?",
                "reponse": "Berlin"
              }
            ]
          }
        ];
      }



      else if (response > 299){

        drapeau = false;
      }

    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
      });


    return res.view('quizz/filtre' , {arrayOfQuizz : receptionQuizzFromMs});

  },
  inscription: async function (req, res){

    var axios = require('axios');

    const email = req.params.email;
    const password = req.params.password;

    const retour = await axios.post('http://localhost:3000/signup', {
      params: {
        email: email,
        password: password

      }
    }).then(function (response) {
      console.log(response);

      if (response.status === 200) {

        console.log("signup done!");

      }

    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
      });

    return res.view('quizz/filtre' );

  },


};


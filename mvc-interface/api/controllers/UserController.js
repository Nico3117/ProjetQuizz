/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  connexion: async function (req, res) {

    var axios = require('axios');

    const email = req.params.email;
    const password = req.params.password;
    var drapeau ;
    drapeau = false;

    console.log(email, password)

    const retour = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
    }).then(function (response) {
      // console.log(response);
      if (response.status === 200) {
        drapeau = true;
        //get collection of quizzes
      }
      else if (response.status === 403){
        console.log(response.status)
        drapeau = false;
        return res.redirect('/');
      }
    })
      .catch(function (error) {
        console.log(error);
      })
    //return res.view('quizz/filtre' , {arrayOfQuizz : receptionQuizzFromMs});
    if (drapeau == true){

      return res.redirect('/quizzAll');

    }
    else {
      return res.redirect('/');
    }

    
  },

  inscription: async function (req, res){
    var axios = require('axios');
    let emailNew = req.params.email;
    let passwordNew = req.params.password;
    const retour = await axios.post('http://localhost:3000/signup', {
        email: emailNew,
        password: passwordNew
    }).then(function (response) {
      //console.log(response);
      if (response.status === 200) {
        console.log("signup done!");
      }
    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
      });
    return res.redirect('/quizzAll');
  },
};


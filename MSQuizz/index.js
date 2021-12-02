const axios = require('axios');
const express = require('express');
const bodyparser = require('body-parser');
const quizz = require('./quizz-config.json');

const app = express();
app.use(bodyparser.json())

const port = 3001;

let scoreUser;
let nameQuizz;

// console.log(quizz);

app.post('/score', async (req, res) => {
    // Récuperer data user
    scoreUser = req.query.score;
    nameQuizz = req.query.name;
    res.status(200).send();
    console.log(scoreUser, nameQuizz)
    try {
        const res = await axios.post('http://localhost:3000/score', {
            score: scoreUser,
            quizz: nameQuizz
        });
    } catch (err) {
        console.error(err);
    }
});

app.post('/validation', async (req, res) => {
    // Récuperer data user
    repUser = req.body.rep;
    repQuizz = req.body.idquizz;
    repQuestion = req.body.idquestion;
    res.status(200).send();
    console.log(repUser, repQuizz, repQuestion)
    console.log(quizz.Quizz)
    if(quizz.Quizz.id == repQuizz && quizz.Quizz.questions[repQuestion-1].reponseValid == repUser){
        res.send(true)
    }else {
        res.send(false)
    }
});

app.get('/collecOfQuizzes', async (req, res) => {

    const collec = quizz.Quizz;

   return  res.send(collec);

});

app.get('/collecOfQuizzesId', async (req, res) => {

    const collec = quizz.Quizz;

    var quizzToReturn;
    for (let i = 0; i < collec.length; i ++){

        if (req.query.id == collec[i].id){
            quizzToReturn = collec[i];
        }

    }

    return  res.send(quizzToReturn);

});

app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`)

})


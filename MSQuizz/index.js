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

app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`)
})


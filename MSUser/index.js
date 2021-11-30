const express = require('express');
const bodyparser = require('body-parser');
var mysql = require('mysql');

const app = express();
app.use(bodyparser.json());

const port = 3000;

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'dbusergame'
});

let emailValid;

app.post('/login', async (req, res) => {
    // Récupérer data user
    let emailUser = req.query.email;
    let passwordUser = req.query.password;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT email, password from users', (err, results) => {
            connection.release();
            if(err) throw err;
            results.forEach((f) => {
                if(f.email == emailUser) {
                    emailValid = f.email;
                    passwordValid = f.password;
                }
            });
            if(emailValid == emailUser) {
                if(passwordUser != passwordValid) {
                    console.log('Mot de passe incorrect !')
                    res.status(403).send();
                }else {
                    console.log(`Le compte ${emailUser} existe`);
                }
                emailValid = '';
                res.status(200).send();
            }else {
                console.log(`Le compte ${emailUser} n'existe pas`);
                emailValid = '';
                res.status(403).send();
            }
        });
    });
});

app.post('/signup', async (req, res) => {
    emailNewUser = req.query.email;
    passwordNewUser = req.query.password;
    res.status(200).send(); 
    console.log(emailNewUser, passwordNewUser)
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(`INSERT INTO users (email, password) VALUES ('${emailNewUser}', ${passwordNewUser})`, (err, rows) => {
            connection.release();
            if (!err) {
                console.log('User ajouté !');
            } else {
                console.log(err);
            }
        });
    });
});

app.post('/score', async (req, res) => {
    scoreUser = req.body.score;
    idQuizz = req.body.quizz;

    res.status(200).send();

    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(`INSERT INTO score (score, id_quizz) VALUES (${scoreUser}, ${idQuizz})`, (err, rows) => {
            connection.release();
            if (!err) {
                console.log('Score ajouté !');
            } else {
                console.log(err);
            }
        });
    });
});

pool.on('connection', function () {
    console.log("Connected");
});

app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`);
});
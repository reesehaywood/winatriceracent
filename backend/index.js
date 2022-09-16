const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 3000;
const env = require('dotenv').config();
const path = require('path');

const DBPATH = process.env.DBPATH;
const SESSIONSECRET = process.env.SESSIONSECRET;
var ses;

const app = express()

app.use(express.static('frontend'));
app.use(express.json());
app.use(
    session({
        secret: SESSIONSECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: "/",
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 // e.g. 1 year
        },
    })
);

app.get('/', (req, res) => {
    ses = req.session;
    console.log(ses);
    if (ses.userid) {
        res.sendFile(__dirname + '/frontend/index.html');
    }else{
        res.json({userid: 'unknown'});
    }
})

app.post('/teamName',(req,res)=>{
    console.log(req.body);
    if(req.body.teamName){
        ses = req.session;
        ses.teamName = req.body.teamName;
        console.log(ses);
        const fileName = path.join(__dirname, '../frontend/index.html');
        console.log(fileName);
        const teamNameJson = {
            teamName: ses.teamName,
        }
        res.json(teamNameJson);
    }

})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})
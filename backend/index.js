const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

const port = process.env.PORT || 3000;
const env = require('dotenv').config();
const path = require('path');

const {createClient} = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;
const supabase = createClient(supabaseUrl, supabaseKey)

let teamString='';
const DBPATH = process.env.DBPATH;
const SESSIONSECRET = process.env.SESSIONSECRET;



leaderList = [
    {
        teamName: "Reese",
        score: 100,
        asOfDate: Date.now(),
    },
    {
        teamName: "Stephanie",
        score: 999,
        asOfDate: Date.now(),
    }
]

const app = express()
var fileStoreOptions = {path: path.join(__dirname,'../.data')};

app.set('trust proxy',1);
app.use(express.static('frontend'));
app.use(express.json());
app.use(
    session({
        secret: SESSIONSECRET,
        resave: false,
        saveUninitialized: false,

        store: new fileStore(fileStoreOptions),
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60,
        },
    })
);

app.get('/', (req, res) => {
    console.log('This is running');
    //var ses = req.session;
    //console.log(ses);
    //console.log(req.sessionID)
    //if (ses.userid) {
    if(req.session.teamNameJson===undefined){
        res.sendFile(path.join(__dirname,'../frontend/first.html'));
    } else {
        //if already on a team send team name
        console.log('teamNameJson')
        console.log(req.session.teamNameJson);
        console.log('before teamName')
        teamString = req.session.teamNameJson.teamName;
        res.redirect('/hasteam?teamName='+teamString)
        //res.sendFile(path.join(__dirname,'../frontend/second.html'));
    }
    //}else{
    //    res.json({userid: 'unknown'});
    //}
    //if (req.session.views) {
    //    req.session.views++;
    //    res.setHeader('Content-Type', 'text/html');
    //    res.write('<p>views: ' + req.session.views + '</p>');
    //    res.end();
    //  } else {
    //    req.session.views = 1;
    //    res.end('Welcome to the file session demo. Refresh page!');
    //  }
})
app.get('/hasteam',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/first.html'));
})

app.get('/newTeam',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.post('/teamName',(req,res)=>{
    console.log(req.body);
    if(req.body.teamName){
        req.session.teamName = req.body.teamName;
        console.log(req.session.teamName);
        console.log("session id");
        console.log(req.sessionID)
        const teamNameJson = {
            teamName: req.session.teamName,
        }
        req.session.teamNameJson = teamNameJson;
        res.json(teamNameJson);
    }
    //add the session to supabase?

})

app.post('/leaders',async (req,res)=>{
    
    const { data: leaderList1, error } = await supabase.from('leaderboard')
    .select('teamName, score, asOfDate').order('score',{ascending: false})
    .limit(10);

    console.log(leaderList1);
    console.log(req.body);
    res.json(leaderList1);
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})

function getSessionFromSupabase(sessionID){

}
var path = require('path');
var fs = require("fs");
var file = "./test.db";
var jsonFile = "./jsondata.json";
var exists = fs.existsSync(file);
var jsonData;

if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
  if(fs.existsSync(jsonFile)){
    jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  }

}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, team_name TEXT, formation_set INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS players (player_id INTEGER PRIMARY KEY, name TEXT, cost BIGINT, type TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS user_players (user_id INTEGER, player_id INTEGER, pos TEXT, idx NUMBER, CONSTRAINT same_pair UNIQUE(user_id, player_id) ON CONFLICT REPLACE)");
    db.run("INSERT INTO user (name, password) values ('sangeet', 'sangeet')");
    var stmt = db.prepare("INSERT INTO players (name, cost, type) VALUES (?, ?, ?)");
    for (player of jsonData) {
      console.log(player);
        var cost = parseInt(player.cost.replace(',', ''));
        cost = cost < 250000 ? cost + 600000 : cost;
        stmt.run(player.name, cost, player.type);
    }
    stmt.finalize();
  }
});

var express = require('express');
var bodyParser = require('body-parser');
var restapi = express();
restapi.use(bodyParser.urlencoded({extended: false}));
restapi.use(bodyParser.json());
restapi.use('/app',express.static('app'));
restapi.use('/node_modules',express.static('node_modules'));
restapi.use('/systemjs.config.js',express.static('systemjs.config.js'));
restapi.use('/index.html',express.static('index.html'));
restapi.use('/css.html',express.static('css.html'));
restapi.use('/style.css',express.static('style.css'));
restapi.use('/styles.css',express.static('styles.css'));


// Serve Angular app from this server itself remove lite-server & remove this cors code
restapi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

restapi.post('/login', function(req, res){
  console.log(req.body);
  db.get("SELECT * FROM user WHERE name = ? AND password = ?", req.body.name, req.body.password, function(err, row){
    let resp = {};
    if (!err && row)
      resp = {'status':'success', 'user':row};
    else
      resp = {'status':'error'};
    res.json(resp);
  });
});

restapi.post('/add_player', function(req, res){
  if(req.body.constructor === Array){
    // console.log(req.body.length);
    db.serialize(function() {
      var stmt = db.prepare("INSERT INTO players (name, cost, type) VALUES (?, ?, ?)");
      for (var i = 0; i < req.body.length; i++) {
          var cost = parseInt(req.body[i].cost.replace(',', ''));
          cost = cost < 250000 ? cost + 600000 : cost;
          stmt.run(req.body[i].name, cost, req.body[i].type);
      }
      stmt.finalize(function(){
          res.end();
      });
    });
  }else {
    db.run("INSERT INTO players (name, cost, type) VALUES (?, ?, ?)", req.body.name, req.body.cost, req.body.type, function(err, row){
        if (err){
            // console.err(err);
            res.status(500);
        }
        else {
            res.status(202);
        }
        res.end();
    });
  }
});

restapi.get('/players', function(req, res){
    db.all("SELECT player_id AS id, name, cost, type FROM players", function(err, rows){
      // console.log(rows);
        res.json(rows);
    });
});

restapi.post('/save_team', function(req, res){
  console.log(req.body);
  db.serialize(function() {
    db.run("UPDATE user SET team_name = ? WHERE id = ?", req.body.team_name, req.body.uid);
    db.run("DELETE FROM user_players WHERE player_id = ?", req.body.uid);
    db.all("SELECT * FROM user_players WHERE user_id = ?", req.body.uid, function(err, rows){
      console.log('Select after delete');
      console.log(rows)
    });
    var stmt = db.prepare("INSERT INTO user_players (user_id, player_id) VALUES (?, ?)");
    for (var i = 0; i < req.body.pid.length; i++) {
        stmt.run(req.body.uid, req.body.pid[i]);
    }
    stmt.finalize(function(){
      res.send('success');
    }, function(){
      res.send('error');
    });
  });
});

restapi.post('/save_formation', function(req, res){
  console.log(req.body);
  db.serialize(function() {
    for(let player of req.body.formation){
      console.log(player.pos);
      db.run("UPDATE user_players SET pos = ?, idx = ? WHERE user_id = ? AND player_id = ?", player.pos, player.idx, req.body.uid, player.id);
    }
    db.run("UPDATE user SET formation_set = 1 WHERE id = ?", req.body.uid);
    res.send('success');
  });
});

restapi.post('/get_team', function(req, res){
  // console.log(req.body);
  let response = {team_name: '', players: []};
  db.serialize(function() {
    db.get("SELECT team_name FROM user WHERE id = ?", req.body.uid, function(err, row){
      response.team_name = row.team_name;
    });
    db.all("SELECT * FROM user_players WHERE user_id = ?", req.body.uid, function(err, rows){
      for (var i = 0; i < rows.length; i++) {
          response.players.push(rows[i]);
      }
      res.json(response);
    });

  });
});

restapi.post('/data', function(req, res){
    db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
        if (err){
            // console.err(err);
            res.status(500);
        }
        else {
            res.status(202);
        }
        res.end();
    });
});

var renderIndex = function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
}
restapi.get('/*', renderIndex);
var port = Number(process.env.PORT || 3000);
restapi.listen(port);

console.log("Submit GET or POST to http://localhost:3005/data");

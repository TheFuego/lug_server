const express = require('express')
const app = express()
const Datastore = require('nedb')
const multer  = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, `${picName}.png`)
  }
})

const playerPics = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/players/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, `${playerPicName}.png`)
  }
})

const opponent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, 'opponent.png')
  }
})

const upload = multer({ storage: storage })
const uploadOpponent = multer({ storage: opponent })
const uploadPlayers = multer({ storage: playerPics })

const database = new Datastore('articles.db')
database.loadDatabase()

const players = new Datastore('players.db')
players.loadDatabase()

const port = 5000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public')) // Client page
app.use(express.static('assets')) // CSS
app.use(express.static('script')) // JavaScript
app.use(express.json())

const password = "dragan"
let passwordGuess 

let picName = "default"
let playerPicName = "default"

app.post("/password", (req, res) => {
  console.log(req.body)

  passwordGuess = req.body.guess
  res.json({message: "Password send"});
});


app.post('/article', (req, res) => {
  let request = req.body
  database.insert(request)

  console.log(request)
  picName = req.body.image

  res.json({ message: 'Article sent' }) 
  
})

app.post('/player', (req, res) => {
  let request = req.body
  players.insert(request)

  console.log(request)
  playerPicName = req.body.image

  res.json({ message: 'Player sent' }) 
  
})

app.post('/photo', upload.single('photo'), function (req, res, next) {
  console.log(req.body.image)
  res.send({message: "Photo sent"})
})

app.post('/emblem', uploadOpponent.single('photo'), function (req, res, next) {
  console.log(req.body.image)
  res.send({message: "Photo sent"})
})

app.post('/playerpic', uploadPlayers.single('photo'), function (req, res, next) {
  console.log(req.body.image)
  res.send({message: "Photo sent"})
})

app.post('/delete', (req, res) => {
  //console.log(req.body.name)

  database.remove( {
    _id: req.body._id
    }, function ( err, numRemoved ) {
      if ( err ) res.status( 500 ).send( err );
      else res.sendStatus( 200 );
    });
});

app.post('/deleteplayers', (req, res) => {
  //console.log(req.body.name)

  players.remove( {
    _id: req.body._id
    }, function ( err, numRemoved ) {
      if ( err ) res.status( 500 ).send( err );
      else res.sendStatus( 200 );
    });
});

app.post('/match', (req, res) => {
  console.log(req.body)
  let content = JSON.stringify(req.body)

  try {
    fs.writeFileSync('public/match.json', content);
    res.send({message: "Article sent"})
  } catch (err) {
    console.error(err);
    res.send({message: err})
  }
  
});

app.get('/news', (req, res) => {
  database.find({}, (err, docs) => {
    res.json({docs})
  })
})

app.get('/players', (req, res) => {
  players.find({}, (err, docs) => {
    res.json({docs})
  })
})

app.get("/private", (req, res) => {
  if(passwordGuess == password) {
    res.sendFile(__dirname + "/private/index.html");
  }else {
    res.send("Password incorect");
  }
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/private/admin.html");
});

app.get("/private/article", (req, res) => {
  if(passwordGuess == password) {
    res.sendFile(__dirname + "/private/article.html");
  }else {
    res.send("Password incorect");
  }
});

app.get("/private/match", (req, res) => {
  if(passwordGuess == password) {
    res.sendFile(__dirname + "/private/match.html");
  }else {
    res.send("Password incorect");
  }
});

app.get("/private/player_add", (req, res) => {
  if(passwordGuess == password) {
    res.sendFile(__dirname + "/private/player_add.html");
  }else {
    res.send("Password incorect");
  }
});
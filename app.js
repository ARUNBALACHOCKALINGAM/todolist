const { response } = require('express')
const express = require('express')
const mongodb=require('mongodb')
const session = require('express-session')
const db = require('./db').db()
const MongoStore = require('connect-mongo')(session)
let app=express()

app.use(express.json())
 app.use(express.urlencoded({extended: false}))
let sessionOptions = session({
    secret: "JavaScript is sooooooooo coool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
  })
 app.use(sessionOptions)

app.use(express.static(__dirname))
app.set('views', 'views')
app.set('view engine', 'ejs')
function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
  if (req.headers.authorization == "Basic YXJ1bjpBcnVuKjIwMDE=") {
    next()
  } else {
    res.status(401).send("Authentication required")
  }
}

app.use(passwordProtected)

app.get('/', function(req,res){
     
  req.session.user={fav:"random user"}
   
  
    
  
  db.collection('newtodo').find({user:req.session.id}).toArray(function(err,items){

        
        res.send(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <!-- displays site properly based on user's device -->
        
            <link rel="stylesheet" href="style.css" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
              crossorigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
              rel="stylesheet"
            />
        
            <title>Todo app</title>
        
          </head>
          <body>
            <div class="container">
              <header>
                <h1>TODO</h1>
        
                <div class="toggle"></div>
              </header>
              <form action="/createitem" method="POST">
                <input
                  name="item"
                  type="text"
                  class="todo-input"
                  id="todo-input"
                  placeholder="Create a new todo"
                />
                <button class="todo-button" type="submit">
                  <i class="fas fa-plus"></i>
                </button>
              </form>
              <div class="todo-container">
                <ul class="todo-list"></ul>
              </div>
              <div class="select">
                <p class="leftover"><span id="itemsleft"> </span> items left</p>
                <p class="all" onclick="displayAll()">All</p>
                <p class="active" onclick="displayUncompleted()">Active</p>
                <p class="complete" onclick="displayCompleted()">Completed</p>
                <p class="clear" onclick="Clear()">Clear Completed</p>
              </div>
            </div>
            <script>
              let items = ${JSON.stringify(items)};
            </script>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="script.js"></script>
          </body>
        </html>
        `)
      
        
    })

  


  
  
})

app.post('/createitem',function(req,res){
    
   
    db.collection('newtodo').insertOne({user:req.session.id,text : req.body.text},function(err,info){
            res.json(info.ops[0])
            
    })
})

app.post('/delete-item', function(req, res) {
    db.collection('newtodo').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function() {
      res.send("Success")
    })
  })

module.exports = app
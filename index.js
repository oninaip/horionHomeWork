var express = require('express'),
    mysql = require('mysql'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'reminderdb'
    });


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.use(cors());

app.get('/', function(req,res){
    res.send('hello')
})
             
app.get('/reminder/', function(req,res){
        connection.query(`SELECT * FROM reminder`, function(err,result){
    if(err){
        console.log('error in the query');
    }else{
        console.log('query is ok');
        res.json({
            data:result
        });  
    }
 })})

app.get('/delete', function(req,res){
        var {id} = req.query;
        var delet = `DELETE FROM reminder WHERE id=${id}`;
        connection.query(delet,id, function(err,result){
    if(err){
        console.log('error in the query');
    }else{
        console.log('query is ok');
        res.send("Delete OK")
    }
 })})

app.get('/edit', function(req,res){
        var {id,title,message,created,remindAt,emailSent} = req.query;
        var edit = `UPDATE reminder SET title='${title}', message='${message}', created='${created}', remindAt='${remindAt}', emailSent='${emailSent}' WHERE id=${id}`;
        connection.query(edit,id, function(err,result){
    if(err){
        console.log('error in the query');
    }else{
        console.log('query is ok');
        res.send("update OK")
    }
 })})
app.get('/add', function(req,res){
        var {id,title,message,userId,created,remindAt,emailSent} = req.query;
        var edit = `INSERT INTO reminder (id, title, message, userId, created, remindAt, emailSent) VALUES  ('${id}', '${title}', '${message}',' ${userId}', '${created}', '${remindAt}', '${emailSent}')`;
        connection.query(edit,id, function(err,result){
    if(err){
        console.log('error in the query');
    }else{
        console.log('query is ok');
        res.send("add OK")
    }
 })})

app.post('/data', urlencodedParser, function (req, res) {
    var {id,name,email,password} = req.body;
  if (!req.body) return res.sendStatus(400);
    var postData = `INSERT INTO user (id, name, email, password) VALUES  ('${id}', '${name}', '${email}',' ${password}')`;
        connection.query(postData, function(err,result){
    if(err){
        console.log('error in the query');
    }else{
        console.log('query is ok');
        res.redirect('http://localhost:3000/Thank');
    }
    
})
})

/*
app.post('/Reminder', urlencodedParser, function (req, res) {
    var {id,name,email,password} = req.body;
    if (!req.body) return res.sendStatus(400);
    var postData = `SELECT id FROM user`;
    
    connection.query(postData, function(err,result){
        if(err){
            console.log('error in the query');
        }else{
            console.log('post ok');
            const postDat=result;
            //res.json(postDat);
        }
    })
    res.redirect('http://localhost:3000/ReminderList');
})
*/

app.listen(4000, function(){
    console.log('server started on port 4000');
})
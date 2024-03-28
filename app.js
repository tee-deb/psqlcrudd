const client = require("./connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3004;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/users", (req, res) => {
  client.query(`select * from tydemo`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/users/:id", (req, res) => {
  client.query(
    `select * from tydemo where id=${req.params.id}`,
    (err, result) => {
      console.log(req.params.id);
      if (!err) {
        res.send(result.rows);
      }else{
   console.log(err);
      }
    }
  );
  client.end;
});


app.post('/users', (req, res)=> {
  const tydemo = req.body;
  let insertQuery = `insert into tydemo(firstname, lastname, email, age, dob) 
                     values('${tydemo.firstname}', '${tydemo.lastname}', '${tydemo.email}', '${tydemo.age}', '${tydemo.dob}')`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Insertion was successful')
      }
      else{ console.log(err.message) }
  })
  client.end;
})


app.put('/users/:id', (req, res)=> {
    let tydemo = req.body;
    let updateQuery = `UPDATE tydemo
                       SET firstname = '${tydemo.firstname}',
                       lastname = '${tydemo.email}',
                       email = '${tydemo.email}',
                       age = ${tydemo.age},
                       dob = '${tydemo.dob}'
                       WHERE id = ${req.params.id}`;

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})



app.delete('/users/:id', (req, res)=> {
  let insertQuery = `delete from tydemo where id=${req.params.id}`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Deletion was successful')
      }
      else{ console.log(err.message) }
  })
  client.end;
})



app.listen(3004, () => {
  console.log(`app is listening on port: ${port}`);
});

client.connect();

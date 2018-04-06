const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql3238",
  database:"test"
});
connection.connect()
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.use('/', express.static(`${__dirname}/client/build`));
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('/getProducts',(req,res) =>{
  connection.query('select * from product', function(err,product){
    console.log('prod',product,'ee',err)
    if(err) res.send(err)
    else res.send({product:product})
    })
})
app.get('/postData', (req, res) => {
  console.log('test method',req.query)
  res.send({ express: 'success' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

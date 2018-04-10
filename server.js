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
  console.log('test method',req.query,'parsed',JSON.parse(req.query.query))
  //todo replace static phone number with dynamic
  var getCustomerQuery = 'select id,name,client_address,phone_number from client where phone_number=960034184';
  //get client id based on phone number
  connection.query(getCustomerQuery,function(err,customer){
    console.log('Customer details',customer,'name',customer[0].id);
    if(err)
    res.send(err);
    else{
      //store client id in shipment tab
      var shipmentQuery = 'insert into shipment (client_id,time_created,payment_type_id,final_price) values ('+customer[0].id+',NOW(),1,0)';
      console.log('shipmentQuery',shipmentQuery);
      connection.query(shipmentQuery,function(err,saveShipment){
        console.log('shipp',err)
        if(err) res.send(err);
        else{
          console.log('after insert shipment',saveShipment);
          //get shipment id from shipment tab
          //var getShipmentQuery = 
          //store in shipment details

          res.send({ express: 'success' });
        }
      })
    }
  })
  
  
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));

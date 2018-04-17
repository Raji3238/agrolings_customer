const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const async = require('async');
const moment = require('moment');
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
  var parsedData = JSON.parse(req.query.query);
  //todo replace static phone number with dynamic
  var getCustomerQuery = 'select id,name,client_address,phone_number from client where phone_number='+parsedData.mobileNumber;
  //get client id based on phone number
  connection.query(getCustomerQuery,function(err,customer){
    console.log('Customer details',customer);
    if(err)
    res.send(err);
    else if(!customer.length){
      res.status(401).send({error:"Please enter registered mobile number"});
    }
    else{
      //store client id in shipment ta
       var randomNumber = Math.floor(Math.random()*10000) + 1;
       console.log('arr',randomNumber);
       var date = new Date(parsedData.deliveryDate);
      
      //date.setDate(date.getDate() + 1)
       var deliveryDate = moment(parsedData.deliveryDate).format("YYYY-MM-DD");
       console.log('final deliveryDate',date,'deliveryDate',deliveryDate)
       var shipmentQuery = 'insert into shipment (id,client_id,time_created,payment_type_id,final_price,order_taken_person,delivery_date) values ('+randomNumber+','+customer[0].id+',NOW(),1,0,"'+parsedData.deliveryPerson+'","'+deliveryDate+'")';
      console.log('shipmentQuery',shipmentQuery);
      connection.query(shipmentQuery,function(err,saveShipment){
        console.log('shipp',err)
        if(err) res.send(err);
        else{
          console.log('after insert shipment',saveShipment);
          var productDetails = parsedData.childData;
          if(productDetails){
            async.timesSeries(productDetails.length,function(i,next){
              console.log('productDetails',productDetails[i])
              var saveShipmentDetails = 'insert into shipment_details (shipment_id,product_id,quanitity,price_per_unit,price) values('+randomNumber+','+productDetails[i].productId+','+productDetails[i].qty+',1,1)'
              connection.query(saveShipmentDetails,function(err,shipmentDetials){
                console.log('query',saveShipmentDetails,'saved',err)
              })
              next(err,'success')
            })
            //get shipment id from shipment tab
            //var getShipmentQuery = 
            //store in shipment details
  
            res.send({ express: 'success' });
          }
          else res.send('No product selected')
          
        }
      })
    }
  })
  
  
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));

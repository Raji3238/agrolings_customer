
import React, { Component } from 'react';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import TextArea from 'react-validation/build/textarea';
import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';
import Row from './Row';
import Request from 'superagent';
//import { Switch,Route } from 'react-router';
//import Home from './components/Home'
class Home extends Component {
    constructor(props) {
    
        super(props);
        this.state = {customerName: '',mobileNumber:'',address:'',deliveryPerson:'',deliveryDate:new Date(),productDropDown:''};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDeliveryPersonChange = this.handleDeliveryPersonChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getData = this.getData.bind(this);
      } 
      getData(data){
          console.log('getData',data)
        this.setState({childData: data});     
      }
      required  (value){
            if (!value.toString().trim().length) {
            // We can return string or jsx as the 'error' prop for the validated Component
            return <span className="error">Required</span>;
            }
        };
       
       email  (value)  {
        if (!validator.isEmail(value)) {
          return <span className="error">{value} is not a valid email.</span>
        }
      };
       
       lt  (value, props)  {
        // get the maxLength from component's props
        if (!value.toString().trim().length > props.maxLength) {
          // Return jsx
          return <span className="error">The value exceeded {props.maxLength} symbols.</span>
        }
      };
      mobileNumber(value, props, components){
          if(!validator.isMobilePhone(value, 'en-IN')){
            return <span className="error">Enter a valid number</span>
          }
      }
      submit(event){
          console.log('state value',this.state)
          console.log('Customer name',this.state.customerName,'Mobile',this.state.mobileNumber,'address',this.state.address,'delivery person',this.state.deliveryPerson,'delivery date',this.state.deliveryDate)
          alert("Details submitted successfully")
          
console.log('data',this.state)
Request
.get('/postData')
.query(
    {query:JSON.stringify(this.state)}
)
.send({
    //_csrf: this.props._csrf,
    // params: {
    //     method:"GET",
    //     query:JSON.stringify(this.state)
    // }
})
.end((err, res) => {
    console.log('er',err)
    if(res && res.body) {
        var result = res.JSON();
        console.log('end',result)
    }
});

// this.callApi()
// .then(res => this.setState({ response: res.express }))
// .catch(err => console.log(err));
        //   fetch("/postData",{
        //         method:"GET",
        //         qs:JSON.stringify(this.state),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }})
                
        //         .then(function(res) {
        //             console.log("ok",res.text());
        //         }).catch(function() {
        //             console.log("error");
        //         });
          event.preventDefault();
      }
      callApi = async () => {
        console.log('callapi')
        const response = await fetch('/postData',{params:JSON.stringify(this.state)});
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    console.log('body',body)
        return body;
      };
      handleNameChange(event) {
          console.log('event',event.target.value)
        this.setState({customerName: event.target.value});
      }
      handleMobileNumberChange(event){
        this.setState({mobileNumber: event.target.value});
      }
      handleAddressChange(event){
        this.setState({address: event.target.value});
      }
      handleDeliveryPersonChange(event){
        this.setState({deliveryPerson: event.target.value});
      }
      handleDateChange(event){
        this.setState({deliveryDate: event});
        console.log('dattt',this.state.deliveryDate,'ee',event)
      }
      onToggleBookStatus(prod){
        console.log('onToggleBookStatus',prod)
      }
      setProdDropDown(data){
          console.log('data',data)
          
      }
    render() {
       
        
        return (
            <div className="scroll-div">
             <header>
                 <h2 className="header-class">Welcome </h2>
             </header>
            <div id="content" className="container">
                <div className="">
                    
                    <Form onSubmit={this.submit}>
                    <div className="row">
                    <div className="col-sm-12">
                        <h3 className="track-head">Track Order Details</h3>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-6">
                            <label className="label-cls">
                                Customer Name*
                                <Input className="label-cls" placeholder="Customer Name" name='customerName' value={this.state.customerName} onChange={this.handleNameChange} validations={[this.required]} />
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label className="label-cls">
                                Customer Mobile Number *
                                <Input className="label-cls" type="number" placeholder="Customer Mobile" name='customerMobile' value={this.state.mobileNumber} onChange={this.handleMobileNumberChange} validations={[this.required,this.mobileNumber]}/>
                            </label>
                        </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-12">
                        <div className="col-sm-6">
                            <label className="label-cls">
                                Address *
                                <TextArea className="label-cls" type='address' name='address' value={this.state.address} onChange={this.handleAddressChange} validations={[this.required]}/>
                            </label>
                        </div>
                        
                        <div className="col-sm-6">
                        <Select className="label-cls delivery-dropdn" name='city' value={this.state.deliveryPerson} onChange={this.handleDeliveryPersonChange} validations={[this.required]}>
                            <option value=''>Choose Delivery Person</option>
                            <option value='1'>Person1</option>
                            <option value='2'>Person2</option>
                            <option value='3'>Person3</option>
                        </Select>
                        </div>
                        </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="label-cls label-calendar">
                                Select date *
                                <div>
                                <DatePicker
          onChange={this.handleDateChange}
          value={this.state.deliveryDate}
        /></div>
                            </label>
                        </div>
                        <div className="col-sm-12">
                        <Row sendData={this.getData}/>
                        </div>
                        <div className="col-sm-6 button-cls">
                            <Button className="label-cls btn btn-success pull-right">Submit</Button>
                        </div>
                       
                    </Form>
                    
                    
                    {/* <div className="col-sm-6">
                        test1
                    </div> */}
                </div>
            </div>
            </div>
        );
    }
}

export default Home;

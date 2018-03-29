
import React, { Component } from 'react';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import TextArea from 'react-validation/build/textarea';
//import { Switch,Route } from 'react-router';
//import Home from './components/Home'
class Home extends Component {
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
       
       password  (value, props, components)  {
        // NOTE: Tricky place. The 'value' argument is always current component's value.
        // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
        // But if we're changing 'confirm' component - the condition will always be true
        // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
        if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
          // 'confirm' - name of input
          // components['confirm'] - array of same-name components because of checkboxes and radios
          return <span className="error">Passwords are not equal.</span>
        }
      };
      submit(){
          console.log('submitting')
      }
    render() {
        return (
            <div>
             <header>
                 <h2 className="header-class">Welcome to Theertha</h2>
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
                                <Input className="label-cls" placeholder="Customer Name" name='customerName' validations={[this.required]}/>
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label className="label-cls">
                                Customer Mobile Number *
                                <Input className="label-cls" type="number" placeholder="Customer Mobile" name='customerMobile' validations={[this.required]}/>
                            </label>
                        </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-12">
                        <div className="col-sm-6">
                            <label className="label-cls">
                                Address *
                                <TextArea className="label-cls" type='address' name='address' validations={[this.required]}/>
                            </label>
                        </div>
                        <div className="col-sm-6">
                        <Select className="label-cls delivery-dropdn" name='city' value='' validations={[this.required]}>
                            <option value=''>Choose Delivery Person</option>
                            <option value='1'>Person1</option>
                            <option value='2'>Person2</option>
                            <option value='3'>Person3</option>
                        </Select>
                        </div>
                        </div>
                        </div>

                        <div className="col-sm-6 button-cls">
                            <Button className="label-cls">Submit</Button>
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

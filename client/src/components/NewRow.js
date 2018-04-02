import React, {Component} from 'react';
class NewRow extends Component{
    
        handleSubmit() {
          var cname = this.refs.cname.getDOMNode().value;
          var ecount = this.refs.ecount.getDOMNode().value;
          var hoffice = this.refs.hoffice.getDOMNode().value;
          var newrow = {cname: cname, ecount: ecount, hoffice: hoffice };
          this.props.onRowSubmit( newrow );
  
          this.refs.cname.getDOMNode().value = '';
          this.refs.ecount.getDOMNode().value = '';
          this.refs.hoffice.getDOMNode().value = '';
          return false;
        }
        render() {
          var inputStyle = {padding:'12px'}
          return ( 
             
  
    <div className="well">
               
  
  <h3>Add A Company</h3>
  
  
             
  
  <form onSubmit={this.handleSubmit}>
               
  
  <div className="input-group input-group-lg" style={inputStyle}>
                <input type="text" className="form-control col-md-8" placeholder="Company Name" ref="cname"/>
              </div>
  
  
               
  
  <div className="input-group input-group-lg" style={inputStyle}>
                <input type="text" className="form-control col-md-8" placeholder="Employee Count" ref="ecount"/>
              </div>
  
  
               
  
  <div className="input-group input-group-lg" style={inputStyle}>
                <input type="text" className="form-control col-md-8" placeholder="Headoffice" ref="hoffice"/>
              </div>
  
  
               
  
  <div className="input-group input-group-lg" style={inputStyle}>
                <input type="submit" className="btn btn-primary" value="Add Company"/>
              </div>
  
  
            </form></div>
  ); } 
}
export default NewRow
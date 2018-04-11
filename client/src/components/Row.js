import React,{Component} from 'react';
import Request from 'superagent';
class Row extends Component {

    constructor(props) {
      super(props);
  let productForDropDown;
      //  this.state.products = [];
      //this.state = {};
      this.state={filterText:"",products:[],productForDropDown:''}
      Request
        .get('/getProducts')
        .query(
            {}
        )
        .send({
            //_csrf: this.props._csrf,
            // params: {
            //     method:"GET",
            //     query:JSON.stringify(this.state)
            // }
        })
        .end((err, res) => {
            if(res && res.body) {
                console.log('reee',res.body,'es.body.product',res.body.product)
                productForDropDown=res.body.product;
                this.setState({productForDropDown:productForDropDown})
                console.log('stttt',this.state)
                
            }
        });
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        name: "",
        price: "",
        category: "",
        qty: 0,
        productId:0
      }
      this.state.products.push(product);
      this.setState(this.state.products);
  
    }
  
    handleProductTable(evt) {
      console.log('evt',evt.target)
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value,
        price:evt.target.price
      };
      var products = this.state.products;
  console.log('productsss',products,item)
      var newProducts = products.map(function(product) {
        for (var key in product) {
          console.log('item',key,item,product)
          if (key == item.name && product.id == item.id) {
            product[key] = item.value;
          }
        }
        console.log('productproduct',product)
        return product;
      });
      this.setState(newProducts);
      this.props.sendData(this.state.products);
      console.log('set prod',this.state.products);
    }
    callFromParent(){
      console.log('in child')
    }
    render() {
  console.log('state in main',this.state)
      return (
        <div>
          {/* <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/> */}
          <ProductTable docs={this.state.productForDropDown} onProductTableUpdate={this.handleProductTable.bind(this)} component={() => <DropDown docs={this.state.productForDropDown}/>} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
  
          <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
  
        </div>
  
      );
    }
  
  }
  
  class ProductTable extends React.Component {
  
    render() {
      console.log('proo',this.props.docs)
      var passDocs = this.props.docs;
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        console.log('passDocs',passDocs)
        return (<ProductRow docsValue={passDocs} onProductTableUpdate={onProductTableUpdate}  product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
      return (
        <div>
  
  
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>category</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
        </div>
      );
  
    }
  
  }
  
  class ProductRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.product);
  
    }
    render() {
    console.log('docsss',this.props.docsValue)
    var prodDropDown = this.props.docsValue;
      return (
        <tr className="eachRow">
          <DropDown prodDropDownValue = {prodDropDown}onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            "type": "productId",
            value: this.props.product.value,
            id: this.props.product.id,
            price:this.props.product.price
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "price",
            value: this.props.product.price,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "qty",
            value: this.props.product.qty,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "category",
            value: this.props.product.category,
            id: this.props.product.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class EditableCell extends React.Component {
    render() {
      return (
        <td> 
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
      );
    }
  }
   class DropDown extends React.Component {
    render() {
      console.log('state in row',this.state,'ptt',this.props)
      let productList = this.props.prodDropDownValue;
      let optionItems;
      console.log('proddd',productList,this.state)
      if(productList){
           optionItems = productList.map((product) =>
            <option  id={product.id} value={product.id} price={product.price_per_unit} key={product.id}>{product.product_name}</option>  
          );
      }
      return (
        <td>
            <div>
             <select name={this.props.cellData.type} id={this.props.cellData.id} onChange={this.props.onProductTableUpdate}>
                <option>Select an Oil</option>
                {optionItems}
             </select>
         </div>
        </td>
      );
    }
   }
  
  export default Row

import React, { Component } from 'react';

import { Switch,Route } from 'react-router';
import Home from './components/Home';
class MainApp extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() =>
                        <Home {...this.props} />
                    }/> 
                    <Route exact path="/test" render={() =>
                        <Home {...this.props} />
                    }/>  
                    {/* <Route exact path="/tiles" render={() =>
                        <TilesPage {...this.props} />
                    }/>
                    <Route exact path="/home" render={() =>
                        <HomePage {...this.props} />
                    }/>
                    <Route exact path="/cape" render={() =>
                        <CapePage {...this.props} />
                    }/>
                    <Route exact path="/ppwc" render={() =>
                        <PPWCPage {...this.props} />
                    }/>
                    <Route exact path="/fci" render={() =>
                        <FCIPage {...this.props} />
                    }/>
                    <Route exact path="/livetesting" render={() =>
                        <LiveTestingPage {...this.props} />
                    }/>
                    <Route exact path="/products/:product_name" render={() =>
                        <ProductPage {...this.props} />
                    }/>                     */}
                </Switch>
            </div>
        );
    }
}

export default MainApp;

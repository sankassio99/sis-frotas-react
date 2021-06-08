import React from 'react' ;
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/index';
import Veiculo from './pages/Veiculo/index';
import OrdemTrafego from './pages/OrdemTrafego/index';


function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
            </Switch>
            <Switch>
                <Route path="/veiculo" component={Veiculo} />
            </Switch>
            <Switch>
                <Route path="/ordem-trafego" component={OrdemTrafego} />
            </Switch>
        </BrowserRouter>
    )

}

export default Routes;


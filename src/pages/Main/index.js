import React from 'react' ;
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './estilo.css' ;

class Main extends Component {

    render(){
        return (
        <div className="App">
            <h1>Página Home</h1>
            <Link to="/ordem-trafego">Ordem de Trafego</Link>
        </div>
        );
    }
}

export default Main ;
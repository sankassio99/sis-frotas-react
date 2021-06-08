import React from 'react' ;
import { Component } from 'react';
import Table from './components/CollapsibleTable/CollapsibleTable' ;
import './estilo.css' ;

class OrdemTrafego extends Component {

    render(){
        return (
        <div className="App">
            <header className="App-header">
            <h1>Lista de Ordens de Trafego</h1>
            </header>
            <div className="tabela">
            <Table></Table>
            </div>
        </div>
        );
    }
}

export default OrdemTrafego ;
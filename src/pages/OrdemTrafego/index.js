import React from 'react' ;
import { Component } from 'react';
import Table from './components/CollapsibleTable/CollapsibleTable' ;
import './estilo.css' ;
import Nav from '../../components/Navegacao/index'

class OrdemTrafego extends Component {

    render(){
        return (
        <div className="App">
            <Nav titulo={"Lista de Ordens de Trefego"}></Nav>
            <header className="App-header">
            </header>
            <div className="tabela">
            <Table></Table>
            </div>
        </div>
        );
    }
}

export default OrdemTrafego ;
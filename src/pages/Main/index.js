import React from 'react' ;
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './estilo.css' ;
import Button from '@material-ui/core/Button';

class Main extends Component {
    render(){
        return (
        <div className="App principal">
            <h1>Sistema de Frotas</h1>
            <span color="primary" className="sub">Gerêncie suas frotas com conforto e praticidade</span>
            <div className="butoes">
                <Button className="btn" variant="contained" >
                    <Link className="link-home" to="/ordem-trafego">Ordens de Trafego</Link>
                </Button>
                <Button className="btn" variant="contained" >
                    <Link className="link-home" to="/veiculo">Veiculos</Link>
                </Button>
                <Button className="btn" variant="contained" >
                    <Link className="link-home" to="/condutor">Condutores</Link>
                </Button>
            </div>
        </div>
        );
    }
}

export default Main ;
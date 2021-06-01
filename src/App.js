import Button from '@material-ui/core/Button';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

import Table from './components/CollapsibleTable/CollapsibleTable';
import FilterMenu from "./components/FilterMenu/FilterMenu"

import "./assets/app.css" ;
import { Component } from 'react';
import SimpleModal from './components/SimpleModal/SimpleModal.js';
import { createMuiTheme } from '@material-ui/core/styles';



class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      filtro:''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(){
    this.setState({
      filtro:'/getByMarca/Chevrolet'
    })
    alert(this.state.filtro)
  }

  handlerInput(text){
    console.log(text);
  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <h1>Lista de Veiculos</h1>
          <div className="barra">
            <div className="pesquisa">
              <FilterMenu textInput={this.handlerInput(this.props.textInput)} />
              <Button variant="contained" color="primary" onClick={this.handleSearch}>
                <SearchSharpIcon/>
                Buscar
              </Button>
            </div>
            <SimpleModal />
          </div>
        </header>
        <div className="tabela">
          <Table url={this.state.filtro}></Table>
        </div>
      </div>
    );
  }
}

export default App;

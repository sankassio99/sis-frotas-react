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
    this.typeFilter = '' ;
    this.textFilter ='' ;
    this.handleSearch = this.handleSearch.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
  }

  handleSearch(){
    alert(this.textFilter + " em :" + this.typeFilter);
  }

  handlerInput(textInput, textLabel){
    this.textFilter = textInput ;
    this.typeFilter = textLabel ;
  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <h1>Lista de Veiculos</h1>
          <div className="barra">
            <div className="pesquisa">
              {/* <FilterMenu textInput={(text) => this.setState({textFilter:text})} /> */}
              <FilterMenu callbackParent={(textInput, textLabel) => this.handlerInput(textInput, textLabel)} />
              <Button variant="contained" color="primary" onClick={this.handleSearch}>
                <SearchSharpIcon/>
                Buscar
              </Button>
            </div>
            <SimpleModal />
          </div>
        </header>
        <div className="tabela">
          <Table url={this.typeFilter+"/"+this.textFilter}></Table>
        </div>
      </div>
    );
  }
}

export default App;

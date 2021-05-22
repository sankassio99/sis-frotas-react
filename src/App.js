import Button from '@material-ui/core/Button';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import AddBoxIcon from '@material-ui/icons/AddBox';

import Table from './components/CollapsibleTable/CollapsibleTable.js';
import Input from "./components/BasicTextFields/BasicTextFields.js";

import "./assets/app.css" ;
import { Component } from 'react';
import SimpleModal from './components/SimpleModal/SimpleModal.js';
import { createMuiTheme } from '@material-ui/core/styles';



class App extends Component {

  render(){

    const darkTheme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1>Lista de Veiculos</h1>
          <div className="barra">
            <div className="pesquisa">
              <Input/>
              <Button variant="contained" color="primary">
                <SearchSharpIcon/>
                Buscar
              </Button>
            </div>
            <SimpleModal />
          </div>
        </header>
        <div className="tabela">
          <Table></Table>
        </div>
        
        

      </div>
    );
  }
}

export default App;

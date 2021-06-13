import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import "./estilo.css" ;
import api from '../../../../services/api' ;

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default class FormDialog extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      nome: '',
      numero: '',
      cpf:'' , 
      rg: '',
      dataNacimento: '',
      categoria: 'A',
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){

    const {nome, numero, cpf, rg, dataNacimento, categoria} = this.state ;

    const handleClickOpen = () => {
      this.setState({
        open:true
      })
    };
  
    const handleClose = () => {
      this.setState({
        open:false
      })
    };
  
    const handleSave = () => {
      const response = api.post(
        "condutor", {nome, numero, cpf, rg, dataNacimento, categoria});
      this.setState({
        openAlert:true
      })

      setTimeout(()=>{
        window.location.reload();
      },1000);
    }

    return (
      <div>
        <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Nova Ordem Adicionada com Sucesso!
          </Alert>
        </Snackbar>
        <Fab color="secondary" aria-label="add" onClick={handleClickOpen} >
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle className="dialog-actions" id="form-dialog-title">Adicionar Nova Ordem</DialogTitle>
          <DialogContent>
            <TextField   onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="nome"
              label="Nome"
              // value={this.state.nome}
              type="text"
              fullWidth
            />
            <TextField  onChange={this.handleChange}
              margin="dense"
              name="numero"
              label="CNH"
              type="text"
              // value={this.state.numeroCnh}
              fullWidth
            />
            <div className="linha">
              <TextField  id="select" label="Categoria" name="categoria" 
              select value={this.state.categoria} onChange={this.handleChange}>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
              </TextField >
              <TextField  className="text-field" onChange={this.handleChange}
              margin="dense"
              name="cpf"
              label="CPF"
              type="text"
              // value={this.state.cpf}
            />
            </div>
            <div className="linha">

            <TextField  className="text-field" onChange={this.handleChange}
              margin="dense"
              name="rg"
              label="RG"
              type="text"
              // value={this.state.rg}
            />
            <TextField  className="text-field" onChange={this.handleChange}
              margin="dense"
              name="dataNacimento"
              label="Data de Nascimento"
              type="text"
              // value={this.state.dataNascimento}
            />
            </div>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

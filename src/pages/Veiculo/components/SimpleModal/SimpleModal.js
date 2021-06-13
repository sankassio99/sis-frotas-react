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
      modelo: '',
      marca: '',
      estadoConservacao:'Bom' , 
      placa: '',
      open: '',
      openAlert: '',
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

    const {modelo, marca, estadoConservacao, placa} = this.state ;
    const quilometragem = 0;

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
      const response = api.post("veiculo", {modelo, marca, quilometragem, estadoConservacao, placa });
      // console.log(response);
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
            Novo Veiculo Adcionado com Sucesso!
          </Alert>
        </Snackbar>
        <Fab color="secondary" aria-label="add" onClick={handleClickOpen} >
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Adicionar Novo Veiculo</DialogTitle>
          <DialogContent>
            <TextField  onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="modelo"
              label="Modelo"
              type="text"
              fullWidth
            />
            <TextField onChange={this.handleChange}
              margin="dense"
              name="marca"
              label="Marca"
              type="text"
              fullWidth
            />
            <div className="linha">
            <TextField id="select" label="Estado" name="estadoConservacao" 
            value={this.state.estadoConservacao} select onChange={this.handleChange}>
              <MenuItem value="Ruim">Ruim</MenuItem>
              <MenuItem value="Bom">Boa</MenuItem>
              <MenuItem value="Otimo">Otimo</MenuItem>
            </TextField>
                          
              <TextField onChange={this.handleChange}
                margin="dense"
                name="placa"
                label="Placa"
                type="text"
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

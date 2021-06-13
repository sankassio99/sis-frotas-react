import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import "./estilo.css" ;
import api from '../../../../services/api' ;
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default class FormDialog extends React.Component {

  constructor(props) {
    super(props);

    console.log("row: "+this.props.dadosVeiculo);
    
    this.state = {
      id: this.props.dadosVeiculo.id,
      modelo: this.props.dadosVeiculo.name,
      marca: this.props.dadosVeiculo.calories,
      estadoConservacao:this.props.dadosVeiculo.carbs , 
      placa: this.props.dadosVeiculo.protein,
      open: '',
      openAlert: ''
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

    const {id, modelo, marca, estadoConservacao, placa} = this.state ;
    const quilometragem = 0;

    const handleClickOpen = () => {
      this.setState({
        open:true
      })
    };

    function handlerEditar(){
      // console.log("editando: "+row.id);
      // const veiculoUpdated = await api.put(`veiculo/${person.id}`, { name: "Thiago" });
    }
  
    const handleClose = () => {
      this.setState({
        open:false,
        openAlert:true
      })
    };
  
    async function handleUpdate() {
      const veiculoUpdated = await api.put(`veiculo/${id}`, {
        modelo: modelo,
        marca: marca,
        quilometragem: 0,
        estadoConservacao: estadoConservacao , 
        placa: placa,
        });
        handleClose()
        setTimeout(()=>{
            window.location.reload();
        },1500);
    }

    return (
      <div>
        <Snackbar open={this.state.openAlert} autoHideDuration={6000} >
            <Alert severity="success" onClose={handleClose}>
            Veiculo Editado com Sucesso!
            </Alert>
        </Snackbar>
         <Button color="primary">
          <EditSharpIcon color="primary" onClick={handleClickOpen} /> 
         </Button>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Adicionar Novo Veiculo</DialogTitle>
          <DialogContent>
            <TextField  onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="modelo"
              label="Modelo"
              type="text"
              value={this.state.modelo}
              fullWidth
            />
            <TextField onChange={this.handleChange}
              margin="dense"
              name="marca"
              label="Marca"
              type="text"
              value={this.state.marca}
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
                value={this.state.placa}
                type="text"
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

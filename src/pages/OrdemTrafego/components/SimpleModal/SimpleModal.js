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
      origem: '',
      destino: '',
      data:'2021-06-03' , 
      hora: '10:00:00',
      distancia: '',
      veiculo_id: '',
      condutor_id: '',
      veiculos: [],
      condutores: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await api.get("veiculo")
      .then((response) => {return (response.data)})
      .catch((err)=> {
      console.error("ops! ocorreu um erro" + err)});

    const responseCondutor = await api.get("condutor")
      .then((response) => {return (response.data)})
      .catch((err)=> {
      console.error("ops! ocorreu um erro" + err)});

    let veiculos = response ;
    let dadosVeiculos = [] ;
    let dadosCondutores = [] ;

    dadosVeiculos.push(veiculos.map((veiculo)=>{
      let carro = {id: veiculo.id, modelo: veiculo.modelo};
      return carro ;
    }))

    dadosCondutores.push(responseCondutor.map((condutor)=>{
      let pessoa = {id: condutor.id, nome: condutor.nome};
      return pessoa ;
    }))

    console.log(dadosCondutores);

    this.setState({
      veiculos : dadosVeiculos[0],
      condutores : dadosCondutores[0] 
    })

  };
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){

    const {origem, destino, data, hora, distancia, veiculo_id, condutor_id} = this.state ;
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
      const response = api.post(
        "ordem", {origem, destino, quilometragem, data, hora, distancia, veiculo_id, condutor_id });
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
            <TextField  onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="origem"
              label="Origem"
              type="text"
              fullWidth
            />
            <TextField onChange={this.handleChange}
              margin="dense"
              name="destino"
              label="Destino"
              type="text"
              fullWidth
            />
            <div className="linha">
              <TextField className="text-select" id="select" label="Veiculo"	 name="veiculo_id" 
              value={this.state.veiculo_id} select onChange={this.handleChange}>
                {this.state.veiculos.map((veiculo) => (
                    <MenuItem value={veiculo.id}>{veiculo.modelo}</MenuItem>
                ))}
              </TextField>

              <TextField className="text-select" id="select" label="Condutor" name="condutor_id" 
              value={this.state.condutor_id} select onChange={this.handleChange}>
                {this.state.condutores.map((condutor) => (
                    <MenuItem value={condutor.id}>{condutor.nome}</MenuItem>
                ))}
              </TextField>
            </div>
            <div className="linha">
            
              <TextField className="text-field" onChange={this.handleChange}
              margin="dense"
              name="data"
              label="Data"
              type="text"
              value={this.state.data}
            />
            <TextField className="text-field" onChange={this.handleChange}
              margin="dense"
              name="distancia"
              label="Distancia"
              type="text"
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

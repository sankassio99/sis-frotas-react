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
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default class FormDialog extends React.Component {

  constructor(props) {
    super(props);

    console.log("row: "+this.props.dadosOrdem.id);
    
    this.state = {
      id: this.props.dadosOrdem.id,
      origem: this.props.dadosOrdem.origem,
      destino: this.props.dadosOrdem.destino,
      data:this.props.dadosOrdem.data , 
      hora: this.props.dadosOrdem.hora,
      distancia: this.props.dadosOrdem.distancia,
      veiculo_id: this.props.dadosOrdem.veiculo_id,
      condutor_id: this.props.dadosOrdem.condutor_id,
      open: '',
      openAlert: '',
      veiculos : [],
      condutores : []
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
      condutores : dadosCondutores[0],
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

    const {id, origem, destino, data, hora, distancia, veiculo_id, condutor_id} = this.state ;
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
        open:false
      })
    };
    const handleCloseAlert = () => {
      this.setState({
        openAlert:false
      })
    };
    const handleOpenAlert = () => {
      this.setState({
        openAlert:true
      })
    };

  
    async function handleUpdate() {
      await api.put(`ordem/${id}`, {
        origem: origem,
        destino: destino,
        data: data,
        hora: hora,
        distancia: distancia , 
        veiculo_id: veiculo_id,
        condutor_id: condutor_id
        });
        handleClose();
        handleOpenAlert();
        setTimeout(()=>{
            window.location.reload();
        },1500);
    }

    return (
      <div>
        <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Nova Ordem Adicionada com Sucesso!
          </Alert>
        </Snackbar>
         <Button color="primary">
          <EditSharpIcon color="primary" onClick={handleClickOpen} /> 
         </Button>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Adicionar Nova Ordem</DialogTitle>
          <DialogContent>
            <TextField  onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="origem"
              label="Origem"
              value={this.state.origem}
              type="text"
              fullWidth
            />
            <TextField onChange={this.handleChange}
              margin="dense"
              name="destino"
              label="Destino"
              type="text"
              value={this.state.destino}
              fullWidth
            />
            <div className="linha">
              <TextField id="select" label="Veiculo" name="veiculo_id" 
              select value={this.state.veiculo_id} onChange={this.handleChange}>
                {this.state.veiculos.map((veiculo) => (
                    <MenuItem value={veiculo.id}>{veiculo.modelo}</MenuItem>
                ))}
              </TextField>

              <TextField id="select" label="Condutor" name="condutor_id" 
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
              value={this.state.distancia}
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

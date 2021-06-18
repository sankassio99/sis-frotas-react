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

    console.log("row: "+this.props.dadosCondutor.id);
    
    this.state = {
      id: this.props.dadosCondutor.id,
      nome: this.props.dadosCondutor.nome,
      numeroCnh: this.props.dadosCondutor.numeroCnh,
      cpf:this.props.dadosCondutor.cpf , 
      rg: this.props.dadosCondutor.rg,
      dataNascimento: this.props.dadosCondutor.dataNacimento,
      categoriaCnh: this.props.dadosCondutor.categoriaCnh,
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

    const {id, nome, numeroCnh, cpf, rg, dataNascimento, categoriaCnh} = this.state ;

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
      await api.put(`condutor/${id}`, {
        nome: nome,
        numero: numeroCnh,
        cpf:cpf , 
        rg: rg,
        dataNacimento: dataNascimento,
        categoria: categoriaCnh,
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
            Condutor Editado com Sucesso!
          </Alert>
        </Snackbar>
         <Button color="primary">
          <EditSharpIcon color="primary" onClick={handleClickOpen} /> 
         </Button>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Adicionar Novo Condutor</DialogTitle>
          <DialogContent>
            <TextField   onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="nome"
              label="Nome"
              value={this.state.nome}
              type="text"
              fullWidth
            />
            <TextField  onChange={this.handleChange}
              margin="dense"
              name="numeroCnh"
              label="CNH"
              type="text"
              value={this.state.numeroCnh}
              fullWidth
            />
            <div className="linha">
              <TextField  id="select" label="Veiculo" name="categoriaCnh" 
              select value={this.state.categoriaCnh} onChange={this.handleChange}>
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
              value={this.state.cpf}
            />
            </div>
            <div className="linha">

            <TextField  className="text-field" onChange={this.handleChange}
              margin="dense"
              name="rg"
              label="RG"
              type="text"
              value={this.state.rg}
            />
            <TextField  className="text-field" onChange={this.handleChange}
              margin="dense"
              name="dataNacimento"
              label="Data de Nascimento"
              type="text"
              value={this.state.dataNascimento}
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

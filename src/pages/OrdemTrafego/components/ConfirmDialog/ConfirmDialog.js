import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import api from '../../../../services/api' ;
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handlerDeletar(){
    console.log("deletando: "+props.dadosOrdem.id);
    const veiculoDeleted = await api.delete(`ordem/${props.dadosOrdem.id}`);
    setOpenAlert(true);
    setTimeout(()=>{
        window.location.reload();
    },1000);
  }

  return (
    <div>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="success">
            Ordem Deletada com Sucesso!
            </Alert>
        </Snackbar>
      <Button color="primary" onClick={handleClickOpen}>
        <DeleteIcon className="btn-delete" color="secondary"/>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlerDeletar} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

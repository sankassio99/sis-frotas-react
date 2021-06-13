import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import './estilo.css' ;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="primary" className="appBar" position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link className="link" to="/">
                <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.titulo}
          </Typography>
          <Button color="white">
              <Link className="link" to="/ordem-trafego">Ordens de Trafego</Link>
            </Button>
            <Button color="white">
              <Link className="link" to="/condutor">Condutores</Link>
            </Button>
            <Button color="white">
              <Link className="link" to="/veiculo">Veiculos</Link>
            </Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

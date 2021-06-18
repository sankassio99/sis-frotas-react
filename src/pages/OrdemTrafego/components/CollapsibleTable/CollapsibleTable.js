import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import SimpleModalEdit from '../SimpleModalEdit/SimpleModalEdit';

import FilterMenu from "../FilterMenu/FilterMenu";
import api from '../../../../services/api' ;
import Button from '@material-ui/core/Button';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import SimpleModal from '../SimpleModal/SimpleModal.js';
import './estilo.css' ;

import Skeleton from '@material-ui/lab/Skeleton';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#272c34",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, origem, destino, data, distancia, veiculo, condutor, veiculo_id, condutor_id) {
  return {
    id: id,
    origem: origem,
    destino: destino,
    data: data,
    distancia: distancia,
    veiculo: veiculo,
    condutor: condutor,
    veiculo_id: veiculo_id,
    condutor_id: condutor_id,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.origem}
        </TableCell>
        <TableCell align="right">{row.destino}</TableCell>
        <TableCell align="right">{row.data}</TableCell>
        <TableCell align="right">{row.distancia} Km</TableCell>
        <TableCell align="right">{row.veiculo}</TableCell>
        <TableCell align="right">{row.condutor}</TableCell>
        <TableCell >
          <div className="btn-group">
            <SimpleModalEdit className="btn-edit" dadosOrdem={row} color="primary" />
            <ConfirmDialog dadosOrdem={row} color="secundary"/>
          </div>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default class CollapsibleTable extends Component {

  constructor(props){
    super(props);
    this.ordens = '';
    this.typeFilter = '' ;
    this.textFilter ='' ;

    this.state = {
      rows : [],
      loading : true
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
  }

  handlerInput = (textInput, textLabel) => {
    this.textFilter = textInput ;
    this.typeFilter = textLabel ;
  }

  async handleSearch() {
    let url = (this.textFilter == '') ? "ordem/" : "ordem/"+this.typeFilter+"/"+this.textFilter ;
    const response = await api.get(url)
                    .then((response) => {return (response.data)})
                    .catch((err)=> {
                    console.error("ops! ocorreu um erro" + err)});
    this.ordens = response ;
    let dadosRow = [];
    dadosRow.push(this.ordens.map(ordens => (
        createData(ordens.id, ordens.origem, ordens.destino, ordens.data, 
            ordens.distancia, ordens.veiculo.modelo, ordens.condutor.nome)
    )))
    console.log(dadosRow[0]);

    this.setState({
      rows: dadosRow[0],
      loading: false
    })
    
  }

  async componentDidMount(){
    const response = await api.get("ordem")
      .then((response) => {return (response.data)})
      .catch((err)=> {
        console.error("ops! ocorreu um erro" + err)});

    this.ordens = response.data ;
    console.log(this.ordens);
    let dadosRow = [];
    dadosRow.push(this.ordens
    .map(ordens => (
            createData(ordens.id, ordens.origem, ordens.destino, ordens.data, 
                ordens.distancia, ordens.veiculo.modelo, ordens.condutor.nome, ordens.veiculo.id, ordens.condutor.id)
        )))

    this.setState({
      rows: dadosRow[0],
      loading: false
    })

  }

  
  render(){
    return (
      <TableContainer component={Paper}>
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
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Origem</StyledTableCell>
              <StyledTableCell align="right">Destino</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Distancia</StyledTableCell>
              <StyledTableCell align="right">Veiculo</StyledTableCell>
              <StyledTableCell align="right">Condutor</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.loading ? (
              <div className="loading">
                <Skeleton animation="wave" width={"180vh"} height={60}/>
                <Skeleton animation="wave" width={"180vh"} height={60} />
                <Skeleton animation="wave" width={"180vh"} height={60}/>
              </div>
            ) : (
              this.state.rows.map((row) => (
                <Row key={row.modelo} row={row} />
              ))
            )}
            
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
}

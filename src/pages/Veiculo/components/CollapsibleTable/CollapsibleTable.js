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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f50057",
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

function createData(id, name, calories, fat, carbs, protein, price) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
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
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell>
          <div className="btn-group">
            <SimpleModalEdit className="btn-edit" dadosVeiculo={row} color="primary" />
            <ConfirmDialog dadosVeiculo={row} color="secundary"/>
          </div>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Ordens de Trafego
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Origem</TableCell>
                    <TableCell align="right">Destino</TableCell>
                    <TableCell align="right">Condutor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
    this.veiculos = '';
    this.typeFilter = '' ;
    this.textFilter ='' ;

    this.state = {
      rows : []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
  }

  handlerInput = (textInput, textLabel) => {
    this.textFilter = textInput ;
    this.typeFilter = textLabel ;
  }

  async handleSearch() {
    let url = (this.textFilter == '') ? "veiculo/" : "veiculo/"+this.typeFilter+"/"+this.textFilter ;
    const response = await api.get(url)
                    .then((response) => {return (response.data)})
                    .catch((err)=> {
                    console.error("ops! ocorreu um erro" + err)});
    this.veiculos = response ;
    let dadosRow = [];
    dadosRow.push(this.veiculos.map(veiculo => (
        createData(veiculo.id, veiculo.modelo, veiculo.marca, veiculo.quilometragem, 
            veiculo.estadoConservacao, veiculo.placa, 3.99)
    )))
    console.log(this.props.rows);

    this.setState({
      rows: dadosRow[0]
    })
    
  }

  async componentDidMount(){
    const response = await api.get("veiculo")
      .then((response) => {return (response.data)})
      .catch((err)=> {
        console.error("ops! ocorreu um erro" + err)});

    this.veiculos = response ;
    let dadosRow = [];
    dadosRow.push(this.veiculos.map(veiculo => (
        createData(veiculo.id, veiculo.modelo, veiculo.marca, veiculo.quilometragem, 
            veiculo.estadoConservacao, veiculo.placa, 3.99)
    )))

    this.setState({
      rows: dadosRow[0]
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
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Modelo</StyledTableCell>
              <StyledTableCell align="right">Marca</StyledTableCell>
              <StyledTableCell align="right">Quilometragem</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
              <StyledTableCell align="right">Placa</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <Row key={row.modelo} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
}

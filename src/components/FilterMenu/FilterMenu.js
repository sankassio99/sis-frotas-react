import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import Input from "../BasicTextFields/BasicTextFields";
import "./estilo.css";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textInput, setTextInput] = React.useState('Veiculo');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  function handleGetValue(text){
      // console.log(text);
      setTextInput(text);
      setAnchorEl(null);
  }

  return (
    <div>
        <div className="linha">
            <Input text={textInput}/>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <FilterListIcon />
            </Button>
        </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleGetValue("Estado")} >Estado de Conservacao</MenuItem>
        <MenuItem onClick={() => handleGetValue("Marca")}>Marca</MenuItem>
        <MenuItem onClick={() => handleGetValue("Quilometragem")}>Quilometragem</MenuItem>
        <MenuItem onClick={() => handleGetValue("Modelo")}>Modelo</MenuItem>
      </Menu>
    </div>
  );
}

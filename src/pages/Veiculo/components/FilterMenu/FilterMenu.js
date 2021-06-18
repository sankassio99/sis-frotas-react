import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import "./estilo.css";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textLabel, setTextLabel] = React.useState('modelo');
  const [textInput, setTextInput] = React.useState('');
  props.callbackParent(textInput, textLabel);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  function handleGetValue(text){
      setTextLabel(text);
      setAnchorEl(null);
  }

  function handleInput(e) {
    setTextInput(e.target.value);
  }

  return (
    <div>
        <div className="linha">
            <TextField type="text" onChange={handleInput} label={textLabel}/>
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
        <MenuItem onClick={() => handleGetValue("estado")} >Estado de Conservacao</MenuItem>
        <MenuItem onClick={() => handleGetValue("marca")}>Marca</MenuItem>
        <MenuItem onClick={() => handleGetValue("intervaloQuilometragem")}>Quilometragem</MenuItem>
        <MenuItem onClick={() => handleGetValue("modelo")}>Modelo</MenuItem>
      </Menu>
    </div>
  );
}

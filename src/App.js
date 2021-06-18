
import { Component, useState } from 'react';
import Routes from './routes';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import "./assets/app.css"

function App() {

  // constructor(props){
  //   super(props);

  //   this.darkMode = false ;
  //   this.theme = createMuiTheme({
  //     palette: {
  //       type: 'dark', 
  //     }
  //   })
  // }

  const [darkMode, setDarkMode] = useState(false);
  
    const handleChange = (e) => {
      console.log(e.target.checked);
      setDarkMode(!darkMode);

    };
    
    const theme = createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light', 
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#03a9f4',
          // dark: will be calculated from palette.primary.main,
          dark: '#0052cc',
          // contrastText: will be calculated to contrast with palette.primary.main
          // contrastText: '#ffcc00',
        },
        secondary: {
          light: '#ff4400',
          main: '#f50057', //#f50057  #0044ff
          // dark: will be calculated from palette.secondary.main,
          dark: '#cc0047',
          // contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes />
          <div className="App">
            <div className="dark-mode">
                <Brightness4Icon/>
                <Switch
                    color="primary"
                    onClick={handleChange}
                    value={darkMode}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
          </div>
        </CssBaseline>
      </ThemeProvider>
    );
  
}

export default App;

import { ThemeProvider  } from '@material-ui/styles';
import { createMuiTheme  } from '@material-ui/core/styles';
import StudyViewer from './components/StudyViewer';
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack';
export const darkTheme = createMuiTheme({
  palette:  {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function App() {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3} transitionDuration={{appear:225, exit: 195}}>
      <StudyViewer/>
    </SnackbarProvider>
  </ThemeProvider>;
}

export default App;

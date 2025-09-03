import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0e7c86' // teal-ish similar to design; change as you like
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.08)' }
        }
      }
    }
  }
});

export default theme;

import './App.css'
import { createTheme, ThemeProvider, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
const theme = createTheme({
  typography: {
    fontFamily: 'Cairo',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fff',
    },
  },
})

function App() {
  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir='rtl'>
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',gap: '1rem' }}>
            <div style={{ width: '100%', backgroundColor: 'rgb(28 52 91 / 36%)', borderRadius: '1rem', padding: '1rem', color: 'white', boxShadow: '5px 11px 1px rgba(0, 0, 0, 0.5)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'start' }}>
                  <Typography variant="h2" gutterBottom style={{ fontWeight: 600 }}>
                    مصر
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '1.2rem' }}>
                    الاثنين 10-10-2025
                  </Typography>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap: '1rem' }}>
                  <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                  <div>
                    <div style={{ textAlign: 'right' }}>
                      <Typography variant="h2" gutterBottom>
                        25°
                      </Typography>
                    </div>
                    <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                      broken clouds
                    </Typography>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between',gap: '1rem' }}>
                      <Typography variant="h6" gutterBottom>
                        صغري: 25°
                      </Typography>
                      |
                      <Typography variant="h6" gutterBottom>
                        كبري: 25°
                      </Typography>
                    </div>
                  </div>
                  </div>
                  <CloudIcon style={{fontSize: '12rem',color: 'white'}} />
                </div>
              </div>
            </div>
            <div style={{display: 'flex',justifyContent: 'end',width: '100%'}}>
              <Button variant='text' color='primary' style={{color: 'white'}}>إنجليزي</Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App

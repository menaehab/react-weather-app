import './App.css'
import { createTheme, ThemeProvider, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
function App() {
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

  const toCelsius = (k) => (k - 273.15).toFixed(1);
  
  const [weatherData, setWeatherData] = useState(null);
  const [date, setDate] = useState(moment().format("MMM Do YYYY"));

  useEffect(() => {
    let cancelAxios; 
    setDate(moment().format("MMM Do YYYY"));

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Qena&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
          {
            cancelToken: new axios.CancelToken((cancel) => {
              cancelAxios = cancel;
            }),
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching weather data:', error);
        }
      } 
    };

    fetchWeatherData();

    return () => {
      if (cancelAxios) cancelAxios();
    };
  }, []);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir='rtl'>
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',gap: '1rem' }}>
            <div style={{ width: '100%', backgroundColor: 'rgb(28 52 91 / 36%)', borderRadius: '1rem', padding: '1rem', color: 'white', boxShadow: '5px 11px 1px rgba(0, 0, 0, 0.5)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'start' }}>
                  <Typography variant="h2" gutterBottom style={{ fontWeight: 600 }}>
                    قنا 
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '1.2rem' }}>
                    {date}
                  </Typography>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap: '1rem' }}>
                  <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                  <div>
                      {!weatherData ? (
                        <Typography variant="h2" style={{textAlign: 'center'}} gutterBottom>جاري التحميل...</Typography>
                      ) : (
                        <>
                          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Typography variant="h2" gutterBottom>
                              {toCelsius(weatherData.main.temp)}°C
                            </Typography>
                            <img
                              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                              alt=""
                              style={{ width: '5rem', height: '5rem' }}
                            />
                          </div>

                          <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                            {weatherData.weather[0].description}
                          </Typography>

                          <div
                            style={{
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '1rem',
                            }}
                          >
                            <Typography variant="h6" gutterBottom>
                              صغري: {toCelsius(weatherData.main.temp_min)}
                            </Typography>
                            |
                            <Typography variant="h6" gutterBottom>
                              كبري: {toCelsius(weatherData.main.temp_max)}
                            </Typography>
                          </div>
                        </>
                      )}
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

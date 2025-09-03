import './App.css'
import { createTheme, ThemeProvider, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

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

  // Set Arabic locale
  moment.updateLocale('ar', {
    months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_')
  });

  const { t, i18n } = useTranslation();
  
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    moment.locale(language);
    i18n.changeLanguage(language);
  }, []);


  const handleLanguageChange = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
    setDate(moment().format('dddd، D MMMM YYYY')); 
  }
  
  const toCelsius = (k) => (k - 273.15).toFixed(1);
  
  
  const [weatherData, setWeatherData] = useState(null);
  const [date, setDate] = useState(moment().format('dddd، D MMMM YYYY'));

  useEffect(() => {
    let cancelAxios; 
    // Update date with Arabic format
    setDate(moment().format('dddd، D MMMM YYYY'));

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
        <Container maxWidth="sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column',gap: '1rem' }}>
            <div style={{ width: '100%', backgroundColor: 'rgb(28 52 91 / 36%)', borderRadius: '1rem', padding: '1rem', color: 'white', boxShadow: '5px 11px 1px rgba(0, 0, 0, 0.5)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'start',gap: '1.2rem' }}>
                  <Typography variant="h2" gutterBottom style={{ fontWeight: 600 }}>
                    {t('qena')}
                  </Typography>
                  <Typography variant="h5" gutterBottom >
                    {date}
                  </Typography>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap: '1rem' }}>
                  <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                  <div>
                      {!weatherData ? (
                        <Typography variant="h2" style={{textAlign: 'center'}} gutterBottom>{t('loading')}</Typography>
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
                              {t('min')}: {toCelsius(weatherData.main.temp_min)}
                            </Typography>
                            |
                            <Typography variant="h6" gutterBottom>
                              {t('max')}: {toCelsius(weatherData.main.temp_max)}
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
              <Button variant='text' color='primary' style={{color: 'white'}} onClick={handleLanguageChange}>{language === 'ar' ? 'English' : 'العربية'}</Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App

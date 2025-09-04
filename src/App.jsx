// App.jsx
import './App.css';
import { createTheme, ThemeProvider, Typography, Button, Container } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useGetWeatherQuery } from './app/features/WeatherApiSlice'; // RTK Query hook

const theme = createTheme({
  typography: { fontFamily: 'Cairo' },
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#fff' },
  },
});

moment.updateLocale('ar', {
  months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
});

const toCelsius = (k) => (k - 273.15).toFixed(1);

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('ar');
  const [date, setDate] = useState(moment().format('dddd، D MMMM YYYY'));

  const { data: weatherData, error, isLoading } = useGetWeatherQuery('Qena');

  const handleLanguageChange = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    i18n.changeLanguage(newLang).catch(console.error);
    moment.locale(newLang);
    setDate(moment().format('dddd، D MMMM YYYY'));
  };

  useEffect(() => {
    moment.locale(language);
    i18n.changeLanguage(language).catch(console.error);
    setDate(moment().format('dddd، D MMMM YYYY'));
  }, [language]);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
      <Container maxWidth="sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgb(28 52 91 / 36%)',
              borderRadius: '1rem',
              padding: '1rem',
              color: 'white',
              boxShadow: '5px 11px 1px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'start', gap: '1.2rem' }}>
                <Typography variant="h2" gutterBottom style={{ fontWeight: 600 }}>
                  {t('qena')}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {date}
                </Typography>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {isLoading ? (
                      <Typography variant="h2" style={{ textAlign: 'center' }} gutterBottom>
                        {t('loading')}
                      </Typography>
                    ) : error ? (
                      <Typography variant="h2" style={{ textAlign: 'center' }} gutterBottom>
                        {t('error')}
                      </Typography>
                    ) : (
                      <>
                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <Typography variant="h2" gutterBottom>
                            {toCelsius(weatherData.main.temp)}°C
                          </Typography>
                          <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                            alt={weatherData.weather[0].description}
                            style={{ width: '5rem', height: '5rem' }}
                          />
                        </div>
                        <Typography style={{ textAlign: 'center' }} variant="h6" gutterBottom>
                          {weatherData.weather[0].description}
                        </Typography>
                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
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
                <CloudIcon style={{ fontSize: '12rem', color: 'white' }} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            <Button variant="text" color="primary" style={{ color: 'white' }} onClick={handleLanguageChange}>
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default App;

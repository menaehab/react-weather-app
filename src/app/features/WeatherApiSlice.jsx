import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (city) => `weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;

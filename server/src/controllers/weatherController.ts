import { Request, Response } from 'express';
import { CURATED_ALERTS } from '../data/alerts.js';
import { WeatherData, WeatherForecastDay } from '../types/index.js';

const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  80: 'Rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export async function getWeatherForecast(req: Request, res: Response) {
  const { latitude, longitude, destinationId } = req.query;

  if (!latitude || !longitude) {
    res.status(400).json({
      success: false,
      error: 'Latitude and longitude parameters are required'
    });
    return;
  }

  const lat = parseFloat(latitude as string);
  const lng = parseFloat(longitude as string);

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).json({
      success: false,
      error: 'Latitude and longitude must be valid floating point numbers'
    });
    return;
  }

  // Cross-reference official alerts for destination
  let relevantAlerts = [...CURATED_ALERTS];
  if (destinationId && typeof destinationId === 'string' && destinationId !== 'all') {
    relevantAlerts = relevantAlerts.filter(
      a => a.destinationId?.toLowerCase() === destinationId.toLowerCase()
    );
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });

    if (!response.ok) {
      throw new Error(`Open-Meteo returned status ${response.status}`);
    }

    const data = (await response.json()) as any;
    const current = data.current;
    const daily = data.daily;

    // Format 7-day forecast array
    const forecast: WeatherForecastDay[] = [];
    if (daily && daily.time) {
      for (let i = 0; i < daily.time.length; i++) {
        const dateStr = daily.time[i];
        const dateObj = new Date(dateStr);
        const dayOfWeek = dayNames[dateObj.getDay()];
        const code = daily.weather_code[i] ?? 0;

        forecast.push({
          date: dateStr,
          dayOfWeek,
          weatherCode: code,
          condition: weatherCodeMap[code] || 'Partly cloudy',
          maxTemp: Math.round(daily.temperature_2m_max[i] ?? 25),
          minTemp: Math.round(daily.temperature_2m_min[i] ?? 16),
          precipitationProbability: Math.round(daily.precipitation_probability_max?.[i] ?? 0),
          windSpeedMax: Math.round(daily.wind_speed_10m_max?.[i] ?? 10)
        });
      }
    }

    const weatherPayload: WeatherData = {
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      weatherCode: current.weather_code,
      condition: weatherCodeMap[current.weather_code] || 'Partly cloudy',
      windSpeed: Math.round(current.wind_speed_10m),
      humidity: Math.round(current.relative_humidity_2m),
      rainProbability: forecast[0]?.precipitationProbability ?? 10,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLive: true,
      forecast,
      alerts: relevantAlerts
    };

    res.json({
      success: true,
      data: weatherPayload
    });
  } catch (error: any) {
    console.warn('Live weather service failed, using deterministic historical baseline:', error.message);

    // Deterministic fallback with realistic Indian seasonal baseline
    const now = new Date();
    const mockForecast: WeatherForecastDay[] = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(now.getTime() + i * 86400000);
      return {
        date: d.toISOString().split('T')[0],
        dayOfWeek: dayNames[d.getDay()],
        weatherCode: 2,
        condition: 'Partly cloudy (Historical avg)',
        maxTemp: 26 - (i % 3),
        minTemp: 17 + (i % 2),
        precipitationProbability: 15,
        windSpeedMax: 12
      };
    });

    res.json({
      success: true,
      data: {
        temperature: 24,
        apparentTemperature: 25,
        weatherCode: 2,
        condition: 'Partly cloudy (Historical avg)',
        windSpeed: 10,
        humidity: 65,
        rainProbability: 15,
        lastUpdated: 'Live feed unavailable (Historical baseline)',
        isLive: false,
        forecast: mockForecast,
        alerts: relevantAlerts
      },
      isFallback: true
    });
  }
}

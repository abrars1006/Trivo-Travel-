import React, { useEffect, useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Wind, 
  Droplets, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  ExternalLink,
  Umbrella,
  Calendar
} from 'lucide-react';
import { WeatherData, WeatherForecastDay, TravelAlert } from '../../types';
import { fetchLiveWeather } from '../../services/weatherService';

interface WeatherWidgetProps {
  latitude: number;
  longitude: number;
  locationName: string;
  destinationId?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  latitude,
  longitude,
  locationName,
  destinationId,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  const loadWeather = async () => {
    setLoading(true);
    const data = await fetchLiveWeather(latitude, longitude, destinationId);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, [latitude, longitude, destinationId]);

  const getWeatherIcon = (code: number, sizeClass = 'w-8 h-8') => {
    if (code === 0 || code === 1) {
      return <Sun className={`${sizeClass} text-amber-500`} />;
    } else if (code >= 51 && code <= 82) {
      return <CloudRain className={`${sizeClass} text-blue-500`} />;
    } else if (code >= 95) {
      return <CloudLightning className={`${sizeClass} text-purple-600`} />;
    }
    return <Cloud className={`${sizeClass} text-slate-400`} />;
  };

  return (
    <div className="bg-white rounded-3xl border border-borderline p-5 sm:p-6 shadow-soft space-y-4">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3 border-b border-borderline">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Meteorological Feed & Observations
          </span>
          <h4 className="font-bold text-dark text-base">{locationName} Climate</h4>
        </div>

        <div className="flex items-center gap-2">
          {weather?.isLive ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Satellite Feed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              Historical Baseline
            </span>
          )}

          <button
            type="button"
            onClick={loadWeather}
            disabled={loading}
            className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-surface transition-colors"
            title="Refresh weather data"
            aria-label="Refresh weather data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && !weather ? (
        <div className="py-6 flex items-center justify-center gap-2 text-xs text-muted">
          <RefreshCw className="w-4 h-4 animate-spin text-primary-600" />
          <span>Polling Open-Meteo meteorological feed...</span>
        </div>
      ) : weather ? (
        <>
          {/* Current Observation Panel */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {getWeatherIcon(weather.weatherCode)}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-dark">{weather.temperature}°</span>
                  <span className="text-xs text-muted font-medium">C</span>
                </div>
                <p className="text-xs font-semibold text-dark/80">{weather.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-right text-xs">
              <div className="flex items-center justify-end gap-1 text-muted">
                <Wind className="w-3.5 h-3.5 text-primary-600" />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-muted">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>{weather.humidity}% hum</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-muted col-span-2">
                <Umbrella className="w-3.5 h-3.5 text-blue-600" />
                <span>Rain chance: {weather.rainProbability ?? 10}%</span>
              </div>
              <div className="col-span-2 text-[10px] text-muted">
                Observed at: {weather.lastUpdated}
              </div>
            </div>
          </div>

          {/* Active Official Alerts Banner */}
          {weather.alerts && weather.alerts.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  Official Weather Advisory
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-200 text-rose-900 uppercase">
                  {weather.alerts[0].severity}
                </span>
              </div>
              <h5 className="font-bold text-xs">{weather.alerts[0].title}</h5>
              <p className="text-[11px] text-rose-900/90 leading-relaxed">
                {weather.alerts[0].details}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-rose-800">
                <span>Source: {weather.alerts[0].sourceName}</span>
                {weather.alerts[0].sourceUrl && (
                  <a
                    href={weather.alerts[0].sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Bulletin Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 7-Day Forecast Section Toggle */}
          {weather.forecast && weather.forecast.length > 0 && (
            <div className="pt-2 border-t border-borderline/60">
              <button
                type="button"
                onClick={() => setShowForecast(!showForecast)}
                className="w-full py-1.5 text-xs font-bold text-dark/80 hover:text-dark flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary-600" />
                  <span>7-Day Trip Forecast & Precipitation</span>
                </span>
                {showForecast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showForecast && (
                <div className="mt-3 space-y-2 pt-1 animate-in fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {weather.forecast.map((day, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#FAFAF7] border border-borderline text-center space-y-1"
                      >
                        <span className="text-[11px] font-bold text-dark block">
                          {day.dayOfWeek} ({new Date(day.date).getDate()})
                        </span>
                        <div className="flex justify-center py-1">
                          {getWeatherIcon(day.weatherCode, 'w-6 h-6')}
                        </div>
                        <div className="text-[11px] font-bold text-dark">
                          {day.maxTemp}° / <span className="text-muted font-normal">{day.minTemp}°</span>
                        </div>
                        <div className="text-[10px] text-blue-600 font-semibold flex items-center justify-center gap-0.5">
                          <Droplets className="w-2.5 h-2.5" />
                          <span>{day.precipitationProbability}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-muted text-center pt-1">
                    Powered by Open-Meteo Global Numerical Weather Prediction Models
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

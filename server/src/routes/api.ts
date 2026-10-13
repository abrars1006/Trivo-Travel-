import { Router } from 'express';
import { getAllDestinations, getDestinationById } from '../controllers/destinationsController.js';
import { getAllAlerts } from '../controllers/alertsController.js';
import { generateTripItinerary } from '../controllers/tripsController.js';
import { handleAIChat } from '../controllers/aiController.js';
import { getNearbyRentals } from '../controllers/rentalsController.js';
import { getNearbyRestaurants, getRestaurantById } from '../controllers/restaurantsController.js';
import { getNearbyHotels, getHotelById } from '../controllers/hotelsController.js';
import { getWeatherForecast } from '../controllers/weatherController.js';
import { getItineraryAlternatives } from '../controllers/alternativesController.js';

export const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Trivo-Travel',
    tagline: 'Explore More. Travel Smarter.',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Destinations
apiRouter.get('/destinations', getAllDestinations);
apiRouter.get('/destinations/:id', getDestinationById);

// Alerts
apiRouter.get('/alerts', getAllAlerts);

// Trips & Itinerary Generation
apiRouter.post('/trips/generate', generateTripItinerary);

// AI Chat
apiRouter.post('/ai/chat', handleAIChat);

// Live Weather & 7-Day Forecast
apiRouter.get('/weather', getWeatherForecast);

// Vehicle Rentals (Two-wheelers & Four-wheelers)
apiRouter.get('/rentals/nearby', getNearbyRentals);

// Restaurants & Food
apiRouter.get('/restaurants/nearby', getNearbyRestaurants);
apiRouter.get('/restaurants/:id', getRestaurantById);

// Hotels & Stays
apiRouter.get('/hotels/nearby', getNearbyHotels);
apiRouter.get('/hotels/:id', getHotelById);

// Weather-Aware Itinerary Alternatives
apiRouter.get('/itinerary/alternatives', getItineraryAlternatives);


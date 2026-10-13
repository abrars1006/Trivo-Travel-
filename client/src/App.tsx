import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingAIWidget } from './components/layout/FloatingAIWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { PlannerPage } from './pages/PlannerPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AlertsPage } from './pages/AlertsPage';
import { BudgetPage } from './pages/BudgetPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <TripProvider>
            <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#202822] antialiased">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/destination/:id" element={<DestinationDetailsPage />} />
                  <Route path="/planner" element={<PlannerPage />} />
                  <Route path="/itinerary/:id" element={<ItineraryPage />} />
                  <Route path="/ai" element={<AIAssistantPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="/budget" element={<BudgetPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <FloatingAIWidget />
            </div>
          </TripProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;

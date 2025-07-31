import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AnnouncementsProvider } from '@/context/AnnouncementsContext';
import { FiltersProvider } from '@/context/FiltersContext';
import '@/scss/main.scss';
import App from '@/App';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <FiltersProvider>
      <AnnouncementsProvider>
        <App />
      </AnnouncementsProvider>
    </FiltersProvider>
  </StrictMode>,
);

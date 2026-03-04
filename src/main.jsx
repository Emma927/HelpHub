import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FiltersProvider } from '@/contexts/filtersContext/FiltersProvider';
import { AnnouncementsProvider } from '@/contexts/announcementsContext/AnnouncementsProvider';
import { UserProvider } from '@/contexts/userContext/UserProvider';
import '@/scss/main.scss';
import App from '@/App';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <BrowserRouter>
      <FiltersProvider>
        <AnnouncementsProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AnnouncementsProvider>
      </FiltersProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FiltersProvider } from '@/context/FiltersContext';
import { AnnouncementsProvider } from '@/context/AnnouncementsContext';
import { UserProvider } from '@/context/UserContext';
import '@/scss/main.scss';
import App from '@/App';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <FiltersProvider>
      <AnnouncementsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AnnouncementsProvider>
    </FiltersProvider>
  </StrictMode>,
);

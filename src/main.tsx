import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './route-tree.gen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import locale from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import './index.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(locale);
dayjs.locale('fr');

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = createRoot(document.getElementById('app')!);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

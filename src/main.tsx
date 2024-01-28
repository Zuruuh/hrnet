import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './route-tree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const root = createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>,
);

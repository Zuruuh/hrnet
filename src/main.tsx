import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './route-tree.gen';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

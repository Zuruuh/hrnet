import { lazy, type FC, Suspense } from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { css } from '../../styled-system/css';

const TanStackRouterDevtools = import.meta.env.DEV
	? lazy(() =>
			import('@tanstack/router-devtools').then((res) => ({
				default: res.TanStackRouterDevtools,
			})),
	  )
	: () => null;

const ReactQueryDevTools = import.meta.env.DEV
	? lazy(() =>
			import('@tanstack/react-query-devtools').then((res) => ({
				default: res.ReactQueryDevtools,
			})),
	  )
	: () => null;

export const Root: FC = () => {
	return (
		<>
			<Suspense>
				<ReactQueryDevTools />
				<TanStackRouterDevtools />
			</Suspense>
			<nav className={css({ display: 'flex' })}>
				<h1>HRNet</h1>
			</nav>
			<main>
				<Outlet />
			</main>
			<footer></footer>
		</>
	);
};

export const Route = createRootRoute({ component: Root });

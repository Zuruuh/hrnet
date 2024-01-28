import { lazy, type FC, Suspense } from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NavBar } from '../components/Layout/NavBar';
import { css } from '../../styled-system/css';
import { Footer } from '../components/Layout/Footer';

// Include dev-tools in bundle only in dev-env
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
			<div
				className={css({
					display: 'flex',
					flexDir: 'column',
					minHeight: 'screen',
					justifyContent: 'flex-start',
				})}
			>
				<NavBar />
				<main
					className={css({
						fontFamily: 'inter',
						flexGrow: '1',
						backgroundColor: 'gray.100',
					})}
				>
					<Outlet />
				</main>
				<Footer />
			</div>
		</>
	);
};

export const Route = createRootRoute({ component: Root });

import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../Header';
import { DarkModeProvider } from '../../Hooks/UseDarkMode';
import { VerifyAuth } from '../VerifyAuth';
import { Sidebar } from '../Sidebar';
import '~/Config/i18n';

export function InjectorProviders({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<QueryClientProvider
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								refetchOnWindowFocus: false,
								retry: false,
								// cacheTime: 1000 * 60 * 60 * 24, // 24 hours
								staleTime: 1000, // 1 Second to void multiples call api
							},
						},
					})
				}
			>
				<DarkModeProvider>
					<VerifyAuth />
					<Toaster position="top-right" />
					<div className="flex flex-col w-full h-screen">
						<Header />
						<div className="w-full flex flex-1">
							<Sidebar />
							<main className="flex-1 p-2">{children}</main>
						</div>
					</div>
				</DarkModeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from '~/Hooks/UseDarkMode';
import { TestProvider } from '~/Hooks/UseTest';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { Header } from '../Header';
import '~/Config/i18n';
import { VerifyAuth } from '../Shared/VerifyAuth';
import { Sidebar } from '../Shared/Sidebar';

export function InjectorProviders({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<PersistQueryClientProvider
				persistOptions={{
					persister: createSyncStoragePersister({
						storage: window.localStorage,
					}),
				}}
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								refetchOnWindowFocus: false,
								retry: false,
								cacheTime: 1000 * 60 * 60 * 24, // 24 hours
							},
						},
					})
				}
			>
				<DarkModeProvider>
					<TestProvider>
						<VerifyAuth />
						<Toaster position="top-right" />
						<div className="flex flex-col w-full h-screen">
							<Header />
							<div className="w-full flex h-screen">
								<Sidebar />
								<main className="flex-1 p-2 overflow-hidden">{children}</main>
							</div>
						</div>
					</TestProvider>
				</DarkModeProvider>
			</PersistQueryClientProvider>
		</BrowserRouter>
	);
}

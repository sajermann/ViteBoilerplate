import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { DarkModeProvider } from '~/hooks/useDarkMode';
import { TestProvider } from '~/hooks/useTest';
import { Header } from '../Header';

import '~/config/i18n';

export function InjectorProviders({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<DarkModeProvider>
				<TestProvider>
					<Header />
					{children}
				</TestProvider>
			</DarkModeProvider>
		</BrowserRouter>
	);
}

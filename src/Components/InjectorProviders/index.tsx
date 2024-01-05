import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from '../../Hooks/UseDarkMode';
import { TestProvider } from '../../Hooks/UseTest';
import { Header } from '../Header';

import '../../Config/i18n';

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

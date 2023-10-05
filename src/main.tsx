import React from 'react';
import ReactDOM from 'react-dom/client';
import { InjectorProviders } from './App/Shared/Components/InjectorProviders';
import { RoutesConfig } from './App/Shared/Components/Routes';
import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<InjectorProviders>
			<RoutesConfig />
		</InjectorProviders>
	</React.StrictMode>,
);

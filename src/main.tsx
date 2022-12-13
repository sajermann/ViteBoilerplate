import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesConfig } from './Components/Routes';
import { InjectorProviders } from './Components/InjectorProviders';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<InjectorProviders>
			<RoutesConfig />
		</InjectorProviders>
	</React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { InjectorProviders } from './Components/InjectorProviders';
import { RoutesConfig } from './Components/Routes';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<InjectorProviders>
			<RoutesConfig />
		</InjectorProviders>
	</React.StrictMode>,
);

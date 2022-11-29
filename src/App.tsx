import { BrowserRouter } from 'react-router-dom';
import Routes from './Pages/Routes';
import { Header } from './Components/Header';
import { DarkModeProvider } from './Hooks/UseDarkMode';
import { TestProvider } from './Hooks/UseTest';

function App() {
	return (
		<BrowserRouter>
			<DarkModeProvider>
				<TestProvider>
					<Header />
					<Routes />
				</TestProvider>
			</DarkModeProvider>
		</BrowserRouter>
	);
}

export default App;

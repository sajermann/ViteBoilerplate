import { BrowserRouter } from 'react-router-dom';
import Routes from './Pages/Routes';
import { Header } from './Components/Header';
import { DarkModeProvider } from './Hooks/UseDarkMode';

function App() {
	return (
		<BrowserRouter>
			<DarkModeProvider>
				<Header />
				<Routes />
			</DarkModeProvider>
		</BrowserRouter>
	);
}

export default App;

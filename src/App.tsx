import { BrowserRouter } from 'react-router-dom';
import Routes from './Pages/Routes';
import './App.css';
import { Header } from './Components/Header';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes />
		</BrowserRouter>
	);
}

export default App;

import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useMemo,
	useEffect,
} from 'react';

const IDENTIFIER = '@vite/boilerplate:darkMode';

type DarkModeContextType = {
	darkMode: boolean;
	toggleDarkMode: () => string;
};

const darkModeContextDefaultValues: DarkModeContextType =
	{} as DarkModeContextType;

const TestContext = createContext<DarkModeContextType>(
	darkModeContextDefaultValues
);

export function useTest() {
	return useContext(TestContext);
}

type Props = {
	children: ReactNode;
};

export function TestProvider({ children }: Props) {
	const [darkMode, setDarkMode] = useState(true);

	function handleChangeDom(darkModeNow: boolean) {
		const body = document.querySelector('html');
		if (!darkModeNow) {
			if (body) {
				body.classList.remove('dark');
			}
			return;
		}

		if (body) {
			body.classList.add('dark');
		}
	}

	function toggleDarkMode() {
		return 'Essa função veio do Hook';
	}

	useEffect(() => {
		const result = localStorage.getItem(IDENTIFIER);
		if (result) {
			setDarkMode(result === 'true');
			handleChangeDom(result === 'true');
		}
	}, []);

	const memoizedValue = useMemo(
		() => ({
			darkMode,
			toggleDarkMode,
		}),
		[darkMode]
	);

	return (
		<TestContext.Provider value={memoizedValue}>
			{children}
		</TestContext.Provider>
	);
}

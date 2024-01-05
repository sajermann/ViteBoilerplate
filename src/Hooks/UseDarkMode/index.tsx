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
	toggleDarkMode: () => void;
};

const darkModeContextDefaultValues: DarkModeContextType =
	{} as DarkModeContextType;

const DarkModeContext = createContext<DarkModeContextType>(
	darkModeContextDefaultValues
);

export function useDarkMode() {
	return useContext(DarkModeContext);
}

type Props = {
	children: ReactNode;
};

export function DarkModeProvider({ children }: Props) {
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
		localStorage.setItem(IDENTIFIER, String(!darkMode));
		setDarkMode(!darkMode);
		handleChangeDom(!darkMode);
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
		<DarkModeContext.Provider value={memoizedValue}>
			{children}
		</DarkModeContext.Provider>
	);
}

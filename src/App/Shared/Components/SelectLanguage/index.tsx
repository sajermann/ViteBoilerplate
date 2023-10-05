import { ChangeEvent, useState } from 'react';
import { useTranslation } from '../../Hooks/UseTranslation';

const LANGUAGES_LIST = [
	{ id: 'en', text: 'EN' },
	{ id: 'pt-BR', text: 'PT-BR' },
];

export function SelectLanguage() {
	const { changeLanguage, currentLanguage } = useTranslation();
	const [language, setLanguage] = useState(currentLanguage);

	function handleChangeLanguage(e: ChangeEvent<HTMLSelectElement>) {
		const { value } = e.target;
		setLanguage(value);
		changeLanguage(value);
	}

	return (
		<select
			data-testid="selectLanguage"
			className="bg-slate-600 rounded h-7 w-28 flex justify-between items-center"
			onChange={handleChangeLanguage}
			defaultValue={language}
		>
			{LANGUAGES_LIST.map(item => (
				<option value={item.id} key={item.id}>
					{item.text}
				</option>
			))}
		</select>
	);
}

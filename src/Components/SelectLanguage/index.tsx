import * as Select from '@radix-ui/react-select';
import { useState } from 'react';
import { useTranslation } from '../../Hooks/UseTranslation';

const LANGUAGES_LIST = [
	{ id: 'en', text: 'EN' },
	{ id: 'pt-BR', text: 'PT-BR' },
];

export function SelectLanguage() {
	const { changeLanguage, currentLanguage } = useTranslation();
	const [language, setLanguage] = useState(currentLanguage);

	function handleChangeLanguage(newLanguage: string) {
		setLanguage(newLanguage);
		changeLanguage(newLanguage);
	}

	return (
		<Select.Root
			onValueChange={handleChangeLanguage}
			value={language}
			defaultValue={language}
		>
			<Select.Trigger className="bg-slate-600 rounded h-7 w-28 flex justify-between items-center p-2">
				<Select.Value placeholder="Pick an option" className="m-auto">
					{LANGUAGES_LIST.find(item => item.id === language)?.text}
				</Select.Value>
				<Select.Icon />
			</Select.Trigger>

			<Select.Portal className="bg-slate-900 h-96 w-28">
				<Select.Content>
					<Select.ScrollUpButton />
					<Select.Viewport>
						{LANGUAGES_LIST.map(item => (
							<Select.Item value={item.id} key={item.id}>
								<Select.ItemText>{item.text}</Select.ItemText>
								<Select.ItemIndicator> ✔</Select.ItemIndicator>
							</Select.Item>
						))}

						<Select.Separator />
					</Select.Viewport>
					<Select.ScrollDownButton />
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}

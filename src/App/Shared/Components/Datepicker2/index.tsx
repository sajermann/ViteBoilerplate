/* eslint-disable import/no-extraneous-dependencies */
import { enUS, ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@radix-ui/react-popover';
import { managerClassNames } from '../../Utils/ManagerClassNames';
import 'react-day-picker/dist/style.css';
import style from './index.module.css';
import { Input } from '../Input';
import { useTranslation } from '../../Hooks/UseTranslation';

const LANGUAGE_OPTION = {
	'pt-BR': ptBR,
	en: enUS,
};

type Props = {
	value?: Date;
	onChange?: (data?: string) => void;
	inputProps?: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		error?: string;
	};
};

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
		font-size: 140%; 
    color:yellow;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

export function DatePicker({ value, onChange, inputProps, ...rest }: Props) {
	const { currentLanguage } = useTranslation();
	console.log({ rest, value });
	return (
		<>
			<style>{css}</style>

			<Popover>
				<PopoverTrigger>
					<Input
						inputProps={{
							...inputProps,
							readOnly: true,
							placeholder: 'dd/mm/aaaa',
						}}
					/>
					{/* <button
					type="button"
					className={managerClassNames(
						'w-[240px] pl-3 text-left font-normal',
						!value && 'text-muted-foreground',
					)}
				>
					{value ? (
						format(value as unknown as Date, 'PPP')
					) : (
						<span>Pick a date</span>
					)}
					<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
				</button> */}
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0 bg-slate-500 rounded-lg text-white p-4"
					align="start"
				>
					<DayPicker
						{...rest}
						locale={LANGUAGE_OPTION[currentLanguage as 'pt-BR' | 'en']}
						mode="single"
						selected={value}
						onSelect={e => {
							if (!onChange || !e) return;
							const t = new Intl.DateTimeFormat('pt-BR', {
								year: 'numeric',
								month: 'numeric',
								day: 'numeric',
								timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							}).format(new Date(e));
							console.log({ t });
							onChange(t);
						}}
						disabled={date =>
							date > new Date() || date < new Date('1900-01-01')
						}
						modifiersClassNames={{
							selected: 'my-selected',
							today: style.myToday,
						}}
					/>
				</PopoverContent>
			</Popover>
		</>
	);
}

import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Datepicker } from '~/App/Shared/Components/Datepicker';
import { Controller } from 'react-hook-form';
import { Select } from '~/App/Shared/Components/Select';
import { useSearch } from '../../Hooks/UseSearch';

const DEFAULT_OPTIONS = [
	{
		value: 'opened',
		label: 'Opened',
	},
	{
		value: 'closed',
		label: 'Closed',
	},
	{
		value: 'Analysi',
		label: 'Analysi',
	},
];

type Props = {
	onSubmitForm: (data: string) => void;
};

export function Search({ onSubmitForm }: Props) {
	const { translate } = useTranslation();
	const {
		register,
		handleSubmit,
		errors,
		setValue,
		getValues,
		reset,
		control,
	} = useSearch({
		onSubmitForm,
	});

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex gap-4 w-full">
				<Input
					inputProps={{
						placeholder: 'Buscar pelo Título',
						id: 'title',
						...register('title'),
					}}
					labelProps={{
						children: 'Título',
					}}
				/>

				<Controller
					errors={errors}
					control={control}
					register={{ ...register('createdAt') }}
					name="createdAt"
					required
					render={({ field: { onChange, onBlur, value, ref } }) => {
						console.log({ onChange, onBlur, value, ref });
						return (
							<Datepicker
								label={translate('CREATED_AT')}
								placeholder="dd/mm/yyyy"
								id="createdAt"
								onChange={e => onChange(e)}
								value={value}
							/>
						);
					}}
				/>

				<Controller
					errors={errors}
					control={control}
					register={{ ...register('status') }}
					name="status"
					required
					render={({ field: { onChange, onBlur, value, ref } }) => {
						console.log({ onChange, onBlur, value, ref });
						return (
							<Select
								label="Status"
								isSearchable={false}
								value={
									DEFAULT_OPTIONS.find(item => item.value === value)?.value
								}
								options={DEFAULT_OPTIONS}
								onChange={e => {
									onChange(e.target.value);
								}}
								id="status"
							/>
						);
					}}
				/>
			</div>

			<div className="flex w-full justify-end">
				<Button variant="Outlined" onClick={() => reset()}>
					Limpar
				</Button>
				<Button type="submit">Filtrar</Button>
			</div>
		</form>
	);
}

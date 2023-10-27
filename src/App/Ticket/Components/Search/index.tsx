import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Datepicker } from '~/App/Shared/Components/Datepicker';
import { Controller } from 'react-hook-form';
import { Select } from '~/App/Shared/Components/Select';
import { useSearch } from '../../Hooks/UseSearch';
import { CreateTicket } from '../CreateTicket';

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
	const { register, handleSubmit, reset, control } = useSearch({
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
					control={control}
					name="createdAt"
					render={({ field: { onChange, value } }) => (
						<Datepicker
							label={translate('CREATED_AT')}
							placeholder="dd/mm/yyyy"
							id="createdAt"
							onChange={e => onChange(e)}
							value={value}
						/>
					)}
				/>

				<Controller
					control={control}
					name="status"
					render={({ field: { onChange, value } }) => (
						<Select
							menuPosition="fixed"
							menuPortalTarget={document.body}
							label="Status"
							isSearchable={false}
							value={DEFAULT_OPTIONS.find(item => item.value === value)?.value}
							options={DEFAULT_OPTIONS}
							onChange={e => {
								onChange(e.target.value);
							}}
							id="status"
						/>
					)}
				/>
			</div>

			<div className="flex w-full justify-between">
				<div>
					<CreateTicket />
				</div>

				<div className="flex w-full justify-end">
					<Button
						variantType="outlined"
						colorStyle="primary"
						onClick={() => reset()}
					>
						{translate('CLEAR')}
					</Button>
					<Button type="submit">{translate('SEARCH')}</Button>
				</div>
			</div>
		</form>
	);
}

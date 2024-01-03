import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Datepicker } from '~/App/Shared/Components/Datepicker';
import { Controller } from 'react-hook-form';
import { Select } from '~/App/Shared/Components/Select';
import { ContainerInput } from '~/App/Shared/Components/ContainerInput';
import { Label } from '~/App/Shared/Components/Label';
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

type TProps = {
	onSubmitForm: (data: string) => void;
	disabledButtons?: boolean;
};

export function Search({ onSubmitForm, disabledButtons }: TProps) {
	const { translate } = useTranslation();
	const { register, handleSubmit, reset, control } = useSearch({
		onSubmitForm,
	});

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex gap-4 w-full">
				<ContainerInput>
					<Label htmlFor="title">{translate('TITLE')}</Label>
					<Input
						{...register('title')}
						placeholder={translate('SEARCH_BY_TITLE')}
						id="title"
					/>
				</ContainerInput>

				<ContainerInput className="w-64">
					<Label htmlFor="createdAt">{translate('CREATED_AT')}</Label>
					<Controller
						control={control}
						name="createdAt"
						render={({ field: { onChange, value } }) => (
							<Datepicker
								placeholder="dd/mm/yyyy"
								id="createdAt"
								onChange={e => onChange(e)}
								value={value}
							/>
						)}
					/>
				</ContainerInput>

				<ContainerInput>
					<Label htmlFor="status">Status</Label>
					<Controller
						control={control}
						name="status"
						render={({ field: { onChange, value } }) => (
							<Select
								menuPosition="fixed"
								menuPortalTarget={document.body}
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
						)}
					/>
				</ContainerInput>
			</div>

			<div className="flex w-full justify-between">
				<div>
					<CreateTicket />
				</div>

				<div className="flex w-full justify-end gap-2">
					<Button
						disabled={disabledButtons}
						variant="outlined"
						colorStyle="primary"
						onClick={() => reset()}
					>
						{translate('CLEAR')}
					</Button>
					<Button disabled={disabledButtons} type="submit">
						{translate('SEARCH')}
					</Button>
				</div>
			</div>
		</form>
	);
}

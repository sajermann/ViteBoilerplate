import { Button } from '~/App/Shared/Components/Button';
import { Datepicker } from '~/App/Shared/Components/Datepicker';
import { Input } from '~/App/Shared/Components/Input';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useSearch } from '../../Hooks/UseSearch';

type Props = {
	onChange: (data: string) => void;
};

export function Search({ onChange }: Props) {
	const { translate } = useTranslation();
	const { register, handleSubmit, errors } = useSearch({ onChange });
	console.log({ errors });
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
				<Datepicker
					{...register('createdAt')}
					label={translate('CREATED_AT')}
					placeholder="dd/mm/yyyy"
					id="createdAt"
				/>
			</div>

			<div className="flex w-full justify-end">
				<Button variant="Outlined">Limpar</Button>
				<Button type="submit">Filtrar</Button>
			</div>
		</form>
	);
}

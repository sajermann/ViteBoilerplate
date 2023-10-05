import { Button } from '~/App/Shared/Components/Button';
import { Datepicker } from '~/App/Shared/Components/Datepicker';
import { Input } from '~/App/Shared/Components/Input';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';

export function Search() {
	const { translate } = useTranslation();
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Input
					inputProps={{
						placeholder: 'Buscar pelo Título',
						id: 'title',
					}}
					labelProps={{
						children: 'Título',
					}}
				/>
				<Datepicker
					label={translate('CREATED_AT')}
					placeholder="dd/mm/yyyy"
					id="createdAt"
				/>
			</div>

			<div className="flex w-full justify-end">
				<Button variant="Outlined">Limpar</Button>
				<Button>Filtrar</Button>
			</div>
		</div>
	);
}

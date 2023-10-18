/* eslint-disable react/no-unstable-nested-components */

import { Input } from '~/App/Shared/Components/Input';

export function TicketCreatePage() {
	return (
		<form>
			<Input
				inputProps={{
					placeholder: 'Buscar pelo Título',
					id: 'title',
					// ...register('title'),
				}}
				labelProps={{
					children: 'Título',
				}}
			/>
		</form>
	);
}

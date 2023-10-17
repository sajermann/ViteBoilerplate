import { useState } from 'react';
import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { Modal } from '~/App/Shared/Components/Modal';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useTicketCreate } from '../../Hooks/UseTicketCreate';

export function CreateTicket() {
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const { register, handleSubmit, errors } = useTicketCreate();

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>{translate('NEW')}</Button>

			<Modal
				title={translate('CREATE_TICKET')}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				closeButton
			>
				<form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 w-96">
					<Input
						inputProps={{
							placeholder: translate('TITLE_OF_TICKET'),
							id: 'title_create',
							error: errors.title?.message,
							...register('title'),
						}}
						labelProps={{
							children: translate('TITLE'),
						}}
					/>
					<Input
						inputProps={{
							placeholder: translate('DESCRIPTION_OF_TICKET'),
							id: 'description',
							error: errors.description?.message,
							...register('description'),
						}}
						labelProps={{
							children: translate('DESCRIPTION'),
						}}
					/>

					<div className="flex gap-4 justify-end">
						<Button variant="Outlined">{translate('CANCEL')}</Button>
						<Button type="submit">{translate('CREATE')}</Button>
					</div>
				</form>
			</Modal>
		</>
	);
}

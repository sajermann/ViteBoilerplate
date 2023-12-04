import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { Modal } from '~/App/Shared/Components/Modal';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { ContainerInput } from '~/App/Shared/Components/ContainerInput';
import { Label } from '~/App/Shared/Components/Label';
import { ErrorsInput } from '~/App/Shared/Components/ErrorsInput';
import { useTicketCreate } from '../../Hooks/UseTicketCreate';

export function UploadAttachments() {
	const { translate } = useTranslation();
	const { register, handleSubmit, errors, modalIsOpen, closeModal, openModal } =
		useTicketCreate();

	return (
		<>
			<Button onClick={openModal} type="button" variant="option">
				{translate('ATTACHMENTS')}
			</Button>

			<Modal
				title={translate('CREATE_TICKET')}
				isOpen={modalIsOpen}
				onClose={closeModal}
				closeButton
			>
				<form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 w-96">
					<ContainerInput>
						<Label htmlFor="title_create" isError={!!errors.title?.message}>
							{translate('TITLE_OF_TICKET')}
						</Label>
						<Input
							{...register('title')}
							placeholder={translate('TITLE_OF_TICKET')}
							id="title_create"
							iserror={!!errors.title?.message}
						/>
						<ErrorsInput
							errors={
								errors.title?.message ? [errors.title?.message] : undefined
							}
						/>
					</ContainerInput>

					<ContainerInput>
						<Label
							htmlFor="description"
							isError={!!errors.description?.message}
						>
							{translate('DESCRIPTION_OF_TICKET')}
						</Label>
						<Input
							{...register('description')}
							placeholder={translate('DESCRIPTION_OF_TICKET')}
							id="description"
							iserror={!!errors.description?.message}
						/>
						<ErrorsInput
							errors={
								errors.description?.message
									? [errors.description?.message]
									: undefined
							}
						/>
					</ContainerInput>

					<div className="flex gap-4 justify-end">
						<Button
							variant="outlined"
							colorStyle="primary"
							onClick={closeModal}
							type="button"
						>
							{translate('CANCEL')}
						</Button>
						<Button type="submit">{translate('CREATE')}</Button>
					</div>
				</form>
			</Modal>
		</>
	);
}

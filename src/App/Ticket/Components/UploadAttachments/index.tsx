import { Button } from '~/App/Shared/Components/Button';
import { Modal } from '~/App/Shared/Components/Modal';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { useCallback } from 'react';
import { delay } from '~/App/Shared/Utils/Delay';
import { useMessage } from '../../Hooks/UseMessage';
import { AttachmentsList } from '../AttachmentsList';
import { useAttachments } from '../../Hooks/UseAttachments';

type TProps = {
	onSaveFiles: (data: FileWithPath[]) => void;
};

export function UploadAttachments({ onSaveFiles }: TProps) {
	const { translate } = useTranslation();
	const { files, setFiles, handleRemoveFile } = useAttachments();
	const { modalAttachmentsIsOpen, closeModal, openModal } = useMessage();

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFiles([...files, ...acceptedFiles]);
		},
		[files],
	);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'application/pdf': [],
		},
		onDrop,
	});

	return (
		<>
			<Button onClick={openModal} type="button" variant="option">
				{translate('ATTACHMENTS')}
			</Button>

			<Modal
				title={translate('ATTACHMENTS')}
				isOpen={modalAttachmentsIsOpen}
				onClose={closeModal}
				closeButton
			>
				<div className="p-4 flex flex-col gap-4 max-w-[30rem]">
					<div
						{...getRootProps({ className: 'border' })}
						className="border border-dashed p-4 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors duration-500"
					>
						<input {...getInputProps()} />
						<p>{translate('MESSAGE_DRAG_AND_DROP')}</p>
						<em>{translate('FILES_ACCEPTED')}</em>
					</div>

					<AttachmentsList files={files} onRemove={handleRemoveFile} />

					<div className="flex gap-4 justify-end">
						<Button
							variant="outlined"
							colorStyle="primary"
							onClick={closeModal}
							type="button"
						>
							{translate('CANCEL')}
						</Button>
						<Button
							type="button"
							disabled={files.length === 0}
							onClick={async () => {
								onSaveFiles(files);
								closeModal();
								await delay(300);
								setFiles([]);
							}}
						>
							{translate('SAVE')}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}

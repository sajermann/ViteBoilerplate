import { FileWithPath } from 'react-dropzone';
import { Button } from '~/App/Shared/Components/Button';
import { Icons } from '~/App/Shared/Components/Icons';

export function AttachmentsList({
	files,
	onRemove,
}: {
	files: FileWithPath[];
	onRemove: (data: FileWithPath) => void;
}) {
	if (files.length < 1) return null;
	return (
		<ul className="border border-dashed p-4 rounded-xl flex gap-4 flex-wrap">
			{files.map((file: FileWithPath) => (
				<li
					className="border border-dashed flex gap-4 p-4 items-center rounded-xl"
					key={file.path}
				>
					<em className="text-sm flex gap-4 items-center hover:text-blue-500 transition-colors duration-500">
						{file.path}
					</em>
					<Button
						type="button"
						className="w-8 h-8"
						variant="option"
						iconButton="rounded"
						onClick={() => onRemove(file)}
						endIcon={<Icons nameIcon="close" />}
					/>
				</li>
			))}
		</ul>
	);
}

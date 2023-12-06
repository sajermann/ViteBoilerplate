import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';

export function useAttachments() {
	const [files, setFiles] = useState<FileWithPath[]>([]);

	function handleRemoveFile(file: FileWithPath) {
		const newFiles = [...files];
		newFiles.splice(newFiles.indexOf(file), 1);
		setFiles(newFiles);
	}

	return {
		files,
		setFiles,
		handleRemoveFile,
	};
}

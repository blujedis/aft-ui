import type { fileInput } from './config';

export type FileInputVariant = keyof typeof fileInput;

export type FileInputReaderType = 'text' | 'url' | 'binary' | 'buffer';

export type FileInputProps = {
	name?: string;
	readAs?: FileInputReaderType;
	onFormData?: (data: FormData | null, files: FileList) => void;
	onReadFiles?: (
		err: Error | null,
		result: null | (string | ArrayBuffer | null)[],
		files: FileList
	) => void;
};

export const fileInputDefaults: Partial<FileInputProps> = {
	name: 'file',
	readAs: 'url'
};

import { ButtonProps } from '../Button';
import { EmptyProps } from '../Empty';

export type FileInputReaderType = 'text' | 'url' | 'binary' | 'buffer';

export type FileInputControllerProps = {
	name?: string;
	readAs?: FileInputReaderType;
	onFormData?: (data: FormData | null, files: FileList) => void;
	onReadFiles?: (
		err: Error | null,
		result: null | (string | ArrayBuffer | null)[],
		files: FileList
	) => void;
};


export type FileInputFieldProps = ButtonProps & FileInputControllerProps & {
	//
}

export type FileInputDropProps = EmptyProps & FileInputControllerProps & {
	//
}



export const fileInputControllerDefaults: Partial<FileInputProps> = {
	name: 'file',
	readAs: 'url'
};

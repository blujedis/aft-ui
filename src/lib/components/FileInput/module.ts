import type { ElementProps, InputProps, ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, TypeOrValue } from '$lib';
import { type ButtonProps } from '../Button';
import { type EmptyProps } from '../Empty';

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

type PickedProps = 'disabled' | 'dropshadowed' | 'focused' | 'full' | 'hovered' | 'rounded' | 'shadowed' | 'size' | 'theme';

export type FileInputMode = 'button' | 'field' | 'dropzone';

export type FileInputCommonProps<M extends FileInputMode = 'field'> = Pick<ButtonProps<'button'>, PickedProps> & {
	mode?: M
	droppable?: boolean;
	dropTheme?: TypeOrValue<ThemeColor>; // them color or hex/rgb/hsl.
	onFiles?: (err: Error | null, files: FileList, data?: null | (string | ArrayBuffer | null)[]) => void;
}

export type FileInputButtonProps<M extends FileInputMode> = FileInputControllerProps & FileInputCommonProps<M> & {
	variant: ButtonProps<'button'>['variant'];
}

export type FileInputFieldProps<M extends FileInputMode> = FileInputControllerProps & FileInputCommonProps<M> & ElementProps<'button'> & {
	variant: InputProps['variant']
}

export type FileInputProps<M extends FileInputMode> = ElementProps<'input'> &
	M extends 'button' | 'dropzone'
	? FileInputButtonProps<M>
	: M extends 'field'
	? FileInputFieldProps<M>
	: never;

export const fileInputControllerDefaults: Partial<FileInputControllerProps> = {
	name: 'file',
	readAs: 'url'
};

export const fileInputDefaults: Partial<FileInputProps<'field'>> = {
	mode:'field'
}


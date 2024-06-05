export type FileInputReaderType = 'text' | 'url' | 'binary' | 'buffer';
export type FileInputProps = {
    name?: string;
    readAs?: FileInputReaderType;
    state?: 0 | 1 | 2 | 3;
    onFormData?: (err: Error | null, data: FormData | null, files: FileList) => void | boolean | Promise<boolean>;
    onReadFiles?: (err: Error | null, data: null | (string | ArrayBuffer | null)[], files: FileList) => void | boolean | Promise<boolean>;
};
export declare const fileInputDefaults: Partial<FileInputProps>;

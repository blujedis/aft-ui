export type FileInputReaderType = 'text' | 'url' | 'binary' | 'buffer';
export type FileInputProps = {
    name?: string;
    readAs?: FileInputReaderType;
    onFormData?: (err: Error | null, data: FormData | null, files: FileList) => any;
    onReadFiles?: (err: Error | null, data: null | (string | ArrayBuffer | null)[], files: FileList) => any;
};
export declare const fileInputDefaults: Partial<FileInputProps>;

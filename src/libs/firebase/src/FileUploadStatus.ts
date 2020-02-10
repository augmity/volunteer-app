export interface FileUploadStatus {
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  uri?: string;
  errorMsg?: string;
  error?: any;
}

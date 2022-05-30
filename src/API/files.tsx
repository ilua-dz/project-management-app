// import { baseURL, requestAPI, Methods, IUserData } from './dependencies';

interface IFile {
  taskId: string;
  file: BinaryData;
}

// const baseFileUrl = `${baseURL}/file`;

export async function downloadFile(token: string, data: IFile) {
  console.log(token, data);
  //some logic
}

export async function uploadFile(token: string, taskId: string, fileName: string) {
  console.log(token, taskId, fileName);
  //some logic
}

interface IRequest {
  URL: string;
  options: Partial<RequestInit>;
}

export interface IUserData {
  name: string;
  login: string;
  id: string;
  password: string;
}

export enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

export const baseURL = `https://pm-app-serv.herokuapp.com/`;

export async function requestAPI<T>({
  URL,
  options
}: IRequest): Promise<T | undefined | void | Error> {
  try {
    const response = await fetch(URL, options);
    if (response.status >= 400) {
      return Promise.reject(await response.json());
    }
    if (response.status === 204) {
      return Promise.resolve();
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return Promise.reject(ErrorHandler(e as Error));
    }
  }
}

// function statusError(status: number){
//   //undefined logic
// }

export function ErrorHandler(e: Error) {
  console.log(e);
  //undefined logic
}

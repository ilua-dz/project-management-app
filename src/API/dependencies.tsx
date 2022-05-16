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
    if (response.status < 200 || response.status > 299) {
      return Promise.reject(response.json());
    }
    const data = await response.json();
    return new Promise((resolve) => resolve(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Promise((resolve, reject) => reject(ErrorHandler(e as Error)));
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

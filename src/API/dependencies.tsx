interface IRequest{
  URL: string;
  headers: Partial<RequestInit>
}

export enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export const baseURL = `https://pm-app-serv.herokuapp.com/`;



async function statusCheck<T extends Response>(response: T){
  if(response.status !== 200){
    statusError(response.status);
    Promise.reject(response);
  }
  Promise.resolve(await response.json());
}


export async function requestAPI({URL, headers}: IRequest){
try{
  const response = await fetch(URL, headers);
  if(response.status !== 200){
    Promise.reject(statusError(response.status));
  }
  const data = await response.json();
  Promise.resolve(data);
}catch(e: unknown){
  if(e instanceof Error){
    ErrorHandler(e.message);
  }
}
}

function statusError(status: number){
  //undefined logic
}

export function ErrorHandler(err: string){
  //undefined logic
}
import { requestAPI, Methods } from "./dependencies";
import { boardsBaseURL } from "./boards";

export interface ITask{
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export async function getTask(token: string, boardId: string, columnId: string, taskId?: string){
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/${taskId? taskId : ''}`;
  const options = {
    method: Methods.get,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask | ITask[]>({URL, options});
  return data;
}

export async function createTask(token: string, boardId: string, columnId: string, task: ITask){
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks}`;
  const options = {
    method: Methods.post,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task})
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask>({URL: boardsBaseURL, options});
  return data;
}

export async function deleteTask(token: string, boardId: string, columnId: string, taskId: string){
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks/${taskId}`;
  const options = {
    method: Methods.delete,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  } as Partial<RequestInit>;
  const data = await requestAPI({URL: boardsBaseURL, options});
  return data;
}

export async function updateTask(token: string, boardId: string, columnId: string, taskId: string, task: ITask){
  const URL = `${boardsBaseURL}${boardId}/columns/${columnId}/tasks/${taskId}`;
  const options = {
    method: Methods.put,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task);
  } as Partial<RequestInit>;
  const data = await requestAPI<ITask>({URL: boardsBaseURL, options});
  return data;
}


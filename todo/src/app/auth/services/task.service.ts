import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task';

const baseUrl = `${environment.apiUrl}/task`;

@Injectable({ providedIn: 'root' })

export class TaskService {
    constructor(private http: HttpClient) { }

    getTasksForList(idList: number) {
        return this.http.get<Task[]>((`${baseUrl}/GetTasksForList${idList}`));
    }

    getTask(idTask: number) {
        return this.http.get<Task>(`${baseUrl}/GetTask${idTask}`);
    }

    createTaskForList(idList: number, params) {
        return this.http.post(`${baseUrl}/createTaskForList${idList}`, params);
    }
    
    updateTask(params) {
        return this.http.put(`${baseUrl}/UpdateTask`, params);
    }
    
}
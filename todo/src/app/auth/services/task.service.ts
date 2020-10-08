import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/task`;

@Injectable({ providedIn: 'root' })

export class TaskService {
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    getTasksForList(idList: number): Observable<Task[]> {
        let params = new HttpParams();
        params = params.append('idList', idList.toString());
        return this.http.get<Task[]>(`${baseUrl}/GetTasksForList`, { params: params })
                        .pipe(retry(1), catchError(this.handleError));
    }

    // getTasksForUser(userId: string): Observable<Task[]> {
    //     let params = new HttpParams();
    //     params = params.append('userId', userId.toString());
    //     return this.http.get<Task[]>(`${baseUrl}/GetTasksForUser`, { params: params })
    //                     .pipe(retry(1), catchError(this.handleError));
    // }

    getTasksDetail(userId: string, idList : number) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('idList', idList.toString());
        return this.http.get<Task[]>(`${baseUrl}/GetTasksDetail`, { params: params })
    }

    getTask(idTask: number): Observable<Task> {
        let params = new HttpParams();
        params = params.append('idTask', idTask.toString());
        return this.http.get<Task>(`${baseUrl}/GetTask`, { params: params })
                        .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      }
    
}
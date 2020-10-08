import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { List } from 'src/app/models/list';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/list`;

@Injectable({ providedIn: 'root' })

export class ListService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getListsForUser(userId: string): Observable<List[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http
      .get<List[]>(`${baseUrl}/GetListsForUser`, { params: params })
      .pipe(retry(1), catchError(this.handleError));
  }

  getListForUser(userId: string, listId: number) {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('listId', listId.toString());
    return this.http.get<List>(`${baseUrl}/GetListForUser`, { params: params });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

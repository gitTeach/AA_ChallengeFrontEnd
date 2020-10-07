import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { List } from 'src/app/models/list';

const baseUrl = `${environment.apiUrl}/list`;

@Injectable({ providedIn: 'root' })

export class ListService {
    constructor(private http: HttpClient) { }

    getListsForUser(userId: string) {
        return this.http.get<List[]>((`${baseUrl}/GetListsForUser${userId}`));
    }

    getListForUser(userId: string, listId: number) {
        
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('listId', listId.toString());
        return this.http.get<List>(`${baseUrl}/GetListForUser`, { params: params });
    }

}
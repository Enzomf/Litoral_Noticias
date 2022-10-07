import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  constructor(private http: HttpClient) {}

  url: string = `${environment.baseUrl}/notice`;

  getNotices(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  setNotice(data: any) {
    return this.http.post(`${this.url}/add`, data);
  }

  getLoggedWritterNotices():Observable<any>{
    return this.http.get<any>(`${this.url}/mynotices`)
  }
  
  deleteNotice(id:number){
    return this.http.delete(`${this.url}/delete/${id}`)
  }
}

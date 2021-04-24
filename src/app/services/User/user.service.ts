import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const ITEM_KEY = "UpdateStats";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  config = "http://localhost:3000/";
  constructor(
    private http: HttpClient,
  ) { }
  
  getCars(query): Observable<any> {
    return this.http.get<any>(`${this.config}getCar/${query}`)
  }

  postCar(data): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.config}postCar`,data);
  }
}

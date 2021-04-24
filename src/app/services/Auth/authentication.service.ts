import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/i-user';

const ITEM_KEY = "User"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirected = false;
  Authentic: boolean;
  user: IUser;
  private _storage: Storage | null = null;
  configUrl = "http://localhost:3000/";
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  constructor(private storage: Storage, private router: Router, public platform: Platform, private http: HttpClient) {
    this.init();
    this.getReady();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getReady() {
    await this.storage.get('currentUser').then(async (user) => {
      this.currentUserSubject = await new BehaviorSubject<IUser>(JSON.parse(user));
      this.currentUser = await this.currentUserSubject.asObservable();
    }).catch(() => {
      this.currentUserSubject = new BehaviorSubject(null);
      this.currentUser = this.currentUserSubject.asObservable();
    })
  }

  public get currentUserValue(): IUser {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
  }

  signUp(data):Observable<any>{
    return this.http.post<any>(`${this.configUrl}signup`, data)
   }

  signIn(mobile: number, password: string): Observable<any> {
    return this.http.post(`${this.configUrl}login`, { mobile, password }).pipe(
      map((log: any) => {
        // store user details and jwt token in local storage to keep user logged in       
        const user = { ...log };
        console.log(user);
        this.storage.set('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    )
  }

  saveUser(user) {
    this.currentUserSubject.next(user);
    this.storage.set('currentUser', JSON.stringify(user));
  }

  logout() {
    // remove user from local storage to log user out
    // this.http.delete(`${this.configUrl}users/logout`).subscribe();
    this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}

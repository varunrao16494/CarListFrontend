import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { retry, catchError, tap, retryWhen, delay, map, finalize } from 'rxjs/operators';

import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../Auth/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  constructor(
    private authSer:AuthenticationService,
    private alertController: AlertController,
    private injector: Injector,
    private modalController: ModalController
    ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(request)
    .pipe(
      retryWhen(err=>{
        let retries = 1;
        return err.pipe(
          delay(1000),
          map(error=>{
            if (retries++ === 3) {
              throw error;
            }
            return error;
          })
        )
      }),
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        // console.log(error)
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
             
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: Sorry for the Inconvenience, Please try after some time.`;
          if (error.status == 0) {
            this.presentAlertFailed('There\'s some problem with server. Sorry for the inconvenience. Please try after some time!')                
          }else  if (error.status === 401) {
            // auto logout if 401 response returned from api
          this.presentAlertFailed('Please login');
           this.authSer.logout();
           this.modalController.dismiss();
        }else{
          this.presentAlertFailed(errorMessage)
        }
        }
        // console.log(errorMessage);
        return throwError(errorMessage);
      })
    )
}

async presentAlertFailed(msg) {
  const alert = await this.alertController.create({
    header: 'Sorry',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}
}

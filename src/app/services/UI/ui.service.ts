import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController) { }

    async presentAlert(msg:string,title?:string,subTitle?:string) {
      const alert = await this.alertController.create({
        header: title,
        subHeader: subTitle,
        message: msg,
        buttons: ['OK']
      });
    
      await alert.present();
    }
  
    async presentToast(msg:string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  }

import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CarFormComponent } from '../car-form/car-form.component';
import { AuthenticationService } from '../services/Auth/authentication.service';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cars = [];
  color:string;
  type:string;
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private userSer:UserService,
    private authSer:AuthenticationService
  ) {}

  ngOnInit(){
    this.getCars();
  }

  async getCars() {
    const loading = await this.loadingController.create({
      message: 'Fetching',
      spinner: 'circular'
    });
    await loading.present();
    this.userSer.getCars(JSON.stringify({color:this.color,type:this.type})).subscribe({
      next:m=>{
        console.log(m);
        this.cars = m;
        loading.dismiss();
      },
      error:err=>{
        loading.dismiss();
      }
    })
  }

  async createCar() {
    const modal = await this.modalController.create({
    component: CarFormComponent,
    });
  
    await modal.present();
  
  }

  logout(){
    this.authSer.logout();
  }

}

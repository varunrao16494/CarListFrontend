import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  carform:FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private userSer:UserService,
  ) { }

  ngOnInit() {
    this.carform = this.fb.group({
      manufacturer :['',Validators.required],
      name:['',Validators.required],
      type:['',Validators.required],
      color:['',Validators.required],
    })
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Saving',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(this.carform.value);
    this.userSer.postCar(this.carform.value).subscribe({
      next:m=>{
        console.log(m);
        loading.dismiss();
        this.dismiss();
      },
      error:err=>{
        loading.dismiss();
      }
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }

}

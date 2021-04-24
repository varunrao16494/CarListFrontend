import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { UIService } from 'src/app/services/UI/ui.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authSer:AuthenticationService,
    private ui:UIService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      mobile:['',Validators.required],
      password:['',[Validators.required]]
    })
  }


 async onSubmit(){
    const loading = await this.loadingController.create({
      spinner: 'circular',
      translucent: true,
    });
    await loading.present();
    this.authSer.signIn(this.loginForm.value.mobile,this.loginForm.value.password).
    subscribe({
      next:m=>{
        loading.dismiss();
        this.ui.presentToast('Logged In Successfully')
        this.router.navigate(['/home'])
      },
      error:error=>{
        loading.dismiss();
      }
    })
  }

}

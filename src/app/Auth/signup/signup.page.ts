import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { UIService } from 'src/app/services/UI/ui.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formErrors;
  signupForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authSer:AuthenticationService,
    private ui:UIService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      mobile:['',Validators.required],
      password:['',Validators.required]
    })
  }

  async onSubmit(){
    const loading = await this.loadingController.create({
      message: 'Creating Account',
      spinner: 'circular'
    });
    await loading.present();

    this.authSer.signUp(this.signupForm.value).subscribe({
      next: m=>{
        console.log(m);
        loading.dismiss();
        this.ui.presentToast('Account Created')
        this.router.navigate(['/login'])
      },
      error:error=>{
        loading.dismiss();
      }
    })
  }

}

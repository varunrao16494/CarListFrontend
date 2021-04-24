import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/Auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authSer:AuthenticationService,
    private router:Router,
  ) {
    this.authSer.getReady().then(()=>{
      if(this.authSer.currentUserValue){
        this.router.navigate(['/home'])
      }
    })
  }
}

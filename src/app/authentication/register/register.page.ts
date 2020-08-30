import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  user: User = {
    uid: '',
    fullName: '',
    email: ''
  };

  password = '';

  constructor(
    private router: Router,
    private fireauth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  addUser() {
    this.fireauth.createUserWithEmailAndPassword(this.user.email, this.password).then((res) => {
      this.sendVerificationMail().then(() => {
        res.user.updateProfile({ displayName: this.user.fullName });
        this.router.navigateByUrl('/authentication');
      })
    }, error => {
      console.log(error);
    });
  }

  sendVerificationMail() {
    return this.fireauth.currentUser.then(
      currentUser => {
        currentUser.sendEmailVerification();
      });
  }

}

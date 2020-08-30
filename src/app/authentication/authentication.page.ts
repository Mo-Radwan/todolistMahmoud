import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  email = '';
  password = '';
  currentUser: firebase.User;

  constructor(
    private router: Router,
    private userService: UserService,
    private fireauth: AngularFireAuth
    ) { }

  ngOnInit() {
  }

  eLogin() {
    console.log('eLogin');
    this.fireauth.signInWithEmailAndPassword(this.email, this.password).then(
      (res) => {
      console.log(res);
      if (res.user.emailVerified !== true) {
        this.sendVerificationMail();
      } else {
        const tempUser: User = {
          uid: res.user.uid,
          fullName: res.user.displayName,
          email: res.user.email
        };
        this.savingUser(tempUser).then(
          () => {
            this.router.navigateByUrl('/lists');
          });
      }
    }, error => {
      console.log(error);
    });
  }


  sendVerificationMail() {
    console.log('sendVerificationMail');
    return this.fireauth.currentUser.then(
      currentUser => {
        currentUser.sendEmailVerification();
      });
  }

  savingUser(usertoSave: User) {
    console.log('savingUser');
    return this.userService.getUser(usertoSave.uid).then(fetchedUSer => {
      if (!fetchedUSer) {
        this.userService.addUser(usertoSave);
      }
    },
      error => {
        console.log(error);
      });
  }

  register(){
    this.router.navigateByUrl("/register");
  }

}

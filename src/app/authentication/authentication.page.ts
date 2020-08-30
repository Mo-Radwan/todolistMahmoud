import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.model';
import 'firebase/auth';
import { auth } from 'firebase';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

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
    private fireauth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus
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

  async gLogin() {
    if( this.platform.is('mobile') ) {
      try {
        const gplusUser = await this.googlePlus.login({
          'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': 'xXXXXXXXXXXXXXXXX.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        });
  
        this.fireauth.signInWithCredential(
          auth.GoogleAuthProvider.credential(gplusUser.idToken)
        ).then(
          userData => {
            if (userData) {
              const tempUser: User = {
                uid: userData.user.uid,
                fullName: userData.user.displayName,
                email: userData.user.email
              };
              this.savingUser(tempUser).then(
                () => {
                  this.router.navigateByUrl('/lists');
                });
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log('Native google login available on phone only');
    }
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

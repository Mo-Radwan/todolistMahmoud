import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { UserService } from 'src/app/service/user.service';
import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/service/list.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharinglist.component.html',
  styleUrls: ['./sharinglist.component.scss'],
})
export class SharinglistComponent implements OnInit, OnDestroy {

  @Input() treatedList: List;
  //managing
  usersSubscription: Subscription;
  users: User[] = [];
  //inputs
  userEmail = '';
  userRole = '';
  //autorisation
  sharingAutorisation = false;

  constructor(private modalController: ModalController,
    private userService: UserService,
    private todoslistService: ListService,
    private fireauth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.usersSubscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.fireauth.currentUser.then(
      currentUser => {
        this.sharingAutorisation = this.treatedList.owner == currentUser.email;
      }
    );
  }

  onClose() {
    this.modalController.dismiss();
  }

  onDelete(userEmailToDel: string, role: string) {
    if (role == 'reader') {
      const arr = this.treatedList.Readers.filter(userEmail => userEmail != userEmailToDel);
      this.treatedList.Readers = arr;
    } else if (role == 'writer') {
      const arr = this.treatedList.Writers.filter(userEmail => userEmail != userEmailToDel);
      this.treatedList.Writers = arr;
    }
    this.todoslistService.updateList(this.treatedList).then(
      () => {
        console.log('Delete OK');
      }, () => {
        console.log('Delete KO');
      });
  }

  shareWith() {
    const userToAssign = this.getUserByMail(this.userEmail);

    if (userToAssign) {
      if (this.userRole == 'writer') {
        if (this.treatedList.Readers.find(email => email === userToAssign.email)) {
          console.log('delete this user from readers first');
          return;
        } else if (this.treatedList.Writers.find(email => email === userToAssign.email)) {
          console.log('This user is already a writer');
          return;
        } else {
          this.treatedList.Writers.push(userToAssign.email);
        }
      } else if (this.userRole == 'reader') {
        if (this.treatedList.Writers.find(email => email === userToAssign.email)) {
          console.log('delete this user from writers first');
          return;
        } else if (this.treatedList.Writers.find(email => email === userToAssign.email)) {
          console.log('This user is already a reader');
          return;
        } else {
          this.treatedList.Readers.push(userToAssign.email);
        }
      }

      this.todoslistService.updateList(this.treatedList).then(
        () => {
          console.log('User Added successfully');
        }, () => {
          console.log('Error can\'t Add this user');
        });

    } else {
      console.log('Error User does not exist');
    }
  }

  getUserByMail(email: string) {
    return this.users.find(user => {
      return user.email == email;
    });
  }

  ngOnDestroy() {
    if(this.usersSubscription){
      this.usersSubscription.unsubscribe();
    }
  }

}

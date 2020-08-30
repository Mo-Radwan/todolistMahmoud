import { Component } from '@angular/core';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { combineLatest, Subscription } from 'rxjs';
import { ListService } from '../service/list.service';
import { List } from '../shared/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss'],
})
export class ListsPage {
  private Subscription: Subscription;
  lists: List[] = [];

  constructor(
    private router: Router,
    private listService: ListService,
    private fireauth: AngularFireAuth,
  ) {}

  ionViewWillEnter() {
    this.fireauth.currentUser.then(
      currentUser => {
        this.Subscription = combineLatest(
          this.listService.getOwnerList(currentUser.email),
          this.listService.getAllowedToReadList(currentUser.email),
          this.listService.getAllowedToWriteList(currentUser.email)
        ).subscribe(
          data => {
            this.lists = data[0].concat(data[1], data[2]);
          });
      });
  }

  onAdd() {
    this.router.navigateByUrl('/lists/addlist');
  }

  ionViewWillLeave() {
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  
}

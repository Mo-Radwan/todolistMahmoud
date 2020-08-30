import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/service/list.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.page.html',
  styleUrls: ['./addlist.page.scss'],
})
export class AddlistPage implements OnInit {

  list: List = {
    title: "",
    body: "",
    owner: "",
    Readers: [],
    Writers: []
  }

  constructor(
    private listService: ListService,
    private router: Router,
    private fireauth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.fireauth.currentUser.then(
      currentUser => {
        this.list.owner = currentUser.email;
      });
  }

  addList() {
    console.log('addList');
    this.listService.addList(this.list).then(
      () => {
        console.log('Done adding..');
        this.router.navigate(['lists']);
      });
  }

}

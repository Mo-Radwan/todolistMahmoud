import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/list.model';

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

  constructor() { }

  ngOnInit() {
  }

}

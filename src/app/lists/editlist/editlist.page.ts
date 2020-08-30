import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/service/list.service';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.page.html',
  styleUrls: ['./editlist.page.scss'],
})
export class EditlistPage implements OnInit {

  list$: Observable<List>;
  subscription: Subscription;
  list: List = {
    id: '',
    title: '',
    body: '',
    owner: '',
    Readers: [],
    Writers: []
  };

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.list$ = this.listService.getList(this.route.snapshot.paramMap.get('listId'));

    this.subscription = this.list$.subscribe(data => {
      this.list = data;
    });
  }

  editList() {
    this.listService.updateList(this.list).then(
      () => {
        this.router.navigate(['lists', this.list.id]);
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}

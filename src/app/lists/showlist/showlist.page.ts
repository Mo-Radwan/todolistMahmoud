import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/shared/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { List } from 'src/app/shared/list.model';
import { User } from 'src/app/shared/user.model';
import { ListService } from 'src/app/service/list.service';
import { SharinglistComponent } from '../sharelist/sharinglist.component';

@Component({
  selector: 'app-showlist',
  templateUrl: './showlist.page.html',
  styleUrls: ['./showlist.page.scss'],
})
export class ShowlistPage implements OnInit {

  list$: Observable<List>;
  item$: Observable<Array<Item>>;
  subscription: Subscription;
  list: List = {
    id: '',
    title: '',
    body: '',
    owner: '',
    Readers: [],
    Writers: []
  };
  listOwner: User = {
    uid: '',
    fullName: '',
    email: ''
  }
  isTodoLoaded = false;
  isWriteAutorisation = false;
  isDelAutorisation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private userService: UserService,
    private fireauth: AngularFireAuth,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.list$ = this.listService.getList(this.route.snapshot.paramMap.get('listId'));

    this.fireauth.currentUser.then(
      currentUser => {
        this.subscription = this.list$.subscribe(
          list => {
            if (list.title) {
              this.list = list;
              this.isTodoLoaded = true;
              this.isWriteAutorisation = this.list.Writers.includes(currentUser.email) ? true : false;
              this.isDelAutorisation = this.list.owner == currentUser.email;
              this.item$ = this.listService.getListItems(this.list.id);
              this.userService.getUserByEmail(list.owner).then(
                fetchedUser => {
                  this.listOwner = fetchedUser;
                });
            }
          });
      });
  }

  onDelete() {
    this.listService.deleteList(this.list).then(
      () => {
        console.log('Deleted List OK');
      }, error => {
        console.log(error);
      });
    this.router.navigateByUrl('/lits');
  }

  onShare() {
    this.modalController.create({
      component: SharinglistComponent,
      componentProps: { treatedTodoList: this.list }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  onDeleteItem(item: Item) {
    this.listService.deleteItem(this.list.id, item).then(
      () => {
        console.log('Delete Item OK');
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

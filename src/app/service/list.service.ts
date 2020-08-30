import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { List } from '../shared/list.model';
import { Observable } from 'rxjs';
import { Item } from '../shared/item.model';
import { map,take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {


  private ListCollection: AngularFirestoreCollection<List>;
  private List$: Observable<List[]>;

  constructor(private afs: AngularFirestore) {

    this.ListCollection = afs.collection<List>('list');

    this.List$ = this.ListCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  addList(List: List) {
    return this.ListCollection.add(List);
  }

  deleteList(List: List) {
    this.getListItems(List.id).pipe(take(1)).subscribe(
      fetchedItems => {
        fetchedItems.map(item => this.deleteItem(List.id,item));
      });
      return this.ListCollection.doc(List.id).delete();
  }

  updateList(List: List) {
    return this.ListCollection.doc(List.id)
      .set(
        {
          title: List.title,
          body: List.body,
          allowedToRead: List.Readers,
          allowedToWrite: List.Writers
        },
        {
          merge: true
        });
  }

  getLists() {
    return this.List$;
  }

  getList(id: string) {
    return this.ListCollection
      .doc<List>(id)
      .valueChanges()
      .pipe(
        map(data => {
          return { id, ...data };
        })
      );
  }

  getListItems(idl: string): Observable<Array<Item>> {
    return this.ListCollection
      .doc<List>(idl)
      .collection<Item>('items')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(data => {
          return data.map(dataEl => {
            return { idl, ...dataEl }
          });
        })
      );
  }

  getAllowedToReadList(userEmail: string) {
    return this.afs.collection<List>('list', ref => ref.where('Readers', 'array-contains', userEmail)).valueChanges({ idField: 'id' });
  }

  getAllowedToWriteList(userEmail: string) {
    return this.afs.collection<List>('list', ref => ref.where('Writers', 'array-contains', userEmail)).valueChanges({ idField: 'id' });
  }

  getOwnerList(userEmail: string) {
    return this.afs.collection<List>('list', ref => ref.where('owner', '==', userEmail)).valueChanges({ idField: 'id' });
  }

  addItem(ListId: string, item: Item) {
    return this.ListCollection.doc(ListId).collection('items').add(item);
  }

  deleteItem(ListId: string, item: Item) {
    return this.ListCollection.doc(ListId).collection('items').doc(item.id).delete();
  }

  updateItem(ListId: string, item: Item) {
    return this.ListCollection.doc(ListId).collection('items').doc(item.id)
      .set(
        {
          title: item.title,
          body: item.body,
          isDone: item.isDone
        },
        {
          merge: true
        });
  }

  getItem(ListId: string, itemId: string): Observable<Item> {
    return this.ListCollection
      .doc<List>(ListId)
      .collection('items')
      .doc<Item>(itemId)
      .valueChanges()
      .pipe(
        map(data => {
          return { id: itemId, idl: ListId, ...data };
        })
      );
  }

}

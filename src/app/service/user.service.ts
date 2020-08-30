import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private _usersCollection: AngularFirestoreCollection<User>;
  private _users$: Observable<User[]>;

  constructor(private db: AngularFirestore) {
    this._usersCollection = db.collection<User>('users');

    this._users$ = this._usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }
        );
      })
    );
  }

  getUsers(): Observable<Array<User>> {
    return this._users$;
  }

  addUser(user: User) {
    return this._usersCollection.add(user);
  }

  deleteUser(user: User) {
    return this._usersCollection.doc(user.id).delete();
  }

  getUser(uid: string): Promise<User> {
    return this._usersCollection.ref.where('uid', '==', uid).get().then(
      querySnapshot => {
        let tmpUser: User = null;
        querySnapshot.forEach(doc => {
          if (doc.data()) {
            tmpUser = doc.data() as User;
            tmpUser.id = doc.id;
          }
        });
        return tmpUser;
      },
      error => {
        throw error;
      }
    );
  }

  getUserByEmail(email: string): Promise<User> {
    return this._usersCollection.ref.where('email', '==', email).get().then(
      querySnapshot => {
        let tmpUser: User = null;
        querySnapshot.forEach(doc => {
          if (doc.data()) {
            tmpUser = doc.data() as User;
            tmpUser.id = doc.id;
          }
        });
        return tmpUser;
      },
      error => {
        throw error;
      }
    );
  }

  update(user: User) {
    return this._usersCollection.doc(user.id)
      .set(
        {
          id: user.id,
          uid: user.uid,
          fullName: user.fullName,
          email: user.email,
        },
        {
          merge: true
        });
  }
}

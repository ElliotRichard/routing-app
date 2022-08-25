import { Injectable } from '@angular/core';
// FireBase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IDog } from '../../shared/types';
@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  public authenticationStatus: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  // User credential
  private authToken;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  private getCollectionPath() {
    if (this.authToken.user.uid) {
      return `dogs/${this.authToken.user.uid}/dogs`;
    } else {
      console.log('No user signed in');
      return ``;
    }
  }

  signInUser(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (authToken) => {
        console.log('Sign in successful');
        this.authenticationStatus.next(true);
        this.authToken = authToken;
      },
      (error) => {
        console.log('sign in error', error);
      }
    );
  }

  signOutUser(): void {
    this.auth.signOut();
    this.authenticationStatus.next(false);
  }

  addDog(dog: IDog): void {
    this.getCollectionPath();
    this.firestore.collection(this.getCollectionPath()).doc(dog.name).set({
      address: dog.address,
      coordinates: dog.coordinates,
      owner: dog.owner,
      notes: dog.notes,
    });
  }

  deleteDog(dog: IDog): void {
    this.firestore.collection(this.getCollectionPath()).doc(dog.name).delete();
  }

  getUserCollection(): Observable<any> {
    console.log('Fetching with', `dogs/${this.authToken.user.uid}/dogs`);
    const userCollection = this.firestore.collection(this.getCollectionPath());
    return userCollection.valueChanges({ idField: 'name' });
  }
}

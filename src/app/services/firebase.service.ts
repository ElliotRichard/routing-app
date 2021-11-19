import { Injectable } from '@angular/core';
// FireBase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IFireBaseDog } from '../types';
@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  // User credential
  authenticationStatus: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private authToken;
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

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
  }

  addDog(dog: IFireBaseDog): void {
    const dogs = `dogs/${this.authToken.user.uid}/dogs`;
    this.firestore.collection(dogs).doc(dog.name).set({
      address: dog.address,
      coordinates: dog.coordinates,
      owner: dog.owner,
      notes: dog.notes,
    });
  }

  getUserCollection(): Observable<any> {
    console.log('Fetching with', `dogs/${this.authToken.user.uid}/dogs`);
    const dogs = `dogs/${this.authToken.user.uid}/dogs`;
    const userCollection = this.firestore.collection(dogs);
    return userCollection.valueChanges({ idField: 'name' });
  }
}

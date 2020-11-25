import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  user$: Observable<User | undefined> = of({} as User);
  constructor(
    private readonly afs: AngularFirestore,
    private readonly translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr-FR');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('fr-FR');
  }
  docUser = (uid: string) => this.afs.doc<User>(`users/${uid}`);
  async loadUser(fu: firebase.User) {
    this.user$ = this.docUser(fu.uid).valueChanges();
    return this.docUser(fu.uid)
      .ref.get()
      .then((ds) => {
        const user: User = ds.exists
          ? (ds.data() as User)
          : {
              uid: fu.uid,
              email: fu.email,
              displayName: fu.displayName,
              locale: 'fr-FR',
              phoneNumber: fu.phoneNumber,
              photoURL: fu.photoURL,
            };
        user.authenticated = true;
        user.lastActivityDate = new Date();
        ds.ref.set(user, { merge: true });

        return user;
      });
  }
}

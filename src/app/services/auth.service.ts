import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: User;

  constructor(public afs: AngularFirestore, public afu: AngularFireAuth) {
    this.afu.authState.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afu.auth
      .signInWithPopup(provider)
      .then(result => {
        this.SetUserData(result.user);
      })
      .catch(error => {
        console.error(error);
      });
  }

  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afu.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.userData = null;
    });
  }
}

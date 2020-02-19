import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { take } from "rxjs/operators";
import { User } from "firebase";
declare var M: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isLoggedin: Boolean;
  userComponent: any;
  constructor(private as: AuthService) {}

  ngOnInit() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
    this.authState();
  }

  title = "ZettaByte Angular";
  routes: any[] = [
    {
      name: "Task One",
      path: "/",
      desc: "NPC - Beginner Merchant"
    },
    {
      name: "Task Two",
      path: "/task-two",
      desc: "The Playlists - Intermediate"
    },
    {
      name: "Task Three",
      path: "/task-three",
      desc: "Linusu Tech Shop - Advance"
    }
  ];

  authState() {
    return this.as.authState().subscribe(user => {
      user ? (this.isLoggedin = true) : (this.isLoggedin = false);
      const getUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      this.userComponent = getUser;
      console.log(this.userComponent);
    });
  }

  signOut() {
    return this.as.SignOut().then(() => {
      this.as.authState().subscribe(user => {
        this.isLoggedin = false;
        this.userComponent = user;
      });
    });
  }

  signIn() {
    return this.as.GoogleAuth().then(() => {
      this.isLoggedin = true;
      this.as.authState().subscribe(user => {
        this.isLoggedin = true;
        const getUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        this.userComponent = getUser;
      });
    });
  }
}

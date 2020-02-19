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
    this.as.getUser().subscribe(uFromService => {
      uFromService ? this.as.authState(true) : this.as.authState(false);
      console.log(uFromService);
      if (uFromService) {
        const getUser = {
          uid: uFromService.uid,
          email: uFromService.email,
          displayName: uFromService.displayName,
          photoURL: uFromService.photoURL,
          emailVerified: uFromService.emailVerified
        };
        this.userComponent = getUser;
      }
    });
  }

  signOut() {
    return this.as.SignOut().then(() => {
      this.as.authState(false);
      this.as.getUser().subscribe(user => (this.userComponent = user));
    });
  }

  signIn() {
    this.as.GoogleAuth().then(() => this.as.authState(true));
  }
}

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ZettaByte Angular";
  routes: any[] = [
    {
      name: "Task One",
      path: "/"
    },
    {
      name: "Task Two",
      path: "/task-two"
    },
    {
      name: "Task Three",
      path: "/task-three"
    }
  ];
}

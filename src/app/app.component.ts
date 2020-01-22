import { Component, OnInit } from "@angular/core";
declare var M: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ZettaByte Angular";
  routes: any[] = [
    {
      name: "Task One",
      path: "/"
    },
    {
      name: "Task Two",
      path: "/task-two"
    }
  ];
  ngOnInit() {
    M.toast({
      html: `<i class="material-icons left">info_outline</i>Scroll to bottom of the page, to view cart section`,
      classes: "rounded yellow lighten-1 grey-text text-darken-4",
      displayLength: 6000,
      inDuration: 500,
      outDuration: 750
    });
  }
}

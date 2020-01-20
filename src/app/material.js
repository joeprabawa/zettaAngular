document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);

  var sides = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(sides, { edge: "right" });
});

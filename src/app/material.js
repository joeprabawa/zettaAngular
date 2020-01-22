document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);

  var modal = document.querySelectorAll(".modal");
  var modalInit = M.Modal.init(modal);
});

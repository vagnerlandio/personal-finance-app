$(() => {
  $('.settings').addClass('active');
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
});

$("#clear-data").click(function() {
  localStorage.clear;
  alert("All data has been successfully cleaned!");
});

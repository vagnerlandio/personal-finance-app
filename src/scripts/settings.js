$(document).ready(function(){
  $('.settings').addClass('active');
  $('.collapsible').collapsible();
});

$("#clear-data").click(function() {
  localStorage.clear;
  alert("All data has been successfully cleaned!");
});
$("#import-categories").on('click', function (){
  $.getJSON('default_categories.json', function(json) {
    localStorage.setItem("expenses", JSON.stringify(json.expenses));
    localStorage.setItem("incomes", JSON.stringify(json.incomes));
    localStorage.setItem("accounts", JSON.stringify(json.accounts));
    alert("Categories imported successfully!")
  });
});

$(() => {
  $('.settings').addClass('active');
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
});

$("#clear-data").click(function() {
  localStorage.clear;
  alert("All data has been successfully cleaned!");
});
$("#import-categories").on('click', function (){
  $.getJSON('res/default_categories.json', function(json) {
    localStorage.setItem("expenses", JSON.stringify(json.expenses));
    localStorage.setItem("incomes", JSON.stringify(json.incomes));
    localStorage.setItem("accounts", JSON.stringify(json.accounts));
    alert("Categories imported successfully!")
  });
});

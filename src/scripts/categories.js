$(document).ready(function(){
  $('.categories').addClass('active');
  $('.tabs').tabs({swipeable: true});
  loadCategories();
  $('.dropdown-trigger').dropdown();
  $('.tabs-content.carousel.carousel-slider').css("height","auto");
});

function loadCategories() {
  var expenses = JSON.parse(localStorage.getItem('expenses'));
  var incomes = JSON.parse(localStorage.getItem('incomes'));
  var accounts = JSON.parse(localStorage.getItem('accounts'));

  $.each(expenses, function(index, value) {
    createCollectionItem(index, value, "expenses");
  });
  $.each(incomes, function(index, value) {
    createCollectionItem(index, value, "incomes");
  });
  $.each(accounts, function(index, value) {
    createCollectionItem(index, value, "accounts");
  });
}

var index_category = 0;

function createCollectionItem(index, value, insertInTo) {
  // Creating list
  var item = $('<li>', {class: "collection-item"});
  var item_name = $('<div>').text(value);
  var item_dropdown = $('<a>', {class: "secondary-content dropdown-trigger"})
    .attr({'href': '#!', 'data-target': 'dropdown-' + index_category})
  var item_icon = $('<i>', {class: "material-icons"}).text("more_vert");
  item_dropdown.append(item_icon)
  item_name.append(item_dropdown)
  item.append(item_name)
  $("#" + insertInTo + "-page .collection").append(item);

  //Creating dropdown menu
  var dropdown_content = $('<ul>', {id: "dropdown-" + index_category, class: "dropdown-content"});
  var li_edit = $('<li>').append($('<a>').attr('href', '#!').text("Edit"));
  var li_delete = $('<li>').append($('<a>').attr('href', '#!').text("Delete"));
  $('main').append(dropdown_content)
  $('#dropdown-' + index_category).append(li_edit);
  $('#dropdown-' + index_category).append(li_delete);

  index_category++;
}

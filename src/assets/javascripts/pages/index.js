$(() => {
  $('.overview').addClass('active');
  selectCategory();
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled: false,
  });
  $('.modal').modal();
  $('.datepicker').datepicker();
  updateDate();
});

function selectCategory() {
  var accounts = JSON.parse(localStorage.getItem('accounts'));
  $.each(accounts, (index, value) => {
    $('#account-category').append(new Option(value, value.toLowerCase().split(' ').join('_')));
  });
}

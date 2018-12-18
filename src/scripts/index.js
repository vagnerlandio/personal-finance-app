$(document).ready(function() {
  $('.overview').addClass('active');
  selectCategory();
  $('select').formSelect();
  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled: false
  });
  $('.modal').modal();
  updateDate();
  $("#prev-month").on('click', function(event) {
    event.preventDefault();
    prevMonth();
  });
  $("#next-month").on('click', function(event) {
    event.preventDefault();
    nextMonth();
  });
});

// Change month
var today = new Date();
var month = today.getMonth() + 1; //January is 0!
var year = today.getFullYear();
var currentMonth = month,
  currentYear = year;
var months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

function updateDate() {
  $("#current-month").text(months[currentMonth]);
  $("#current-year").text(currentYear);
}

function prevMonth() {
  if (currentMonth > 1) {
    currentMonth--
  } else {
    currentMonth = 12;
    currentYear--;
  }
  updateDate();
  $('main').fadeOut(150, () => $('main').fadeToggle(150));
}

function nextMonth() {
  if (currentMonth < 12) {
    currentMonth++
  } else {
    currentMonth = 1;
    currentYear++;
  }
  updateDate();
  $('main').fadeOut(150, () => $('main').fadeToggle(150));
}

function selectCategory() {
  var accounts = JSON.parse(localStorage.getItem('accounts'));
  $.each(accounts, function(index, value) {
    $("#account-category").append(new Option(value, value.toLowerCase().split(" ").join("_")));
  });
}

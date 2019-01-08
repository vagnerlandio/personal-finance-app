$(() => {
  $('.sidenav').sidenav();

  // Format currencies
  $('.currency-input').maskMoney({
    prefix: '$ ',
    allowNegative: true,
    thousands: ',',
    decimal: '.',
    affixesStay: false,
  });
  $('#prev-month').on('click', (event) => {
    event.preventDefault();
    prevMonth();
  });
  $('#next-month').on('click', (event) => {
    event.preventDefault();
    nextMonth();
  });
});

// Change month
var today = new Date();
var month = today.getMonth() + 1; //January is 0!
var year = today.getFullYear();
var currentMonth = month;
var currentYear = year;
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
  12: 'December',
};
var monthsAbbr = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

function updateDate() {
  if (currentYear === year) {
    $('#current-month').text(months[currentMonth]);
  } else {
    $('#current-month').text(monthsAbbr[currentMonth]);
    $('#current-year').text(currentYear);
  }
}

function prevMonth() {
  if (currentMonth > 1) {
    currentMonth--;
  } else {
    currentMonth = 12;
    currentYear--;
  }

  updateDate();
  $('main').fadeOut(150, () => $('main').fadeToggle(150));
}

function nextMonth() {
  if (currentMonth < 12) {
    currentMonth++;
  } else {
    currentMonth = 1;
    currentYear++;
  }

  updateDate();
  $('main').fadeOut(150, () => $('main').fadeToggle(150));
}

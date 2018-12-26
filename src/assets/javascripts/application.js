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
};

function updateDate() {
  $("#current-month").text(months[currentMonth]);
  $("#current-year").text(currentYear);
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
    currentMonth++
  } else {
    currentMonth = 1;
    currentYear++;
  }
  updateDate();
  $('main').fadeOut(150, () => $('main').fadeToggle(150));
}

// Create database
// var entries = new IDBStore({
//   dbVersion: 1,
//   storeName: 'entry',
//   keyPath: 'id',
//   autoIncrement: true,
//   onStoreReady: () => {
//     console.log('Entry ready!');
//   }
// });

// CREATE
// entries.put({
//   description: 'Enel - Energia',
//   amount: 45.00,
//   idPaid: false
//   }, function(id){
//     console.log('Yeah, dude inserted! insertId is: ' + id);
//   }, function(error){
//     console.log('Oh noes, sth went wrong!', error);
//   }
// );

// READ
// entries.get(1,
//   function(data){
//     console.log('here is our dude:', data);
//   }, function(error){
//   console.log('Oh noes, sth went wrong!', error);
//   }
// );
//
// // UPDATE
// entries.put({
//   id: 1,
//   description: 'Enel - Energia',
//   amount: 45.00,
//   idPaid: true
//   }, function(id){
//     console.log('Yeah, dude updated! id still is: ' + id);
//   }, function(error){
//     console.log('Oh noes, sth went wrong!', error);
//   }
// );

// DELETE
// entries.remove(3,
//   function(result){
//     if(result !== false){
//       console.log('deletion successful!');
//     }
//   },
//   function(error){
//     console.log('Oh noes, sth went wrong!', error);
//   }
// );

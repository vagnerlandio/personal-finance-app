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

// Chart.js
let ctx = document.getElementById('bar-chart-balance');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Income', 'Expense', 'Foreseen'],
    datasets: [{
      label: 'Total Balance',
      data: [10000, -5000, 5000],
      backgroundColor: [
        'rgba(31, 192, 143, 0.2)',
        'rgba(244, 85, 49, 0.2)',
        'rgba(255, 192, 68, 0.2)',
      ],
      borderColor: [
        'rgba(31, 192, 143, 1)',
        'rgba(244, 85, 49, 1)',
        'rgba(255, 192, 68, 1)',
      ],
      borderWidth: 3,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }]
    },
  },
});

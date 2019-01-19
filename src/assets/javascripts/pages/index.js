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
  updateBalance();
  loadAccountsIn('#income-account');
  loadAccountsIn('#expense-account');
});

let currentBalances = {
  total: 0,
  incomes: 0,
  expenses: 0,
  foreseen: 0,
};

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
    labels: ['Balance'],
    datasets: [{
      label: 'Income',
      data: [currentBalances.incomes],
      backgroundColor: [
        'rgba(31, 192, 143, 0.2)',
      ],
      borderColor: [
        'rgba(31, 192, 143, 1)',
      ],
      borderWidth: 3,
    },
    {
      label: 'Expense',
      data: [currentBalances.expenses],
      backgroundColor: [
        'rgba(244, 85, 49, 0.2)',
      ],
      borderColor: [
        'rgba(244, 85, 49, 1)',
      ],
      borderWidth: 3,
    },
    {
      label: 'Foreseen',
      data: [currentBalances.foreseen],
      backgroundColor: [
        'rgba(12, 146, 210, 0.2)',
      ],
      borderColor: [
        'rgba(12, 146, 210, 1)',
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

function updateBalance() {
  $('#total-balance-value').text('$' + currentBalances.total.toFixed(2));
  $('span#income').text('$' + currentBalances.incomes.toFixed(2));
  $('span#expense').text('$' + currentBalances.expenses.toFixed(2));
  $('span#foreseen').text('$' + currentBalances.foreseen.toFixed(2));
}

// INCOMES
$(() => {
  loadIncomeCategories();
});

function cleanIncomeForm() {
  $('#income-description').val('');
  $('#income-amount').val('');
  $('#income-due-date').val('');
  $('#income-status').attr('checked', false);
}

function loadIncomeCategories() {
  let categories = JSON.parse(localStorage.getItem('incomes'));

  $.each(categories, (index, value) => {
    $('#income-category').append(new Option(value, value.toLowerCase()));
  });

  $('select').formSelect();
}

// Create
function createIncome(description, amount, dueDate, status, category, account) {
  if (arguments[0] === undefined) {
    arguments[0] = $('#income-description').val();
  }

  if (arguments[1] === undefined) {
    arguments[1] = $('#income-amount').val();
  }

  if (arguments[2] === undefined) {
    arguments[2] = $('#income-due-date').val();
  }

  if (arguments[3] === undefined) {
    arguments[3] = $('#income-status').is(':checked');
  }

  if (arguments[4] === undefined) {
    arguments[4] = $('#income-category').find(':selected').text();
  }

  if (arguments[5] === undefined) {
    arguments[5] = $('#income-account').find(':selected').text();
  }


  dbIncomes.put({
    _id: new Date().toJSON(),
    description: arguments[0],
    amount: arguments[1],
    due_date: arguments[2],
    status: arguments[3],
    category: arguments[4],
    account: arguments[5],
  }).then(function (response) {
    cleanIncomeForm();
    M.toast({ html: 'Income created with successus!' });
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

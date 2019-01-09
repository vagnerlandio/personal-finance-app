// INCOMES
function cleanIncomeForm() {
  $('#income-description').val('');
  $('#income-amount').val('');
  $('#income-due-date').val('');
  $('#income-status').attr('checked', false);
}

// Create
function createIncome() {
  dbIncomes.put({
    _id: new Date().toJSON(),
    description: $('#income-description').val(),
    amount: $('#income-amount').val(),
    due_date: $('#income-due-date').val(),
    status: $('#income-status').is(':checked'),
    category: $('#income-category').find(':selected').text(),
    account: $('#income-account').find(':selected').text(),
  }).then(function (response) {
    alert('Income "' + response.id + '" created with successus!');
    cleanIncomeForm();
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

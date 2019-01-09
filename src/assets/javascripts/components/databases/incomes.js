// INCOMES
// Create
function createIncome() {
  dbIncomes.put({
    description: $('#income-description').val(),
    amount: $('#income-amount').val(),
    due_date: $('#income-due-date').val(),
    status: $('#income-status').is(':checked'),
    category: $('#income-category').find(':selected').text(),
    account: $('#income-account').find(':selected').text(),
  }).then(function (response) {
    alert('Income "' + response.id + '" created with successus!');
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

// EXPENSES
function cleanExpenseForm() {
  $('#expense-description').val('');
  $('#expense-amount').val('');
  $('#expense-due-date').val('');
  $('#expense-status').attr('checked', false);
}

// Create
function createExpense() {
  dbExpenses.put({
    _id: new Date().toJSON(),
    description: $('#expense-description').val(),
    amount: $('#expense-amount').val(),
    due_date: $('#expense-due-date').val(),
    status: $('#expense-status').is(':checked'),
    category: $('#expense-category').find(':selected').text(),
    account: $('#expense-account').find(':selected').text(),
  }).then(function (response) {
    alert('Expense "' + response.id + '" created with successus!');
    cleanExpenseForm();
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

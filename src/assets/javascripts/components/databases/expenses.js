// EXPENSES
// Create
function createExpense() {
  dbExpenses.put({
    description: $('#expense-description').val(),
    amount: $('#expense-amount').val(),
    due_date: $('#expense-due-date').val(),
    status: $('#expense-status').is(':checked'),
    category: $('#expense-category').find(':selected').text(),
    account: $('#expense-account').find(':selected').text(),
  }).then(function (response) {
    alert('Expense "' + response.id + '" created with successus!');
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

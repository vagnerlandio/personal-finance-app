// EXPENSES
$(() => {
  loadExpenseCategories();
});

function cleanExpenseForm() {
  $('#expense-description').val('');
  $('#expense-amount').val('');
  $('#expense-due-date').val('');
  $('#expense-status').attr('checked', false);
}

function loadExpenseCategories() {
  let categories = JSON.parse(localStorage.getItem('expenses'));

  $.each(categories, (index, value) => {
    $('#expense-category').append(new Option(value, value.toLowerCase()));
  });

  $('select').formSelect();
}

// Create
function createExpense(description, amount, dueDate, status, category, account) {
  if (arguments[0] === undefined) $('#expense-description').val();
  if (arguments[1] === undefined) $('#expense-amount').val();
  if (arguments[2] === undefined) $('#expense-due-date').val();
  if (arguments[3] === undefined) $('#expense-status').is(':checked');
  if (arguments[4] === undefined) $('#expense-category').find(':selected').text();
  if (arguments[5] === undefined) $('#expense-account').find(':selected').text();

  dbExpenses.put({
    _id: new Date().toJSON(),
    description: arguments[0],
    amount: arguments[1],
    due_date: arguments[2],
    status: arguments[3],
    category: arguments[4],
    account: arguments[5],
  }).then(function (response) {
    cleanExpenseForm();
    M.toast({ html: 'Expense created with successus!' });
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

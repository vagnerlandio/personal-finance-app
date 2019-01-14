// ACCOUNTS
function cleanAccountForm() {
  $('#account-description').val('');
  $('#account-balance').val('');
}

// Create
function createAccount(description, openingBalance, category) {
  if (arguments[0] === undefined) $('#account-description').val();
  if (arguments[1] === undefined) $('#account-balance').val();
  if (arguments[2] === undefined) $('#account-category').find(':selected').text();

  dbAccounts.put({
    _id: new Date().toJSON(),
    description: arguments[0],
    opening_balance: arguments[1],
    category: arguments[2],
  }).then(function (response) {
    cleanAccountForm();
    M.toast({ html: 'Account created with successus!' });
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

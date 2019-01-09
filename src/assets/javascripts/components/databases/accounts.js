// ACCOUNTS
function cleanAccountForm() {
  $('#account-description').val('');
  $('#account-balance').val('');
}

// Create
function createAccount() {
  dbAccounts.put({
    _id: new Date().toJSON(),
    description: $('#account-description').val(),
    opening_balance: $('#account-balance').val(),
    category: $('#account-category').find(':selected').text(),
  }).then(function (response) {
    alert('Account "' + response.id + '" created with successus!');
    cleanAccountForm();
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

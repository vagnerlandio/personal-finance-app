// ACCOUNTS
// Create
function createAccount() {
  dbAccounts.put({
    description: $('#account-description').val(),
    opening_balance: $('#account-balance').val(),
    category: $('#account-category').find(':selected').text(),
  }).then(function (response) {
    alert('Account "' + response.id + '" created with successus!');
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

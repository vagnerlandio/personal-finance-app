// ACCOUNTS
let accountDescription = $('#account-description');
let accountBalance = $('#account-balance');
let accountCategory = $('#account-category');

// Create
function createAccount() {
  dbAccounts.put({
    '_id': accountDescription.val().toLowerCase(),
    'description': accountDescription.val(),
    'opening_balance': accountBalance.val(),
    'category': accountCategory.find(':selected').text(),
  }).then(function (response) {
    alert('Account "' + response.id + '" created with successus!');
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

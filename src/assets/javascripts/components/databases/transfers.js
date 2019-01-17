// TRANSFERS
function cleanTransferForm() {
  $('#transfer-description').val('');
  $('#transfer-amount').val('');
  $('#transfer-due-date').val('');
  $('#transfer-status').attr('checked', false);
}

// Create
function createTransfer(description, amount, dueDate, status, origin, destination) {
  if (arguments[0] === undefined) $('#transfer-description').val();
  if (arguments[1] === undefined) $('#transfer-amount').val();
  if (arguments[2] === undefined) $('#transfer-due-date').val();
  if (arguments[3] === undefined) $('#transfer-status').is(':checked');
  if (arguments[4] === undefined) $('#transfer-origin').find(':selected').text();
  if (arguments[5] === undefined) $('#transfer-destination').find(':selected').text();

  dbTransfers.put({
    _id: new Date().toJSON(),
    description: arguments[0],
    amount: arguments[1],
    due_date: arguments[2],
    status: arguments[3],
    origin: arguments[4],
    destination: arguments[5],
  }).then(function (response) {
    cleanTransferForm();
    M.toast({ html: 'Transfer created with successus!' });
  }).catch(function (err) {
    console.log(err);
  });
}

// Read
// loadAccountsIn('#transfer-origin');
// loadAccountsIn('#transfer-destination');

// Update

// Delete

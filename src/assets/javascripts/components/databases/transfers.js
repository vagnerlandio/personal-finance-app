// TRANSFERS
function cleanTransferForm() {
  $('#transfer-description').val('');
  $('#transfer-amount').val('');
  $('#transfer-due-date').val('');
  $('#transfer-status').attr('checked', false);
}

// Create
function createTransfer() {
  dbTransfers.put({
    _id: new Date().toJSON(),
    description: $('#transfer-description').val(),
    amount: $('#transfer-amount').val(),
    due_date: $('#transfer-due-date').val(),
    status: $('#transfer-status').is(':checked'),
    origin: $('#transfer-origin').find(':selected').text(),
    destination: $('#transfer-destination').find(':selected').text(),
  }).then(function (response) {
    alert('Transfer "' + response.id + '" created with successus!');
    cleanTransferForm();
  }).catch(function (err) {
    console.log(err);
  });
}

// Read

// Update

// Delete

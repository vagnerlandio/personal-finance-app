$(() => {
  $('.transactions').addClass('active');
  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled:false
  });
  updateDate();
  loadExpenses();
  loadIncomes();
  loadTransfers();
  $('.tabs').tabs({swipeable: true});
  $('#prev-month').on('click', function(event) {
    event.preventDefault();
    $('.collection-item').remove();
    loadExpenses();
    loadIncomes();
    loadTransfers();
  });
  $('#next-month').on('click', function(event) {
    event.preventDefault();
    $('.collection-item').remove();
    loadExpenses();
    loadIncomes();
    loadTransfers();
  });
});

function loadExpenses() {
  dbExpenses.allDocs({
    include_docs: true,
  }).then(function (result) {
    $.each(result.rows, function(index, el) {
      if (el.doc.description !== undefined) {
        if ((monthsAbbr[currentMonth] === el.doc.due_date.slice(0, 3)) & (el.doc.due_date.slice(-4) == currentYear)) {
          createTransactionCollectionItem(el.doc.description, el.doc.amount, el.doc.status, 'expenses');
        }
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function loadIncomes() {
  dbIncomes.allDocs({
    include_docs: true,
  }).then(function (result) {
    $.each(result.rows, function(index, el) {
      if (el.doc.description !== undefined) {
        if ((monthsAbbr[currentMonth] === el.doc.due_date.slice(0, 3)) & (el.doc.due_date.slice(-4) == currentYear)) {
          createTransactionCollectionItem(el.doc.description, el.doc.amount, el.doc.status, 'incomes');
        }
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function loadTransfers() {
  dbTransfers.allDocs({
    include_docs: true,
  }).then(function (result) {
    $.each(result.rows, function(index, el) {
      if (el.doc.description !== undefined) {
        if ((monthsAbbr[currentMonth] === el.doc.due_date.slice(0, 3)) & (el.doc.due_date.slice(-4) == currentYear)) {
          createTransactionCollectionItem(el.doc.description, el.doc.amount, el.doc.status, 'transfers');
        }
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function createTransactionCollectionItem(description, amount, status, transactionType) {
  let statusIcon;

  if (status) {
    statusIcon = 'close';
  } else {
    statusIcon = 'check';
  }

  let elem = `<li class="collection-item avatar">
    <i class="material-icons circle">${statusIcon}</i>
    <span class="title">${description}</span>
    <p>Amount: <span class="right">${amount}</span></p>
  </li>`;

  $('#' + transactionType + '-page > ul').append(elem);
}

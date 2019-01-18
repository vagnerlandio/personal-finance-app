$(() => {
  $('.transactions').addClass('active');
  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled:false
  });
  updateDate();
  loadExpenses();
  $('.tabs').tabs({swipeable: true});
  $('#prev-month').on('click', function(event) {
    event.preventDefault();
    $('.collection-item').remove();
    loadExpenses();
  });
  $('#next-month').on('click', function(event) {
    event.preventDefault();
    $('.collection-item').remove();
    loadExpenses();
  });
});

function loadExpenses() {
  dbExpenses.allDocs({
    include_docs: true,
  }).then(function (result) {
    $.each(result.rows, function(index, el) {
      if (el.doc.description !== undefined) {
        if ((monthsAbbr[currentMonth] === el.doc.due_date.slice(0, 3)) & (el.doc.due_date.slice(-4) == currentYear)) {
          createTransactionCollectionItem(el.doc.description, el.doc.amount, el.doc.status);
        }
      }
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function createTransactionCollectionItem(description, amount, status) {
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

  $('#expenses-page > ul').append(elem);
}

$(() => {
  $('.accounts').addClass('active');
  updateDate();
  createAndListAllAccounts();
});

function createAndListAllAccounts() {
  dbAccounts.allDocs({
    include_docs: true,
  }).then((result) => {
    $.each(result.rows, (index, el) => {
      createAccountCard(el.doc.description, el.doc.opening_balance.toFixed(2), el.doc.category, el.doc._id);
    });
    $('.dropdown-trigger').dropdown();
  }).catch((err) => {
    console.log(err);
  });
}

function createAccountCard(name, balance, category, id) {
  let badge = (balance >= 0 ? 'badge-in' : 'badge-out');
  let color = (balance >= 0 ? 'green' : 'red');
  let elem = `
    <div class="card">
      <div class="card-content">
        <span class="card-title">${name}
          <a class="dropdown-trigger right" href="#" data-target="${id}">
            <i class="material-icons right black-text">more_vert</i>
          </a>
        </span>
        <div class="current-balance"><b>Current Balance:</b>
          <span class="${badge} ${color} white-text right">$ ${balance}</span>
        </div>
      </div>
      <div class="card-action ${color}-text">${category}</div>
    </div>
    <ul class="dropdown-content" id="${id}">
      <li><a href="#!">Edit</a></li>
      <li><a href="#!">Delete</a></li>
    </ul>`;

  $('main .container').append(elem);
}

// $.each(result.rows, (index, el) => {
//   console.log(el.doc);
// });

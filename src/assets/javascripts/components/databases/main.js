// MAIN DATABASE SCRIPT
let dbAccounts = new PouchDB('accounts');
let dbExpenses = new PouchDB('expenses');
let dbIncomes = new PouchDB('incomes');
let dbTransfers = new PouchDB('transfers');

function loadAccountsIn(selector) {
  dbAccounts.allDocs({
    include_docs: true,
  }).then((result) => {
    $.each(result.rows, (index, el) => {
      $(selector).append(new Option(el.doc.description, el.doc.description.toLowerCase()));
    });
    $('select').formSelect();
  }).catch((err) => {
    console.log(err);
  });
}

let defaultCategories = {
  expenses: [
    'Others',
    'Car',
    'Clothing',
    'Food',
    'Health',
    'Home',
    'Leisure',
    'Payments',
    'School',
    'Services',
    'Transport',
  ],
  incomes: [
    'Others',
    'Benefits',
    'Commission',
    'Payments',
    'Recurring',
    'Sales',
    'Savings',
    'Services',
  ],
  accounts: [
    'Others',
    'Checking Account',
    'Savings Account',
    'Wallet',
  ],
};

function createDefaultCategories() {
  localStorage.setItem('expenses', JSON.stringify(defaultCategories.expenses));
  localStorage.setItem('incomes', JSON.stringify(defaultCategories.incomes));
  localStorage.setItem('accounts', JSON.stringify(defaultCategories.accounts));
  console.log('Categories imported successfully!');
}

window.onload = () => {
  if ('hasCodeRunBefore' in localStorage) {
    console.log('Content loaded from the database!');
  } else {
    createDefaultCategories();
    createDefaultAccounts();

    localStorage.setItem('hasCodeRunBefore', true);
    console.log('Content saved to the database!');
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.info('registered sw', reg))
    .catch(err => console.error('error registering sw', err));
}

$(document).ready(function(){
  $('.sidenav').sidenav();
  // Format currencies
  $('.currency-input').maskMoney({
    prefix:'$ ',
    allowNegative: true,
    thousands:',',
    decimal:'.',
    affixesStay: false
  });
});

// Create database
var entries = new IDBStore({
  dbVersion: 1,
  storeName: 'entry',
  keyPath: 'id',
  autoIncrement: true,
  onStoreReady: function(){
    console.log('Entry ready!');
  }
});

// CREATE
entries.put({
  description: 'Enel - Energia',
  amount: 45.00,
  idPaid: false
  }, function(id){
    console.log('Yeah, dude inserted! insertId is: ' + id);
  }, function(error){
    console.log('Oh noes, sth went wrong!', error);
  }
);

// READ
entries.get(1,
  function(data){
    console.log('here is our dude:', data);
  }, function(error){
  console.log('Oh noes, sth went wrong!', error);
  }
);

// UPDATE
entries.put({
  id: 1,
  description: 'Enel - Energia',
  amount: 45.00,
  idPaid: true
  }, function(id){
    console.log('Yeah, dude updated! id still is: ' + id);
  }, function(error){
    console.log('Oh noes, sth went wrong!', error);
  }
);

// DELETE
entries.remove(3,
  function(result){
    if(result !== false){
      console.log('deletion successful!');
    }
  },
  function(error){
    console.log('Oh noes, sth went wrong!', error);
  }
);

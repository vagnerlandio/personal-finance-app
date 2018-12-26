$(() => {
  $('.transactions').addClass('active');
  $('.fixed-action-btn').floatingActionButton({
    hoverEnabled:false
  });
  updateDate();
});

var Header = (function() {

  function headerLinkClicks(event) {
    event.preventDefault();
    var url = $(event.target).attr('href');
    $.ajax(url, { dataType: 'text' })
    .then(function(contents) {
      $modal.html(contents).show();
    });
  }

  function init() {
    var $controls = $('[rel="js-controls"]');
    $modal = $('[rel=\'js-modal\']');
    $controls.on('click', '[rel*=\'js-\']', headerLinkClicks);
  }

  EVENT.on('init', init);
  var $modal;

  return {
    init: init,
  };
})();


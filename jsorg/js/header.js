// put event handlers for header links here
$(document).ready(function() {
  var $controls = $('[rel="js-controls"]');
  $controls.on('click', "[rel*='js-']", function(event) {
    event.preventDefault();
    var url = $(event.target).attr('href');
    var $modal = $("[rel='js-modal']");

    $.ajax(url, {
      dataType: 'text'
    })
    .then(function(contents) {
      $modal.html(contents).show();
    });
  });
});

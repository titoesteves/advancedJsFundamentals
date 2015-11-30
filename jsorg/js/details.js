var Details = (function() {

  function loadPerson(ID) {
    $.ajax('details/' + ID + '.html', {dataType: 'text'}).then(function(contents) {
      $content.html(contents);
    });
  }

  function selectPerson(event) {
    event.preventDefault();
    var ID = $(event.target).attr('data-person');
    EVENT.emit('person-selected', ID);
  }

  function init() {
    $content = $('[rel=js-details]');
    $content.on('click', "[rel=js-select-person]", selectPerson);
    EVENT.on('person-selected', loadPerson);
  }

  var $content;
  EVENT.on('init', init);
  return {
    init: init,
    loadPerson: loadPerson
  };

})();


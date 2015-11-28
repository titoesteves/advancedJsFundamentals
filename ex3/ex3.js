

// copy in your "ex2.js" or "ex2-fixed.js" code
function NotesManager () {
  this.notes = [];
}

NotesManager.prototype.addNote = function(note){
    this.$('#notes').prepend(
    $('<a href=\'#\'></a>')
    .addClass('note')
    .text(note)
    );
};

NotesManager.prototype.addCurrentNote = function(){
  var current_note = this.$('#note').val();

  if (current_note) {
    this.notes.push(current_note);
    this.addNote(current_note);
    this.$('#note').val('');
  }
};

NotesManager.prototype.showHelp = function(){
  var self = this;
  self.$('#help').show();

  document.addEventListener('click', function __handler__(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    document.removeEventListener('click', __handler__, true);
    self.hideHelp();
  }, true);
};

NotesManager.prototype.hideHelp = function(){
    $('#help').hide();
};

NotesManager.prototype.handleOpenHelp = function(evt){
    if (!this.$('#help').is(':visible')) {
      evt.preventDefault();
      evt.stopPropagation();

      this.showHelp();
    }
  
};

NotesManager.prototype.handleAddNote = function(evt){
    this.addCurrentNote();
};

NotesManager.prototype.handleEnter = function(evt){
    if (evt.which == 13) {
      this.addCurrentNote();
    }
};

NotesManager.prototype.handleDocumentClick = function(evt){
    this.$('#notes').removeClass('active');
    this.$('#notes').children('.note').removeClass('highlighted');
  
};

NotesManager.prototype.handleNoteClick = function(evt){
    evt.preventDefault();
    evt.stopPropagation();

    this.$('#notes').addClass('active');
    this.$('#notes').children('.note').removeClass('highlighted');
    this.$(evt.target).addClass('highlighted');
  
};



  function init() {
    // build the initial list from the existing `notes` data
    var html = '';
    for (i = 0; i < notes.length; i++) {
      html += '<a href=\'#\' class=\'note\'>' + notes[i] + '</a>';
    }

    this.$('#notes').html(html);

    // listen to "help" button
    this.$('#open_help').bind('click', handleOpenHelp.bind(this));

    // listen to "add" button
    this.$('#add_note').bind('click', handleAddNote.bind(this));

    // listen for <enter> in text box
    this.$('#new_note').bind('keypress', handleEnter.bind(this));

    // listen for clicks outside the notes box
    this.$(document).bind('click', handleDocumentClick.bind(this));

    // listen for clicks on note elements
    this.$('#notes').on('click', '.note', handleNoteClick.bind(this));
  }

  function loadData(data) {
    notes = notes.concat(data);
  }

  var notes = [];

  var publicAPI = {
    init: init,
    loadData: loadData,
  };
  return publicAPI;


// assume this data came from the database
var notes = [
'This is the first note I\'ve taken!',
'Now is the time for all good men to come to the aid of their country.',
'The quick brown fox jumped over the moon.',
];
NotesManager.loadData(notes);


$(document).ready(NotesManager.init);

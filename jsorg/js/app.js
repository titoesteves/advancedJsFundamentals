window.EVENT = new EventEmitter2();
$(document).ready(function() {
  EVENT.emit('init');
});

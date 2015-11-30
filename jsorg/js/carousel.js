var Carousel = (function() {
  function scrollLeft(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position > 0) {
      position = Math.max(0, position - 250);
    }

    $items.css({ left: (-position) + 'px' });
  }

  function scrollRight(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position < maxPosition) {
      position = Math.min(maxPosition, position + 250);
    }

    $items.css({ left: (-position) + 'px' });
  }

  function clickPerson(event) {
    var ID = $(event.target).attr('rel').replace(/^.*(\d+)$/, '$1');
    EVENT.emit('person-selected', ID);
  }

  function init() {
    $content = $('[rel=js-carousel] > [rel=js-content]');
    $items = $content.children('[rel=js-items]');
    $left = $('[rel=js-carousel] > [rel=js-controls] > [rel=js-left]');
    $right = $('[rel=js-carousel] > [rel=js-controls] > [rel=js-right]');
    $items.on('click', '[rel^="js-item-"]', clickPerson);

    contentWidth = $content.width();
    itemsWidth = $items.width();
    position = 0;
    maxPosition = (itemsWidth - contentWidth);

    // attach click handlers for the `$left` and `$right` buttons,
    // that call the `scrollLeft(..)` and `scrollRight(..)` functions,
    // respectively
    $left.on('click', scrollLeft);
    $right.on('click', scrollRight);
  }

  var $content;
  var $items;
  var $left
  var $right;

  var contentWidth;
  var itemsWidth;
  var position;
  var maxPosition;

  EVENT.on('init', init);

  return {
    init: init,
  };
})();


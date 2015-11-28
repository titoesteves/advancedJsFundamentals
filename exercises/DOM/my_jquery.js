(function() {
  $ = function(selector) {
    // if this isnt correct
    // call new $(selector)
    if(!(this instanceof $)){
      return new $(selector);
    }
    var elements;
    if(typeof selector === 'string'){
      elements = document.querySelectorAll(selector);
    }
    else {
      elements = selector;
    }
    // [].push.apply(this, elements);
    for(var i = 0; i < elements.length; i++){
      this[i] = elements[i];
    }
    this.length = elements.length;
  };

  $.extend = function(target, object) {
    for(prop in object){
      if(object.hasOwnProperty(prop)){
        target[prop] = object[prop];
      }
    }
    return target;
  };

  // Static methods
  var isArrayLike = function(obj) {
    if(typeof obj.length === 'number'){
      if(obj.length === 0){
        return true;
      }
      else if(obj.length > 0){
        return (obj.length - 1) in obj;
      }
    }
  };

  $.extend($, {
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    each: function(collection, cb) {
      if(isArrayLike(collection)){
        for(var i = 0; i < collection.length; i++){
          var value = collection[i];
          cb.call(value, i, value);
        }
      }
      else{
        for(var prop in collection){
          if(collection.hasOwnProperty(prop)){
            var value = collection[prop];
            cb.call(value, prop, value);
          }
        }
      }
      return collection;
    },
    makeArray: function(arr) {
      var result = [];
      $.each(arr, function(i, value){
        result.push(value);
      });
      return result;
    },
    proxy: function(fn, context) {
      return function(){
        return fn.apply(context, arguments);
      };
    }
  });

  var getText = function(el){
    var text = '';
    $.each(el.childNodes, function(i, childNode){
      if(childNode.nodeType === 3) {
        text += childNode.nodeValue;
      }
      else if(childNode.nodeType === 1){
        text += getText(childNode);
      }
    });
    return text;
  };

  $.extend($.prototype, {
    html: function(newHtml) {
      if(arguments.length){
        // setting
        // go through each element in this
        // set innerHTML to newHtml
        $.each(this, function(i, el){
          el.innerHTML = newHtml;
        });
        return this;
      }
      else {
        // get this[0's] innerHTML
        return this[0].innerHTML;
      }
    },
    val: function(newVal) {
      if(arguments.length){
        $.each(this, function(i, el){
          el.value = newVal;
        });
        return this;
      }
      else {
        return this[0].value;
      }
    },
    text: function(newText) {
      if(arguments.length){
        this.html('');
        return $.each(this, function(i, el){
          var text = document.createTextNode(newText);
          el.appendChild(text);
        });
      }
      else{
        return this[0] && getText(this[0]);
      }
    },
    find: function(selector) {
      // create accumulator
      var elements = [];
      // for each item in collection
      $.each(this, function(i, el){
        // get elements that are within element that match selector
        var els = el.querySelectorAll(selector);
        // add them to accumulator
        [].push.apply(elements, els);
      });
      return $(elements);
    },
    next: function() {

    },
    prev: function() {},
    parent: function() {},
    children: function() {},
    attr: function(attrName, value) {},
    css: function(cssPropName, value) {},
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {},
    show: function() {},

    // Events
    bind: function(eventName, handler) {
      return $.each(this, function(i, el){
        el.addEventListener(eventName, handler, false);
      });
    },
    unbind: function(eventName, handler) {
      return $.each(this, function(i, el){
        el.removeEventListener(eventName, handler, false);
      })
    },
    has: function(selector) {
      var elements = [];
	
      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });
    
      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},

    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {}
  });

  $.buildFragment = function(html) {};
})();
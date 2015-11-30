// 05 Context
DOT = function(obj, prop) {
  if(obj.hasOwnProperty(prop)){
  	return obj[prop];
  }
  else if(obj.__proto__){
  	return DOT(obj.__proto__, prop);
  }
  return undefined;
};

// 05 Context
DOTCALL = function(obj, prop, args) {
  var fn = DOT(obj, prop);
  if(fn){
  	return fn.apply(obj, args);
  }
};

// 06 Prototypes
NEW = function(constructor, args) {
	var obj = {};
	obj.__proto__ = constructor.prototype;
	constructor.apply(obj, args);
	return obj;
};

INSTANCEOF = function(obj, constructor) {
	if(obj.__proto__ === constructor.prototype){
		return true;
	}
	else if(obj.__proto__){
		return INSTANCEOF(obj.__proto__, constructor);
	}
	return false;
};

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createElements (execlib) {
  'use strict';
  var lib = execlib.lib,
    lR = execlib.execSuite.libRegistry,
    applib = lR.get('allex_applib');
  
  require('./toggleelementcreator')(lib, applib);
}
module.exports = createElements;
},{"./toggleelementcreator":2}],2:[function(require,module,exports){
function createToggleElement (lib, applib) {
  'use strict';
  var WebElement = applib.getElementType('WebElement');

  function BootstrapToggleElement (id, options) {
    WebElement.call(this, id, options);
    this.checked = options.checked || false;
  }
  lib.inherit(BootstrapToggleElement, WebElement);
  BootstrapToggleElement.prototype.__cleanUp = function () {
    this.checked = null;
    WebElement.prototype.__cleanUp.call(this);
  };
  BootstrapToggleElement.prototype.doThejQueryCreation = function () {
    WebElement.prototype.doThejQueryCreation.call(this);
    if (this.$element && this.$element.length) {
      this.$element
      .bootstrapToggle('toggle')
      .on('change', this.onChanged.bind(this));
      this.onChanged(null);
    }
  };
  BootstrapToggleElement.prototype.get_checked = function () {
    return this.checked;
  };
  BootstrapToggleElement.prototype.set_checked = function (checked) {
    this.checked = checked;
    return true;
  };
  BootstrapToggleElement.prototype.set_enabled = function (enabled) {
    var ret = WebElement.prototype.set_enabled.call(this, enabled);
    if (!ret) {
      return ret;
    }
    if (this.$element) {
      this.$element.bootstrapToggle('update');
    }
    return ret;
  }

  BootstrapToggleElement.prototype.onChanged = function (evnt) {
    var a = this.$element.is(':checked');
    //console.log(this.id, 'checked', a);
    this.set('checked', this.$element.is(':checked'));
  };

  applib.registerElementType('BootstrapToggle', BootstrapToggleElement);
}
module.exports = createToggleElement;
},{}],3:[function(require,module,exports){
(function (execlib) {
  'use strict';

  require('./elements')(execlib);

})(ALLEX);

},{"./elements":1}]},{},[3]);

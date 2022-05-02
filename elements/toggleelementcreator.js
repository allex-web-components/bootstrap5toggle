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
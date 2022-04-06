function createElements (execlib) {
  'use strict';
  var lib = execlib.lib,
    lR = execlib.execSuite.libRegistry,
    applib = lR.get('allex_applib');
  
  require('./toggleelementcreator')(lib, applib);
}
module.exports = createElements;
// ==========================================================================
// Project:   DemoApp
// Copyright: ©2010 Robert Linton
// Contributors: Devin Torres, Kurt Williams
// ==========================================================================
/*globals DemoApp */

DemoApp.main = function main() {

  SCXIB.loadXibWithOptions(sc_static('MainPage.xib'), {
    namespace: DemoApp.NAMESPACE,
    callback: function () {
      var people = DemoApp.store.find(DemoApp.Person);
      DemoApp.demoController.set('people', people);
      DemoApp.getPath('mainPage.mainPane').append();
    }
  });

};

function main() { DemoApp.main(); }

// ==========================================================================
// Project:   DemoApp
// Copyright: ©2010 Robert Linton
// Contributors: Devin Torres, Kurt Williams
// ==========================================================================
/*globals DemoApp */

DemoApp = SC.Application.create({

  NAMESPACE: 'DemoApp',
  VERSION: '0.1.0',

  store: SC.Store.create().from(SC.Record.fixtures)

});

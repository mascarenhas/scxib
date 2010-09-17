// ==========================================================================
// Project:   DemoApp.Person
// Copyright: ©2010 Robert Linton
// Contributors: Devin Torres, Kurt Williams
// ==========================================================================
/*globals DemoApp */

DemoApp.Person = SC.Record.extend({

  // TODO: Add your own code here.
  name: function(){
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName').cacheable(),

}) ;

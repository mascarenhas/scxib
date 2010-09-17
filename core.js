// ==========================================================================
// Project:   SCXIB
// Copyright: ©2010 Robert Linton
// Contributors: Devin Torres, Kurt Williams
// ==========================================================================
/*globals SCXIB DOMParser XSLTProcessor */
/*jslint evil: true */

/** @namespace

  SCXIB allows you to load Interface Builder XIBs as SproutCore SC.Pages or
  SC.Panels.

  Example:

  {{{
    SCXIB.loadXibWithOptions(sc_static('MainPage.xib'), {
      namespace: MyApp.NAMESPACE,
      pageName: 'mainPage',
      callback: function () {
        MyApp.getPath('mainPage.mainPane').append();
      }
    });
  }}}

  @extends SC.Object
*/
SCXIB = SC.Object.create(
  /** @scope SCXIB.prototype */ {

  NAMESPACE: 'SCXIB',
  VERSION: '0.1.0',

  /**
    Fetches a document using SC.Request and parses it as XML.

    @param url {String} Location of the XML document.
    @returns {Document}
  */
  loadXmlDoc: function (url) {
    var parser = new DOMParser(), doc;
    SC.Request.getUrl(url).async(NO).notify(this, function (resp) {
      if (SC.$ok(resp)) {
        doc = parser.parseFromString(resp.rawRequest.responseText, 'text/xml');
      } else {
        SC.Logger.error('Could not fetch XML file "%@"'.fmt(url));
      }
    }).send();
    return doc;
  },

  /**
    Fetches a string for eval from an XSLT transformation of a XIB file.

    @param xibOptions {Array} An array of XIB file paths and opts.
    @param opts {Hash} A hash of opts for use during XSLT transformation.
    @returns {void}
  */
  loadXibsWithOptions: function (xibOptions) {
    var self = this,
        xslDoc = this.loadXmlDoc(sc_static('SCXIB.xslt')),
        xibDoc, xsltProc, resDoc, callback;

    xibOptions.forEach(function (opts) {
      xibDoc = self.loadXmlDoc(opts.url);

      xsltProc = new XSLTProcessor();
      xsltProc.importStylesheet(xslDoc);

      for (var p in opts) {
        if (opts.hasOwnProperty(p)) {
          xsltProc.setParameter(null, p, opts[p]);
        }
      }

      resDoc = xsltProc.transformToFragment(xibDoc, document);

      if (resDoc && resDoc.textContent) {
        try {
          eval(resDoc.textContent);
          callback = opts.callback;
          if (callback) callback.call(callback);
        } catch (e) {
          SC.Logger.error("Exception while evaluating XIB transform: %@, line %@".fmt(e, e.line));
        }
      } else {
        SC.Logger.error('Could not parse XIB file "%@"'.fmt(opts.url));
      }
    });
  },

  loadXibWithOptions: function (url, options) {
    var defaults = { url: url, pageName: 'mainPage' };
    this.loadXibsWithOptions([SC.mixin(defaults, options)]);
  }

});

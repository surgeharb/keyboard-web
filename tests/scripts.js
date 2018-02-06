// IIFE - Immediately Invoked Function Expression
(function (factory) {

  // The global jQuery object is passed as a parameter
  factory(window.jQuery, window.Materialize, window, document);

}(function ($, Materialize, window, document) {

  // Listen for the jQuery ready event on the document
  $(function () {

    // The DOM is ready!

    var options = {
      dividersTop: [0, 7, 13],
      dividersBot: [0, 6, 13, 20],
      keyClasses: ['btn', 'waves-effect', 'waves-light']
    };

    SmartKeys.init('#keyboard', options);

    $('input:first-child').focus();
  });

}));
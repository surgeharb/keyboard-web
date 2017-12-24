(function (window) {
  if (window.Package) {
    SmartKeys = {};
  } else {
    window.SmartKeys = {};
  }
})(window);

(function (factory) {

  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = SmartKeys;
    }
    exports.default = SmartKeys;
  }

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    if (window.jQuery) {
      factory(window.jQuery, window.SmartKeys, window, document);
    } else {
      console.error('Please include jQuery in your project');
    }
  }

}(function ($, SmartKeys, window, document) {

  var buttonKeys = {
    'dividersTop': [
      { text: '1', value: '1', width: '1' },
      { text: '2', value: '2', width: '1' },
      { text: '3', value: '3', width: '1' },
      { text: '4', value: '4', width: '1' },
      { text: '5', value: '5', width: '1' },
      { text: '6', value: '6', width: '1' },
      { text: '7', value: '7', width: '1' },
      { text: '8', value: '8', width: '1' },
      { text: '9', value: '9', width: '1' },
      { text: '0', value: '0', width: '1' },
      { text: '@', value: '@', width: '1' },
      { text: '_', value: '_', width: '1' },
      { text: 'Delete', value: 'del', width: '2' },
      { text: '-', value: '-', width: '1' },
      { text: '.', value: '.', width: '1' },
      { text: ' ', value: ' ', width: '5' },
    ],
    'dividersBot': [
      { text: 'Caps Lock', value: 'caps', width: '2' },
      { text: 'Q', value: 'q', width: '1' },
      { text: 'W', value: 'w', width: '1' },
      { text: 'E', value: 'e', width: '1' },
      { text: 'R', value: 'r', width: '1' },
      { text: 'T', value: 't', width: '1' },
      { text: 'Y', value: 'y', width: '1' },
      { text: 'U', value: 'u', width: '1' },
      { text: 'I', value: 'i', width: '1' },
      { text: 'O', value: 'o', width: '1' },
      { text: 'P', value: 'p', width: '1' },
      { text: 'A', value: 'a', width: '1' },
      { text: 'S', value: 's', width: '1' },
      { text: 'D', value: 'd', width: '1' },
      { text: 'F', value: 'f', width: '1' },
      { text: 'G', value: 'g', width: '1' },
      { text: 'H', value: 'h', width: '1' },
      { text: 'J', value: 'j', width: '1' },
      { text: 'K', value: 'k', width: '1' },
      { text: 'L', value: 'l', width: '1' },
      { text: 'Z', value: 'z', width: '1' },
      { text: 'X', value: 'x', width: '1' },
      { text: 'C', value: 'c', width: '1' },
      { text: 'V', value: 'v', width: '1' },
      { text: 'B', value: 'b', width: '1' },
      { text: 'N', value: 'n', width: '1' },
      { text: 'M', value: 'm', width: '1' },
    ]
  };

  var options = {
    'dividersTop': [],
    'dividersBot': [],
    'keyClasses': 'keyboard-key'
  };

  var config = {
    topKeyboardId: 'keyboard-top',
    botKeyboardId: 'keyboard-bot',
    keyboardWrapClass: 'keyboard-wrapper'
  };

  var specialKeys = [
    'caps', 'del'
  ]

  var $keyboard = {};
  var $focusedInput = {};

  var force = false;
  var isCaps = true;
  var once = true;

  SmartKeys.init = function (id, opts) {
    if (!id || typeof id !== 'string') {
      console.error('Please specify an id for the keyboard');
      return false;
    } else {
      $keyboard = $(id);
      $keyboard.addClass('keyboard-main');
    }

    if (opts) {
      options.dividersTop = opts.dividersTop || [];
      options.dividersBot = opts.dividersBot || [];

      if (opts.keyClasses) {
        opts.keyClasses.forEach(function (keyClass) {
          options.keyClasses += ' ' + keyClass;
        });
      }
    }

    fillKeys('dividersTop');
    fillKeys('dividersBot');

    $('input').focus(function () {
      $focusedInput = $(this);
      var value = $focusedInput.val();
      if (!value || !isNaN(value)) {
        SmartKeys.changeCaps(true);
        once = true;
      }
    });

    var $keyboardKeys = $('.keyboard-key');
    $keyboardKeys.click(function (e) {
      var $input = $focusedInput;
      if (!$input || $.isEmptyObject($input)) {
        return false;
      }

      $input.focus();
      keyClick($input, $(this));
    });

  };

  SmartKeys.changeCaps = function (bool) {
    var $keyboardKeys = $('.keyboard-key');

    if (bool === undefined) {
      isCaps = !isCaps;
    } else {
      isCaps = bool;
    }

    if (isCaps) {
      $keyboardKeys.removeClass('lowercase');
    } else {
      $keyboardKeys.addClass('lowercase');
    }
  };

  function keyClick($input, $key) {
    var inputValue = $input.val();
    var keyValue = $key.data('value');

    if (specialKeys.indexOf(keyValue) >= 0) {
      switch (keyValue) {
        case 'caps':
          SmartKeys.changeCaps();
          if (isCaps) {
            force = true;
          } else {
            force = false;
          }
          break;

        case 'del':
          $input.val(inputValue.substring(0, inputValue.length - 1));
          var temp = $input.val();
          if (!temp || !isNaN(temp) || temp.charAt(inputValue.length - 1) === ' ') {
            if (!force) once = true;
            SmartKeys.changeCaps(true);
          }
          break;

        default:
          break;
      }
    } else {
      if ((isCaps && isNaN(keyValue)) || (force && isNaN(keyValue))) {
        keyValue = keyValue.toUpperCase();
      }

      if (once) {
        once = false;
        SmartKeys.changeCaps(false);
      }

      // Set the text input
      $input.val(inputValue + keyValue);

      if (keyValue === ' ' || !isNaN(keyValue)) {
        once = true;
        SmartKeys.changeCaps(true);
      }
    }
  };

  function fillKeys(divider) {
    var part = divider.split('dividers')[1].toLowerCase();
    var id = config[part + 'KeyboardId'];
    var dividerOption = options[divider];

    $keyboard.append('<div id="' + id + '"></div>');
    var $keyboardPart = $('#' + id);

    dividerOption.forEach(function (current, index) {

      $keyboardPart.append('<div class="' + config.keyboardWrapClass + '" data-index="' + index + '"></div>');

      if (index < dividerOption.length) {
        var nextIndex = dividerOption[index + 1];
      }

      var keys = buttonKeys[divider].slice(current, nextIndex);
      if (!keys.length) return;

      var htmlKeys = '';
      keys.forEach(function (key) {
        htmlKeys += '<span class="key-' + key.width + ' ' + options.keyClasses + '" data-value="' + key.value + '">' + key.text + '</span>';
      });

      $('#' + id + ' div.' + config.keyboardWrapClass + '[data-index=' + index + ']').append(htmlKeys);
    });
  };

}));
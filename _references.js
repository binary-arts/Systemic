/// <reference path="lib/requirejs/require.js" />

'use strict';

require.config({
    baseUrl: '/src',
    paths: {
        'browser-polyfill': '../lib/babel-polyfill/browser-polyfill'
    },
    shim: {
        'browser-polyfill': []
    }
});

if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
        if (typeof this !== 'function')
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');

        var args = Array.prototype.slice.call(arguments, 1);
        var bindable = this;
        var empty = function() { };

        var bound = function() {
            return bindable.apply(this instanceof empty && context ? this : context, args.concat(Array.prototype.slice.call(arguments)));
        };

        empty.prototype = this.prototype;
        bound.prototype = new empty();

        return bound;
    };
}

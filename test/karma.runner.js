﻿requirejs.config({
    baseUrl: '/base',
    callback: window.__karma__.start,
    deps: (function() {
        var files = window.__karma__.files;
        var tests = [];

        for (var file in files) {
            if (files.hasOwnProperty(file) && /^\/base\/test\/spec\//.test(file))
                tests.push(file);
        }

        return tests;
    })()
});

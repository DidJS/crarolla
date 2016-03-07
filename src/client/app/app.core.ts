/// <reference path="../../../typings/angularjs/angular.d.ts" />

(() : void => {
    'use strict';

   angular
        .module('app.core', [
            'ngRoute'
        ]);

   console.log('app.core loaded');
})();
/// <reference path="../../../typings/angularjs/angular.d.ts" />

(() : void => {
    'use strict';

   angular
        .module('app', [
            'app.core',
            'app.cras'
        ]);

   console.log('app.modules loaded!!');
})();
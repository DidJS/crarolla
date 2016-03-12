/// <reference path="../../../typings/angularjs/angular.d.ts" />


((): void => {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$locationProvider'];
    function config($locationProvider: ng.ILocationProvider): void {
        $locationProvider.html5Mode(true);
    }


   console.log('app.config loaded');
})();
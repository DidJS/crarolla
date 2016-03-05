'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.output = './output/';
        this.sourceClientApp = this.source + 'client/';
        this.sourceServerApp = this.source + 'server/';
        this.sourceServer = this.sourceServerApp +'app.ts';

        this.tsServerOutputPath = this.output +'server';
        this.tsClientOutputPath = this.output + 'client';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allClientTypeScript = this.sourceClientApp + '/**/*.ts';
        this.allServerTypeScript = this.sourceServerApp + '/**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
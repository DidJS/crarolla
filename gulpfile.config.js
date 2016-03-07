'use strict';
module.exports = (function () {
    var source = './src/',
        outputClient = './public/',
        outputServer = "./api",
        sourceClientApp = source + 'client/',
        sourceServerApp = source;

    return {
        sourceServer: './app.ts',
        tsServerAppOutputPath: './',
        tsServerOutputPath: outputServer,
        tsClientOutputPath: outputClient,
        allJavaScript: [source + '/js/**/*.js'],
        allClientTypeScript: sourceClientApp + '/**/*.ts',
        allServerTypeScript: sourceServerApp + '/api/**/*.ts',
        typings: './typings/',
        libraryTypeScriptDefinitions: './typings/**/*.ts'
    }
})();
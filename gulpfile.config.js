'use strict';
module.exports = (function () {
    var source = './src/',
        outputClient = './client/',
        outputServer = "./api",
        sourceClientApp = source + outputClient,
        sourceServerApp = source + outputServer;

    return {
        sourceServer: './app.ts',
        tsServerAppOutputPath: './',
        tsServerOutputPath: sourceServerApp,
        tsClientOutputPath: sourceClientApp,
        allClientTypeScript: sourceClientApp + '/**/*.ts',
        allServerTypeScript: sourceServerApp + '/**/*.ts',
        typings: './typings/',
        libraryTypeScriptDefinitions: './typings/**/*.ts'
    }
})();
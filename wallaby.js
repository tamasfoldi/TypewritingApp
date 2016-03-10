module.exports = function (wallaby) {
  return {
    files: [
      { pattern: "node_modules/phantomjs-polyfill/bind-polyfill.js", instrument: false },
      { pattern: "node_modules/es6-shim/es6-shim.js", instrument: false },
      { pattern: "node_modules/systemjs/dist/system-polyfills.js", instrument: false },
      { pattern: "node_modules/systemjs/dist/system.js", instrument: false },
      { pattern: "node_modules/reflect-metadata/Reflect.js", instrument: false },
      { pattern: 'node_modules/zone.js/dist/zone-microtask.js', instrument: false },
      { pattern: 'node_modules/zone.js/dist/long-stack-trace-zone.js', instrument: false },
      { pattern: 'node_modules/zone.js/dist/jasmine-patch.js', instrument: false },
    ],
    tests: [
    ],
    compilers: {
      "app/**.ts": wallaby.compilers.typeScript({
        "module": 4, // <--- 2 for AMD, or 4 for System.js
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
      })
    },
    middleware: function (app, express) {
      app.use("/node_modules",
        express.static(
          require("path").join(__dirname, "node_modules")));
    },
    testFramework: "jasmine",
    bootstrap: function (wallaby) {
      wallaby.delayStart();

      System.config({
        defaultJSExtensions: true,
        packages: {
          app: {
            meta: {
              "*": {
                scriptLoad: true
              }
            }
          }
        },
        paths: {
          "npm:*": "node_modules/*"
        },
        map: {
          "angular2": "npm:angular2",
          "rxjs": "npm:rxjs"
        }
      });

      var promises = [];

      Promise.all([System.import('angular2/testing'), System.import('angular2/platform/testing/browser')])
        .then(function (results) {
          var testing = results[0];
          var browser = results[1];
          testing.setBaseTestProviders(browser.TEST_BROWSER_PLATFORM_PROVIDERS, browser.TEST_BROWSER_APPLICATION_PROVIDERS);

          for (var i = 0, len = wallaby.tests.length; i < len; i++) {
            promises.push(System["import"](wallaby.tests[i].replace(/\.js$/, "")));
          }
        })
        .then(function(){
          return Promise.all(promises);
        })
        .then(function () {
          wallaby.start();
        }).catch(function (e) {setTimeout(function () {throw e;}, 0);
      });
    },
    debug: true
  };
};

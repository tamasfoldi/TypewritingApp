exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['E2ESpecs/RegisterE2E.js'],
    framework: 'jasmine2'
};
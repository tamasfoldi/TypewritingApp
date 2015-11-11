exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['E2ESpecs/MenuE2E.js',
            'E2ESpecs/LessonE2E.js',
            'E2ESpecs/RegisterE2E.js'
    ],
    framework: 'jasmine2'
};
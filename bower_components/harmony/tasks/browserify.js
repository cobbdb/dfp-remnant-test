var fs = require('fs');

module.exports = function (grunt) {
    var specSet,
        name = grunt.option('spec');

    if (name) {
        specSet = [
            name + '.spec.js'
        ];
    } else {
        specSet = fs.readdirSync('tests');
    }

    grunt.config.merge({
        browserify: {
            global: {
                files: {
                    'bin/harmony.js': 'src/harmony.js'
                },
                options: {
                    browserifyOptions: {
                        standalone: 'Harmony'
                    }
                }
            },
            tests: {
                files: specSet.reduce(function (prev, cur) {
                    prev['bin/tests/' + cur] = [
                        'tests/' + cur,
                        'tests/helpers/*.setup.js'
                    ];
                    return prev;
                }, {})
            }
        }
    });
};

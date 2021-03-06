process.env.NODE_ENV = 'test';

module.exports = {
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    'watch-files': ['lib/**/*.js', 'test/**/*.js'],
    'watch-ignore': ['lib/vendor'],
    require: ['dotenv/config', './test/hooks.js']
};
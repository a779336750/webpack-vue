module.exports = {
    extends: ['./node_modules/vue-cli-plugin-commitlint/lib/lint'],
    rules: {
        'type-enum': [2, 'always', [
            'Add', 'Upd', 'Fix', 'Best', 'Chore', 'Docs', 'Revert',
        ]],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],
    },
};

module.exports = {
    root: true,
    // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
    env: {
        browser: true, // 浏览器环境中的全局变量
        jquery: true, //  jQuery 全局变量
        es6: true, // 启用除了 modules 以外的所有 ECMAScript 6 特性
    },
    parserOptions: {
        parser: 'babel-eslint', // 解析 .vue 文件中的 script
        ecmaVersion: 2018, // 指定你想要使用的 ECMAScript 版本
        sourceType: 'module', // 如果你的代码是 ECMAScript 模块， 设置为 module
    },
    globals: {
        Vue: 'readonly',
        Ktu: 'readonly',
        qrDecode: 'readonly',
        TheElement: 'readonly',
        _: 'readonly',
        $: 'readonly',
    },
    rules: {
        /**
         * 定义规范
         */

        /* 禁用未声明的变量
           'no-undef': 'error', */

        // 如果一个变量不会被重新赋值，最好使用const进行声明。
        'prefer-const': ['error', {
            destructuring: 'all',
        }],

        // 要求使用 let 或 const 而不是 var
        'no-var': 'error',

        // 强制在作用域范围内使用单一声明
        'one-var': ['error', 'never'],

        // 禁止连续赋值
        'no-multi-assign': 'error',

        // 不允许有定义了但未使用的变量
        'no-unused-vars': [
            'error',
            {
                /*  检测所有变量，包括全局环境中的变量
                    vars: 'all',
                   只检查本地声明的变量，但允许全局变量未被使用。 */
                vars: 'local',
                // 不检查参数
                args: 'none',
                // 不检查使用对象属性时，其兄弟属性被省略的情况
                ignoreRestSiblings: false,
                // catch 块中的参数必须全部使用
                caughtErrors: 'all',
            },
        ],

        // 字符串使用单引号，允许使用反勾号
        quotes: [
            'error',
            'single',
            {
                // 允许字符串使用反勾号
                allowTemplateLiterals: true,
            },
        ],

        // 禁止使用 \ 串联多行字符串
        'no-multi-str': 'error',

        // 推荐使用字符串模板连接字符串
        'prefer-template': 'warn',

        // 模板字符串中的花括号内不使用空格
        'template-curly-spacing': 'error',

        // 禁用不必要的转义
        'no-useless-escape': 'error',

        // 使用剩余参数代替 arguments
        'prefer-rest-params': 'error',

        // 需要把立即执行函数包裹起来
        'wrap-iife': ['error', 'outside'],

        // 禁止循环中存在函数
        'no-loop-func': 'error',

        // 要求使用箭头函数作为回调
        'prefer-arrow-callback': [
            'error',
            {
                // 不允许使用命名的函数作为回调函数或函数参数
                allowNamedFunctions: false,
                // 禁止函数表达式作为回调函数或函数参数
                allowUnboundThis: true,
            },
        ],

        // 要求箭头函数的箭头之前或之后有空格
        'arrow-spacing': ['error', { before: true, after: true }],

        /* 禁止对函数参数再赋值
           'no-param-reassign': [
               'error',
               {
                   // 对参数的任何属性的修改，该规则都将发出警告
                   props: true,
                   // 不检查的对象
                   ignorePropertyModificationsFor: []
               }
           ], */

        /* 禁用一元操作符，for循环除外
           'no-plusplus': [
               'warn',
               {
                   // 允许在 for 循环的最后一个表达式中使用 ++ 和 --
                   allowForLoopAfterthoughts: true
               }
           ], */

        // 禁用 Array 构造函数
        'no-array-constructor': 'warn',

        // 禁止使用原始包装实例
        'no-new-wrappers': 'warn',

        // 禁用 Function 构造函数
        'no-new-func': 'warn',

        // 要求对象字面量选择简洁语法
        'object-shorthand': [
            'warn',
            'always',
            {
                // 对象的键是字符串时，倾向于长格式的语法
                avoidQuotes: true,
                // 构造函数不忽略
                ignoreConstructors: false,
                // 表示函数属性相对于显式返回的箭头函数更倾向于方法
                avoidExplicitReturnArrows: true,
            },
        ],

        // 优先使用数组和对象解构
        'prefer-destructuring': [
            'warn',
            {
                // 变量声明时解构
                VariableDeclarator: {
                    // array: true,
                    object: true,
                },
                // 使用赋值表达式时结构
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // 强制操作符使用一致的换行符风格
        'operator-linebreak': [
            'error',
            'before',
            {
                // 覆盖对指定的操作的全局设置
                overrides: {},
            },
        ],

        /**
         * OPP 规约
         */

        // 禁用不必要的构造函数
        'no-useless-constructor': 'error',

        // 不允许类成员中有重复的名称
        'no-dupe-class-members': 'error',

        // 要求使用点号
        'dot-notation': ['warn', { allowKeywords: true, allowPattern: '^[a-z]+(_[a-z]+)+$' }],

        // 禁止直接使用 Object.prototypes 的内置属性
        'no-prototype-builtins': 'warn',

        /**
         * 命名规范
         */

        // 强制标识符的最小和最大长度
        'id-length': 'off',

        // 用小驼峰式命名你的对象、函数、实例
        camelcase: ['error', { properties: 'never' }],

        // 要求构造函数首字母大写，大驼峰式命名
        'new-cap': ['error', {
            // 允许调用 new 操作符有首字母小写或首字母大写的函数
            newIsCap: false,
            // 允许调用首字母大写的函数时没有 new 操作符
            capIsNew: false,
        }],

        /**
         * 格式化规范
         */

        // 强制使用一致的缩进，默认4个空格
        indent: [
            'error',
            4,
            {
                SwitchCase: 1, // switch 语句中的 case 子句的缩进级别
                ArrayExpression: 1, // 强制数组中的元素的缩进
                ObjectExpression: 1, // 强制对象中的属性的缩进
                ignoreComments: false, // 注释需要与前一行或下一行的注释对齐
            },
        ],

        // 强制在大括号前空一格
        'space-before-blocks': [
            'error',
            {
                functions: 'always', // 函数签名后的大括号前要空一格
                keywords: 'always', // 关键字后的大括号前要空一格
                classes: 'always', // 类后面的大括号前要空一格
            },
        ],

        // 关键字空格
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true,
            },
        ],

        // 操作符周围有空格
        'space-infix-ops': ['error'],

        // 要求文件末尾保留一行空行
        'eol-last': ['error', 'always'],

        // 要求文件末尾最多只有一个空行
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 1,
            },
        ],

        // 要求两个以上的方法链中每个调用都有一个换行符
        'newline-per-chained-call': [
            'error',
            {
                ignoreChainWithDepth: 2,
            },
        ],

        // 禁止属性前有空白，方法链调用以.开头
        'no-whitespace-before-property': 'error',

        // 禁止块内填充空行
        'padded-blocks': [
            'error',
            'never',
            {
                blocks: 'never',
                classes: 'always',
                switches: 'never',
            },
        ],

        // 强制圆括号内没有空格
        'space-in-parens': ['error', 'never'],

        // 方括号里不要加空格
        'array-bracket-spacing': ['error', 'never'],

        // 花括号里要加空格
        'object-curly-spacing': ['error', 'always'],

        // 作为语句的花括号也要加空格
        'block-spacing': 'error',

        // 避免一行代码超过200个字符（包含空格）。
        'max-len': [
            'error',
            {
                code: 200,
                ignoreComments: true, // 忽略注释
                ignoreTrailingComments: true, // 忽略拖尾注释
                ignoreUrls: true, // 忽略Url
                ignoreStrings: true, // 忽略长字符串
                ignoreTemplateLiterals: true, // 忽略模板字符串
                ignoreRegExpLiterals: true, // 忽略正则表达式
                ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(', // 忽略特定模式
            },
        ],

        // 逗号后面加一个空格
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],

        // 调用函数时，函数名和小括号之间不要空格
        'func-call-spacing': ['error', 'never'],

        // 在对象的字面量属性中， key value 之间要有空格
        'key-spacing': [
            'error',
            {
                beforeColon: false, // 冒号前不需要空格
                afterColon: true, // 冒号后需要空格
            },
        ],

        // 函数签名部分要有空格
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always', // 匿名函数要有空格
                named: 'never', // 命名函数不需要空格
                asyncArrow: 'ignore', // 异步箭头函数忽略
            },
        ],

        // 行末不要空格
        'no-trailing-spaces': [
            'error',
            {
                ignoreComments: true, // 忽略注释
            },
        ],

        // 不要前置逗号
        'comma-style': ['error', 'last'],

        // 块中的结尾要逗号
        'comma-dangle': ['error', 'always-multiline'],

        // 要求在语句末尾使用分号
        semi: ['error', 'always'],

        // 强制分号出现在句子末尾
        'semi-style': ['error', 'last'],

        // 去除无效引号，只对那些无效的标示使用引号，例如有-连接的key
        'quote-props': ['error', 'as-needed'],

        // 要求箭头函数的参数使用圆括号，一个参数时可忽略
        'arrow-parens': ['warn', 'as-needed'],

        // 箭头函数返回语句只有一句是，可忽略花括号
        'arrow-body-style': ['warn', 'as-needed'],

        // 强制数组方法的回调函数中有 return 语句，可隐式return
        'array-callback-return': [
            'warn',
            {
                allowImplicit: true,
            },
        ],

        // 禁止在箭头函数体之前出现换行
        'implicit-arrow-linebreak': ['warn', 'beside'],

        /**
         * 控制语句
         */

        /* 用 === 和 !== 而不是 == 和 !=
           eqeqeq: ['error', 'always'], */

        // 三元表达式不应该嵌套，通常是单行表达式
        'no-nested-ternary': 'warn',

        // 避免不需要的三元表达式，使用逻辑运算符结合圆括号代替
        'no-unneeded-ternary': 'warn',

        // 单个语句的控制语句换行显示
        'nonblock-statement-body-position': [
            'warn',
            'beside',
            {
                overrides: {
                    while: 'below',
                },
            },
        ],

        // 禁止在 else 前有 return，允许有else if
        'no-else-return': 'warn',

        // 在case和default分句里用大括号创建一块包含语法声明的区域
        'no-case-declarations': 'warn',

        // 强制对多行注释使用特定风格 /** */
        'multiline-comment-style': ['error', 'bare-block'],

        /**
         * 注释规范
         */

        // 单行注释的位置在上方
        'line-comment-position': [
            'error',
            {
                position: 'above',
            },
        ],

        // 禁止使用内联注释
        'no-inline-comments': 'error',

        // 要求在注释前有空白
        'spaced-comment': [
            'error',
            'always',
            {
                exceptions: ['-', '+'],
                markers: ['/'],
            },
        ],

        /**
         * 其他
         */

        // 禁用 eval()
        'no-eval': 'error',

        // 禁用隐式的eval()
        'no-implied-eval': 'error',

        // 禁止在可能与比较操作符相混淆的地方使用箭头函数
        'no-confusing-arrow': ['error', { allowParens: true }],

        // parseInt 要求必须有基数
        radix: 'warn',

        // 建议使用扩展运算符而非.apply()
        'prefer-spread': 'warn',

        // 建议使用 ** 进行幂运算
        'no-restricted-properties': [
            'warn',
            {
                object: 'Math',
                property: 'pow',
                message: 'Please use ** instead',
            },
        ],

        // 禁用迭代器
        'no-iterator': 'error',

        // 建议不使用 for-in、for-of 语法
        'no-restricted-syntax': [
            'warn',
            {
                selector: 'ForInStatement',
                message: 'Replace with JavaScript.md advanced functions',
            },
            /* {
                   selector: 'ForOfStatement',
                   message: 'Replace with JavaScript.md advanced functions'
               } */
        ],
    },
    // .vue文件，单独配置eslint
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'template-curly-spacing': 'off',
                'vue/script-indent': [
                    'error',
                    4,
                    {
                        baseIndent: 1,
                    },
                ],
            },
            extends: ['plugin:vue/base'],
        },
    ],
};


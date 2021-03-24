module.exports = {
    "presets": [
        "next/babel"
    ],
    "comments": false,
    "plugins": [
        [
            "module-resolver",
            {
                "root": [
                    "."
                ],
                "alias": {
                    "@": "./src",
                    "dva": "dva-no-router"
                },
                "cwd": "babelrc"
            }
        ],
        [
            "import",
            {
                "libraryName": "antd",
                "style": "css"
            }
        ]
    ],
    "ignore": []
};

var grunt = require("grunt");

module.exports = function () {

    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ng-annotate");
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("compile", [
        "jshint",
        "ngAnnotate",
        "uglify",
        "compress"
    ]);

    // noinspection SpellCheckingInspection
    grunt.initConfig({
        package: grunt.file.readJSON("package.json"),
        compress: {
            main: {
                options: {
                    mode: "gzip"
                },
                files: [{
                    expand: true,
                    src: ["dist/*.js"],
                    dest: "",
                    extDot: "last",
                    ext: ".js.gz"
                }]
            }
        },
        jshint: {
            src: ["src/*.js"],
            options: {
                boss    : true,
                curly   : true,
                eqeqeq  : true,
                eqnull  : true,
                immed   : true,
                latedef : false,
                newcap  : true,
                noarg   : true,
                sub     : true,
                undef   : true,
                unused  : false,
                node    : true,
                "-W117" : true
            }
        },
        ngAnnotate: {
            main: {
                files: [{
                    ".tmp/components.annotated.js": ["src/components.js"]
                }]
            }
        },
        uglify: {
            main: {
                options: {
                    banner: ""+
                    "/**\n" +
                    " * <%= package.name %> v<%= package.version %>\n" +
                    " *\n" +
                    " * Copyright (c) <%= package.author %>\n" +
                    " */\n"
                },
                files: {
                    "dist/<%= package.name %>.js": ".tmp/components.annotated.js"
                }
            }
        },
        watch: {
            js: {
                files: ["src/**/*.js"],
                tasks: ["compile"]
            },
            gruntfile: {
                files: ["Gruntfile.js"],
                tasks: ["compile"]
            }
        }
    });
};

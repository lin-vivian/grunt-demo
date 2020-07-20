module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); //注入所有的grunt插件

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //获取解析package.json,将内容保存在pkg中
        //js压缩
        uglify: {
            options: {
                stripBanners: true, //true 允许添加头部信息
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'//在头部添加js文件名和时间的注释
            },
            build: {
                src: './src/js/index.js',
                dest: 'build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },
        //css压缩
        cssmin: {
            options: {
                report: 'gzip'
            },
            build: {
                expand: true,
                cwd: './src/css',
                src: ['page.css'],
                dest: './build/static/css'
            }
        },
        //html压缩
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            build: {
                expand: true,
                cwd: './src/html',
                src: ['*.html'],
                dest: './build'
            }
        }

    }) //定义各模块的参数，即初始化配置

    grunt.loadNpmTasks('grunt-contrib-uglify'); //加载完成任务所需要的模块
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', [
        'uglify',
        'cssmin',
        'htmlmin'
    ]); //定义任务
}
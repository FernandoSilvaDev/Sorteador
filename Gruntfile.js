// Para fazer a configuração inicial da ferramenta Grunt
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//Configurar o Less
        less: {
//Development, hambiente de desenvolvimento do Less de processamento local
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
//Production, hambiente de produção onde será processado no rumo final
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        { match: 'ENDERECO_DO_CSS', replacement: './styles/main.css'},
                        //Integrar o replace do Java Script
                        { match: 'ENDERECO_DO_JS', replacement: '../src/scripts/main.js'}
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }]
            },
            dist: {
                options: {
                    patterns: [
                        { match: 'ENDERECO_DO_CSS', replacement: './styles/main.min.css'},
                        //Integrar o replace do Java Script
                        { match: 'ENDERECO_DO_JS', replacement: '../src/scripts/main.min.js'}
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {'dist/scripts/main.min.js' : 'src/scripts/main.js'}
            }
        }
    }) 
//Carregamento dos plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

//Tarefa default - executar as tarefas de forma serial
 // grunt.registerTask('default', ['less','sass']);

//Tarefa default - executar as tarefas de forma paralela
    grunt.registerTask('default', ['watch']);

//Build é aonde vai os arquivos que vão no final ao cliente.
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}
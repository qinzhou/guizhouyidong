var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;          //自动刷新,从此不用F5
var miniJS  = require('gulp-uglify');   //压缩js
var sass = require('gulp-sass');        //编译sass
var replace = require('gulp-replace');
var cssBase64 = require('gulp-base64');  //将小图背景图转为base64的形式
var autoprefixer = require('gulp-autoprefixer');
var px2rem = require('gulp-px2rem-plugin');


/*sass开发*/
gulp.task('sass_dev', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','last 3 Explorer versions','Firefox >= 20'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
         }))
        // .pipe(px2rem({'width_design':750,'valid_num':2,'pieces':7.5}))
        .pipe(gulp.dest('src/css/'))
        .pipe(reload({stream:true}))
})



/*自动刷新*/
gulp.task('server', function() {
    browserSync({
        ui:false,
        server: {
            baseDir: 'src',
            directory: true
        },
        notify: false,
        ghostMode:false,
        port: 8088,
        open: "external"
    }, function(err, arg) {
        console.log('loaclhost:8088');
    })
})


/*开发环境*/
gulp.task('default', [
    'sass_dev',
    'server'
], function() {
    gulp.watch('src/html/**/*.html', reload);
    gulp.watch('src/js/*.js',reload);
    gulp.watch('src/sass/*.scss',['sass_dev']);
})

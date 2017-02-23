// Load plugins
var gulp = require("gulp"),
    sass = require("gulp-sass"),//sass编译
    minifycss = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    notify = require('gulp-notify'),//js压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    autoprefixer = require('gulp-autoprefixer'),//自动处理前缀
    rename = require('gulp-rename'),//文件名修改
    rev = require('gulp-rev'),//添加版本号
    revCollector = require('gulp-rev-collector'),//添加版本号
    borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch');

gulp.task('styles',function(event){
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('sass', 'css');
        }))
        .pipe(gulp.dest('src'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'));
});
gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images/'));
});
gulp.task('html',['images','styles','scripts' ], function () {
    return gulp.src(['src/rev/**/*.json', 'src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./'));
});
gulp.task('default',['html'],function(){
    
});

gulp.task('watch',function(){
    borwserSync.init({
        server:{
        baseDir:'./'
        }
    });

    gulp.watch('src/**/*.scss',['styles']);
    gulp.watch('src/**/*.js',['scripts']);
    gulp.watch('src/images/*',['images']);
    gulp.watch("*.html").on('change',reload);
});

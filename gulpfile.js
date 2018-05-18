// --------------------------------------------
// Dependencies
// --------------------------------------------
var autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    images = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();


// paths
var styleSrc = 'source/scss/**/*.scss',
    styleDest = 'build/assets/css/',
    htmlSrc = 'source/**/*.html',
    htmlDest = 'build/',
    imgSrc = 'source/img/**/*',
    imgDest = 'build/assets/img/*',
    vendorSrc = 'source/js/vendors/*.js',
    vendorDest = 'build/assets/js/',
    scriptSrc = 'source/js/*.js',
    scriptDest = 'build/assets/js/';



// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// Move html 
gulp.task('html', function() {
  gulp.src('source/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('build/'));
});

// Compile sass files 
gulp.task('sass', function() {
  gulp.src('source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
          outputStyle: 'expanded'
        }))
        .pipe(rename({
          basename: 'style'
        }))
        .pipe(postcss([
          autoprefixer()
        ]))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(postcss([
          cssnano()
        ]))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/assets/css'));
});


// Minify imgs
gulp.task('images', function() {
  gulp.src('source/img/**/*')
        .pipe(plumber())
        .pipe(images())
        .pipe(gulp.dest('build/assets/img'));
});

// Uglify js files
gulp.task('scripts', function() {
    gulp.src('source/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});

//Concat and Compress Vendor .js files
gulp.task('vendors', function() {
    gulp.src(
            [
                'source/js/vendors/jquery.min.js',
                'source/js/vendors/*.js'
            ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/assets/js'));
});



// Watch for changes
gulp.task('watch', function(){

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        notify: false
    });

    gulp.watch(styleSrc,['sass']);
    gulp.watch(htmlSrc,['html']);
    gulp.watch(scriptSrc,['scripts']);
    gulp.watch(vendorSrc,['vendors']);
    gulp.watch(imgSrc,['images']);
    gulp.watch(['build/*.html', 'build/assets/css/*.css', 'build/assets/js/*.js', 'build/assets/img/*']).on('change', browserSync.reload);

});


// use default task to launch Browsersync and watch JS files
gulp.task('default', ['html', 'sass', 'images', 'scripts', 'vendors', 'watch'], function () {});
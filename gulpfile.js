'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');

var dirs = {
    src: 'src/',
    html: 'html/',
    nodeModules: "node_modules/",
    tests: "src/tests/",
    css: "css/"
};


/********************************************
 *  Build
 ********************************************/
gulp.task("sass", function () {
    return gulp.src(dirs.src + dirs.css + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dirs.src + dirs.css));
});

gulp.task("build", ['sass'], function () {
    return gulp.src([dirs.src + "**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            "target": "es5",
            "module": "commonjs",
            "sourceMap": true,
            "noImplicitAny": true,
            "preserveConstEnums": true,
            "moduleResolution": "node",
            "removeComments": true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.src));
});


/********************************************
 *  Testing 
 ********************************************/
gulp.task("build:tests", ["build"], function () {
    return gulp.src([dirs.tests + "**/*.spec.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            "target": "es5",
            "module": "commonjs",
            "sourceMap": true,
            "noImplicitAny": true,
            "preserveConstEnums": true,
            "moduleResolution": "node",
            "removeComments": true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.build + dirs.tests));
});

gulp.task("test", ["build:tests"], function (done) {
    return gulp.src(dirs.build + dirs.tests + "**/*.spec.js")
        .pipe(mocha().on('error', function (error) {
            console.log(error);
            done();
        }));
});
// require modules
import autoprefixer from 'autoprefixer';

import gulp from "gulp";
import babel from "gulp-babel";
import gulpSass from "gulp-sass";
import dartSass from 'sass';


import cleanCss from "gulp-clean-css";
import concat from 'gulp-concat';
import concatCss from 'gulp-concat-css';
import imgMin from 'gulp-image';
import postcss from 'gulp-postcss';
import nodeSass from 'node-sass';

import terser from 'gulp-terser';
const { src, dest, series, parallel, task, watch } = gulp;
const sass = gulpSass(dartSass);


// add babel 

// browser sync 
// html task
task("copyHTML", async () => {
  src("./*.html").pipe(dest("../dist"))
})





// create a watch task for sass changes.
task('watch', () => {
  watch('sass/**', series('sass'));

})
// compile scss
task('sass', function async() {
  return src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('../dist/css'));
});
// css task
task('minify-css', async () => {
  src('../dist/css/*.css')
    .pipe(postcss([autoprefixer()])).pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest('../dist/css'))
})


//js task
task('minify-js', async () => {
  src('./js/*.js').pipe(concat("scripts.js")).pipe(babel({
    presets: ['@babel/env']
  }))
    .pipe(terser())
    .pipe(dest('../dist/js'))

});




//minify-imgs-task
task("minifyImgs", async () => {
  return await src('./assets/**')
    .pipe(imgMin())
    .pipe(dest('../dist/assets/'))


})
// create a watch task to update on css change


task("default", series(parallel("copyHTML", "sass", "minify-js", "minifyImgs"), "minify-css"));








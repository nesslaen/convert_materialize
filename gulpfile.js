var gulp = require('gulp');

gulp.task('hello', function(){
	console.log('Hello!');
});

var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function(){
	var spriteData = gulp.src(['./src/img/icons/*.*']) //путь, откуда берутся катринки
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName:'_sprite.scss',
		imgPath:'../img/sprite.png',
		cssFormat: 'scss',
		padding: 16
	}));
	var imgStream = spriteData.img.pipe(gulp.dest('app/img/')); // куда заливается sprite
	var cssStream = spriteData.css.pipe(gulp.dest('src/scss/components/')); //куда заливается scss
	return (imgStream, cssStream);
});

var pug = require('gulp-pug');
var notify = require("gulp-notify");

gulp.task('pug',function(){
	return gulp.src(['src/pug/**/*.pug','!src/pug/**/_*.pug'])
		.pipe(pug({pretty:'\t'}))
		.on("error", notify.onError())
		.pipe(gulp.dest('app'));
});

var sass = require('gulp-sass');

// gulp.task('sass', function(){
// 	return gulp.src('.src/scss/**/*.scss')
// 		.on("error",notify.onError())
// 		.pipe(gulp.dest('app/css'));
// });

var bourbon = require('node-bourbon');
var rename = require("gulp-rename");
// var autoprefixer = require('gulp-autoprefixer');
// var cleanCSS = require('gulp-clean-css');
// var csscomb = require('gulp-csscomb');

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({includePaths: bourbon.includePaths}) //подключаем Bourbon
		.on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix: ''})) 
		// .pipe(autoprefixer(['last 15 versions'])) //подключаем Autoprefixer
		// .pipe(cleanCSS())
		// .pipe(csscomb())
		.pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['sass'], function() {
	// gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
});

var imagemin = require('gulp-imagemin');

gulp.task('compress', function() {
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('app/img'))
});
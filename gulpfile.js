import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css( done ) {
    src('src/scss/**/*.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('src/css', {sourcemaps: '.'}) )

    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
}

export default series(css, dev )
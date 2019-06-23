﻿const gulp = require('gulp')
const map = require('gulp-sourcemaps')
const path = require('path')
const sass = require('gulp-sass')
const shell = require('gulp-shell')
const ts = require('gulp-typescript')

const semanticBuild = require('./Client/src/semantic/tasks/build')
const semanticWatch = require('./Client/src/semantic/tasks/watch')

const config = ts.createProject(path.join(__dirname, 'Server/tsconfig.json'))
const build = path.join(__dirname, 'Server/build')

let watchMode = false

function ignoreErrorDuringWatch(err) {
    if (!watchMode) {
        throw err instanceof Error ? err : new Error(`${err}`)
    }
}

function reportWatchError(err) {
    if (!watchMode) {
        throw new Error(err.message)
    } else {
        const message = err.message
        const first = message.indexOf('\n')
        const second = message.indexOf('\n', first + 1)

        if (first >= 0 && second >= 0) {
            console.log(
                `${message.substring(0, first)}(${err.line},${err.column}): error SASS: ${message.substring(
                    first + 1,
                    second - first
                )}`
            )
        }
    }
}

gulp.on('task_stop', ({ task }) => (watchMode = watchMode || task.indexOf('watch') >= 0))

//
gulp.task('build-app', shell.task('yarn build-client'))

//
gulp.task('build-sass', () =>
    gulp
        .src(path.join(__dirname, 'Client/src/index.scss'))
        .pipe(sass({ linefeed: 'crlf' }).on('error', reportWatchError))
        .pipe(gulp.dest(path.join(__dirname, 'Server/dist')))
)

//
gulp.task('watch-sass', () => gulp.watch(path.join(__dirname, 'Client/src/**/*.scss'), ['build-sass']))

//
gulp.task('build-ui', semanticBuild)
gulp.task('watch-ui', semanticWatch)

//
gulp.task('build-client', ['build-sass', 'build-ui', 'build-app'])

//
gulp.task('build-server', () =>
    config
        .src()
        .pipe(map.init())
        .pipe(config())
        .on('error', ignoreErrorDuringWatch)
        .js.pipe(map.write('', { sourceRoot: build }))
        .pipe(gulp.dest(build))
)

//
gulp.task('build', ['build-client', 'build-server'])

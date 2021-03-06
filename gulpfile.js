﻿const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const sass = require('gulp-sass')
const shell = require('gulp-shell')
const map = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const path = require('path')
const util = require('util')

const config = ts.createProject(path.join(__dirname, 'Server/tsconfig.json'))
const build = path.join(__dirname, 'Server/src')

async function selectTheme(theme, name) {
    return new Promise(async (success, failure) => {
        try {
            // Konfigurationsdatei an gewünschtes Theme anpassen.
            const config = path.join(__dirname, 'semantic.json')

            const readFile = util.promisify(fs.readFile)
            const raw = (await readFile(config)).toString()
            const json = raw.substring(raw.indexOf('{'))

            const target = `/dist/${theme}/`
            const themeJson = json.replace(/\/dist\/[^\/]+\//g, target)

            if (themeJson !== json) {
                const writeFile = util.promisify(fs.writeFile)
                await writeFile(config, themeJson)
            }

            // Jetzt noch die Theme Konfiguration selbst - auch die ist hardcoded in LESS.
            const themeConfig = JSON.parse(themeJson)
            const themePath = path.join(__dirname, themeConfig.base, themeConfig.paths.source.config)
            const parsed = path.parse(themePath)
            const themeSource = path.join(parsed.dir, `${parsed.name}.${theme}${parsed.ext}`)

            const copy = util.promisify(fs.copyFile)
            await copy(themeSource, themePath)

            // Gewünschte Task ausführen.
            await shell.task(`cd Client/src/semantic && gulp ${name}`)()

            success()
        } catch (error) {
            failure(error)
        }
    })
}

//
gulp.task('build-app', shell.task('yarn build-client'))

//
gulp.task('build-sass', () =>
    gulp
        .src(path.join(__dirname, 'Client/src/index.scss'))
        .pipe(sass({ linefeed: 'crlf' }))
        .pipe(gulp.dest(path.join(__dirname, 'Server/dist')))
)

//
gulp.task('watch-sass', () => gulp.watch(path.join(__dirname, 'Client/src/**/*.scss'), gulp.series('build-sass')))

//
gulp.task('int-build-alternate-1-ui', () => selectTheme('alternate.1', 'build'))
gulp.task('int-build-alternate-2-ui', () => selectTheme('alternate.2', 'build'))
gulp.task('int-build-default-ui', () => selectTheme('default', 'build'))
gulp.task('int-watch-default-ui', () => selectTheme('default', 'watch'))

gulp.task('build-alternate-1-ui', shell.task('node node_modules/gulp/bin/gulp.js int-build-alternate-1-ui'))
gulp.task('build-alternate-2-ui', shell.task('node node_modules/gulp/bin/gulp.js int-build-alternate-2-ui'))
gulp.task('build-default-ui', shell.task('node node_modules/gulp/bin/gulp.js int-build-default-ui'))
gulp.task('watch-default-ui', shell.task('node node_modules/gulp/bin/gulp.js int-watch-default-ui'))

//
gulp.task('build-client-core', gulp.series('build-sass', 'build-app'))
gulp.task('build-client', gulp.series('build-client-core', 'build-default-ui'))
gulp.task(
    'build-client-deploy',
    gulp.series('build-client-core', 'build-alternate-1-ui', 'build-alternate-2-ui', 'build-default-ui')
)

//
gulp.task('build-server', () =>
    config
        .src()
        .pipe(map.init())
        .pipe(config())
        .js.pipe(map.write('', { sourceRoot: build }))
        .pipe(gulp.dest(build))
)

//
gulp.task('build', gulp.series('build-client', 'build-server'))

//
gulp.task('deploy:clean', () => del('deploy'))

gulp.task(
    'deploy:server',
    gulp.series('build-server', () => gulp.src('Server/src/**/*.js').pipe(gulp.dest('deploy/src')))
)

gulp.task(
    'deploy:client',
    gulp.series('build-client-deploy', () =>
        gulp.src(['Server/dist/**/*', '!Server/dist/**/*.map']).pipe(gulp.dest('deploy/dist'))
    )
)

gulp.task('deploy:config', () =>
    gulp
        .src(['.dockerignore', 'docker-compose.yml', 'Dockerfile', 'install', 'package.json', 'Server/config.json'])
        .pipe(gulp.dest('deploy'))
)

gulp.task('deploy', gulp.series('deploy:clean', 'deploy:config', 'deploy:server', 'deploy:client'))

const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const map = require('gulp-sourcemaps')
const path = require('path')
const sass = require('gulp-sass')
const shell = require('gulp-shell')
const ts = require('gulp-typescript')
const util = require('util')

const config = ts.createProject(path.join(__dirname, 'Server/tsconfig.json'))
const build = path.join(__dirname, 'Server/src')

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
                    second - first,
                )}`,
            )
        }
    }
}

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

            // Immer alle Hilfstasks laden.
            const tasks = {
                build: require('./Client/src/semantic/tasks/build'),
                watch: require('./Client/src/semantic/tasks/watch'),
            }

            // Gewünschte Task ausführen.
            tasks[name](error => (error ? failure(error) : success()))
        } catch (error) {
            failure(error)
        }
    })
}

// Dieser Work-Aorund funktioniert NUR für Tasks, die noch nicht ausgeführt wurden
// und zudem keine Abhängigkeiten haben. Für uns passt das aber gut!
function runSequence(...tasks) {
    return new Promise(async (success, failure) => {
        try {
            for (let task of tasks) {
                await gulp.tasks[task].fn(error => (error ? failure(error) : success))
            }

            success()
        } catch (error) {
            failure(error)
        }
    })
}

gulp.on('task_stop', ({ task }) => (watchMode = watchMode || task.indexOf('watch') >= 0))

//
gulp.task('build-app', shell.task('yarn build-client'))

//
gulp.task('build-sass', () =>
    gulp
        .src(path.join(__dirname, 'Client/src/index.scss'))
        .pipe(sass({ linefeed: 'crlf' }).on('error', reportWatchError))
        .pipe(gulp.dest(path.join(__dirname, 'Server/dist'))),
)

//
gulp.task('watch-sass', () => gulp.watch(path.join(__dirname, 'Client/src/**/*.scss'), ['build-sass']))

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
gulp.task('build-client-core', ['build-sass', 'build-app'])
gulp.task('build-client', ['build-client-core', 'build-default-ui'])
gulp.task('build-client-deploy', ['build-client-core'], () =>
    runSequence('build-alternate-1-ui', 'build-alternate-2-ui', 'build-default-ui'),
)

//
gulp.task('build-server', () =>
    config
        .src()
        .pipe(map.init())
        .pipe(config())
        .on('error', ignoreErrorDuringWatch)
        .js.pipe(map.write('', { sourceRoot: build }))
        .pipe(gulp.dest(build)),
)

//
gulp.task('build', ['build-client', 'build-server'])

//
gulp.task('deploy:clean', () => del.sync('deploy'))

gulp.task('deploy:server', ['build-server', 'deploy:clean'], () =>
    gulp.src('Server/src/**/*.js').pipe(gulp.dest('deploy/src')),
)

gulp.task('deploy:client', ['build-client-deploy', 'deploy:clean'], () =>
    gulp.src(['Server/dist/**/*', '!Server/dist/**/*.map']).pipe(gulp.dest('deploy/dist')),
)

gulp.task('deploy:config', ['deploy:clean'], () =>
    gulp
        .src([
            '.dockerignore',
            'docker-compose.yml',
            'Dockerfile',
            'install',
            'package.json',
            'Server/config.json',
            'Server/service.cmd',
            'Server/service.js',
            'yarn.lock',
        ])
        .pipe(gulp.dest('deploy')),
)

gulp.task('deploy', ['deploy:server', 'deploy:client', 'deploy:config'])

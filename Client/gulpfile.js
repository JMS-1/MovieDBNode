const fs = require('fs')
const gulp = require('gulp')
const shell = require('gulp-shell')

const theme = process.argv.find((a) => a.startsWith('--theme=')).substring(8)

gulp.task('theme', async () => {
    fs.copyFileSync(`semantic.${theme}.json`, 'semantic.json')

    process.chdir('src/semantic/src')

    fs.copyFileSync(`theme.${theme}.config`, 'theme.config')

    process.chdir('..')

    return shell.task('gulp build')()
})

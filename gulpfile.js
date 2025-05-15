const { deleteAsync } = require("del");
const gulp = require("gulp");

gulp.task("deploy:clean", () => deleteAsync("deploy"));

gulp.task("deploy:server", () =>
  gulp.src("Server/src/**/*.js").pipe(gulp.dest("deploy/src"))
);

gulp.task("deploy:client", () =>
  gulp
    .src(["Client/build/**/*", "!Client/build/**/*.map"])
    .pipe(gulp.dest("deploy/dist"))
);

gulp.task("deploy:config", () =>
  gulp
    .src([
      ".dockerignore",
      "default.conf",
      "docker-compose.yml",
      "Dockerfile",
      "install",
      "package.json",
      "Server/config.json",
    ])
    .pipe(gulp.dest("deploy"))
);

gulp.task(
  "deploy",
  gulp.series("deploy:clean", "deploy:config", "deploy:server", "deploy:client")
);

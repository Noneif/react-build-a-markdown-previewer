import ghPages from "gulp-gh-pages";

export const gh = () => {
  return app.gulp
    .src(`./${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "DEPLOY-GH-PAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(ghPages());
};

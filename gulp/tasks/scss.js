import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //compress css files
import webpcss from "gulp-webpcss"; //output WEBP images
import autoprefixer from "gulp-autoprefixer"; //add vendor prefixes to css files
import groupCssMediaQueries from "gulp-group-css-media-queries"; //add vendor prefixes to css files

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.ifPlugin(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css)) //uncompressed css files
    .pipe(app.plugins.ifPlugin(app.isBuild, cleanCss()))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};

import gulp from "gulp";
// import pathes
import { path } from "./gulp/config/path.js";
// import plagins
import { plugins } from "./gulp/config/plugins.js";
// import tasks
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { zip } from "./gulp/tasks/zip.js";
import { gh } from "./gulp/tasks/gh-pages.js";

// transmit values to global variables
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};
// watcher for file changes
function watcher() {
  gulp.watch(path.watch.html, html); // for auto upload to ftp-server gulp.series(html, ftp);
  gulp.watch(path.watch.scss, scss); // for auto upload to ftp-server gulp.series(scss, ftp);
  gulp.watch(path.watch.js, js); // for auto upload to ftp-server gulp.series(js, ftp);
}

// main tasks
const mainTasks = gulp.series(gulp.parallel(html, scss, js));

// bulding scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployGH = gulp.series(reset, mainTasks, gh);

// export scenarios

export { dev, build, deployZIP, deployGH };

// performing default scenario
gulp.task("default", dev);

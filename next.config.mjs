import glob from "fast-glob";
import path from "path";
import { curry, map, pipe, prop } from "ramda";

const relative = curry(path.relative);

export default {
  i18n: {
    // These are all locales you want to support in your application
    locales: await glob("posts/**/*.{md,mdx}").then(
      map(
        pipe(
          relative("posts"),
          path.parse,
          prop("dir")
          //
        )
      )
    ),

    // when user visiting non-locale prefixed path, e.g. /hello
    defaultLocale: "en",
  },
};

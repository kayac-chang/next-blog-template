import glob from "fast-glob";
import { readFile } from "fs/promises";
import path from "path";
import { curry, map, tap } from "ramda";

export const trace = tap(console.log);
export const head = <T>(values: T[]) => values[0];

export const Path = {
  ...path,
  relative: curry(path.relative),
};

export const FS = {
  glob: (pathname: string) => glob(pathname).then(map(path.parse)),
  readFile: (pathname: string) => readFile(pathname, "utf8"),
};

export default {
  trace,
  Path,
  FS,
};

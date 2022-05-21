import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { andThen, apply, map, pipe } from "ramda";
import { assert } from "@sindresorhus/is";
import Container from "components/container";
import Layout from "components/layout";
import { FS, Path } from "lib/utils";

const ROOT = "posts";
const EXT = ".md";
const PATTERN = Path.format({
  name: `${ROOT}/**/*`,
  ext: EXT,
});

const FilePathToRoute = pipe(
  ({ dir, name }) => ({
    locale: Path.relative(ROOT, dir),
    slug: name,
  }),
  ({ locale, slug }) => ({
    params: { slug },
    locale,
  })
);
export const getStaticPaths = () =>
  FS.glob(PATTERN)
    .then(map(FilePathToRoute))
    .then((paths) => ({
      paths,
      fallback: false,
    }));

const parse = (source: string) => serialize(source, { parseFrontmatter: true });
const check = (ctx: GetStaticPropsContext) => {
  assert.string(ctx.params?.slug);
  assert.string(ctx.locale);
  return [ROOT, ctx.locale, ctx.params.slug];
};
const FullFilePath = (name: string) =>
  Path.format({
    name,
    ext: EXT,
  });
export const getStaticProps = pipe(
  check,
  apply(Path.join),
  FullFilePath,
  FS.readFile,
  andThen(parse),
  andThen((source) => ({
    props: { source },
  }))
);

interface Meta {
  title?: string;
}
const meta = (data: any): Meta => data;

type Props = {
  source: MDXRemoteSerializeResult;
};
const Page = ({ source }: Props) => (
  <Layout>
    <Container className="prose">
      <Head>
        <title>{meta(source.frontmatter)?.title}</title>
      </Head>
      <MDXRemote {...source} />
    </Container>
  </Layout>
);

export default Page;

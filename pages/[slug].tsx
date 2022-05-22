import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { andThen, map, pipe } from "ramda";
import { assert } from "@sindresorhus/is";
import Container from "components/container";
import Layout from "components/layout";
import SelectLang from "components/select-lang";
import { FS, Path, head } from "lib/utils";

const ROOT = "posts";
const EXT = ".{md,mdx}";
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
const check = async (ctx: GetStaticPropsContext) => {
  assert.string(ctx.params?.slug);
  assert.string(ctx.locale);

  return Path.format({
    name: Path.join(ROOT, ctx.locale, ctx.params.slug),
    ext: EXT,
  });
};
export const getStaticProps = pipe(
  check,
  andThen(FS.glob),
  andThen(head),
  andThen(Path.format),
  andThen(FS.readFile),
  andThen(parse),
  andThen((source) => ({
    props: { source },
  }))
);

interface Meta {
  title?: string;
  description?: string;
}
const meta = (data: any): Meta => data;

type Props = {
  source: MDXRemoteSerializeResult;
};
const Page = ({ source }: Props) => (
  <Layout>
    <Container>
      <Head>
        <title>{meta(source.frontmatter)?.title}</title>

        {meta(source.frontmatter)?.description && (
          <meta
            name="description"
            content={meta(source.frontmatter).description}
          />
        )}
      </Head>

      <article className="prose prose-h1:text-green-500">
        <MDXRemote {...source} components={{ SelectLang }} />
      </article>
    </Container>
  </Layout>
);

export default Page;

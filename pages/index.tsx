import { GetStaticProps } from "next";
import Link from "next/link";
import Container from "components/container";
import Layout from "components/layout";
import { FS, Path } from "lib/utils";
import { evolve, map, pipe } from "ramda";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    posts: await FS.glob("posts/**/*.{md,mdx}").then(
      map(
        pipe(
          evolve({
            dir: Path.relative("posts"),
          }),
          ({ dir, name }) => Path.join(dir, name)
        )
      )
    ),
  },
});

type Props = {
  posts: string[];
};
const Index = ({ posts }: Props) => (
  <Layout>
    <Container>
      <ul>
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/${post}`}>
              <a>{post}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  </Layout>
);

export default Index;

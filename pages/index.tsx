import Container from "components/container";
import Layout from "components/layout";

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const Index = () => (
  <Layout>
    <Container></Container>
  </Layout>
);

export default Index;

import Footer from "./footer";
import Meta from "./meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Meta />
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
    <Footer />
  </>
);

export default Layout;

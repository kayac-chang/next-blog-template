import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => (
  <div className={clsx("container mx-auto", className)}>{children}</div>
);

export default Container;

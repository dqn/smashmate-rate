import "../globals.css";

export const metadata = {
  title: "Smashmate Rate",
  description: "Smashmate rate observer",
};

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default Layout;

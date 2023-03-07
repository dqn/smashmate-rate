type Props = {
  params: {
    id: string;
  };
};

const Head: React.FC<Props> = ({ params }) => {
  const title = `MATE ID: ${params.id} | Smashmate Rate`;

  return (
    <>
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Genos&family=Tilt+Warp&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default Head;

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
    </>
  );
};

export default Head;

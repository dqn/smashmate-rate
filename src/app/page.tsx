const Home: React.FC = () => {
  return (
    <main className="text-center">
      <h1 className="text-5xl font-bold mt-10">Smashmate Rate</h1>
      <h2 className="font-bold text-lg mt-10">使い方</h2>
      <p className="my-10 font-sans text-center">
        URL の後ろに{" "}
        <code className="bg-gray-300 rounded-md p-1">/MATE-ID</code>{" "}
        をつけてください。
      </p>
    </main>
  );
};

export default Home;

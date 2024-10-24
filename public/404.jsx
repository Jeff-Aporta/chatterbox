function App() {
  return (
    <div className={`error-404`}>
      <Content />
    </div>
  );

  function Content() {
    return (
      <div className="content">
        <Text />
        <Logo404 width={400} />
      </div>
    );

    function Text() {
      return (
        <div className="text">
          <h1>¿Te has equivocado de camino?</h1>
          <div>
            Parece que te has perdido, abejita
            <br />
            <br />
            <Button variant="contained" href="/" size="large">
              Inicio
            </Button>
          </div>
        </div>
      );
    }
  }
}

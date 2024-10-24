function App() {
  return (
    <Paper className="container-mp">
      <Typography variant="h2">Bienvenido</Typography>
      En construcción.
      <hr />
      <h2>Logged</h2>
      <h2>
        <a href="/user/logged/">logged</a>
      </h2>
      <hr />
      <h2>Unlogged</h2>
      <h2>
        <a href="/user/unlogged/login">login</a>
      </h2>
      <h2>
        <a href="/user/unlogged/register">register</a>
      </h2>
    </Paper>
  );
}

ReactDOM.render(<App />, document.querySelector("body"));

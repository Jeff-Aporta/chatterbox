const Components = {
  MenuTop: () => {
    return (
      <Paper elevation={0} className="menu-top">
        <LogoBanner className="bright-hover" />
        <div className="right">
          {window["login"] ? <ButtonSignup /> : <ButtonLogin />}
        </div>
      </Paper>
    );

    function ButtonSignup() {
      return (
        <Button
          variant="contained"
          color="atentionBlue"
          endIcon={<i className="fa fa-user-edit" />}
          href="/user/unlogged/register"
        >
          <span className="ab--tt-uppercase">Registrate</span>
        </Button>
      );
    }

    function ButtonLogin() {
      return (
        <Button
          endIcon={<i className="fa fa-user" />}
          variant="contained"
          color="atentionGreen"
          href="/user/unlogged/login"
        >
          <span className="ab--tt-uppercase">Iniciar sesión</span>
        </Button>
      );
    }
  },
};

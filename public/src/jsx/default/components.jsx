const Components = {
  MenuTop: () => {
    return (
      <div className="menu-top">
        <LogoBanner className="bright-hover" />
        <div className="right">
          {window["login"] ? <ButtonSignup /> : <ButtonLogin />}
        </div>
      </div>
    );

    function ButtonSignup() {
      return (
        <Button
          variant="contained"
          endIcon={<i className="fa fa-user-edit" />}
          color="primary"
          href="/user/unlogged/register"
        >
          Registrate
        </Button>
      );
    }

    function ButtonLogin() {
      return (
        <Button
          endIcon={<i className="fa fa-user" />}
          color="inherit"
          href="/user/unlogged/login"
        >
          Iniciar sesión
        </Button>
      );
    }
  },
};

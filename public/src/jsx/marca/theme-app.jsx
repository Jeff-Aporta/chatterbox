const ThemeApp = {
  Default: function () {
    return ThemeApp.Simple({ prefix: <Components.MenuTop /> });
  },
  Simple: function ({ prefix }) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`page ${themename}`}>
          {prefix}
          <div className="app">
            <App />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

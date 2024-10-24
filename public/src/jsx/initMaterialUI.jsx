Object.assign(window, window["MaterialUI"]);

let palette = (() => {
  const white = {
    main: "#fff",
    contrastText: "#000",
  };
  const black = {
    main: "#000",
    contrastText: "#fff",
  };
  const contrastText = isThemeDark ? "#fff" : "#000";
  const uncontrastText = isThemeDark ? "#000" : "#fff";
  return {
    primary: {
      main: "#1E90FF",
      contrastText,
    },
    secondary: {
      main: isThemeDark ? "#387FC7" : "#ccccff",
      contrastText,
    },
    success: {
      main: "#32CD32",
      contrastText,
    },
    atentionBlue: {
      main: "#00BFFF",
      contrastText: uncontrastText,
    },
    atentionGreen: {
      main: "#00FA9A",
      contrastText: uncontrastText,
    },
    white,
    black,
    contrast: isThemeDark ? white : black,
    uncontrast: isThemeDark ? black : white,
  };
})();

const darkTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#03030f",
      paper: "#05051f",
    },
    ...palette,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...palette,
  },
});

let theme = isThemeDark ? darkTheme : lightTheme;
theme = responsiveFontSizes(theme);

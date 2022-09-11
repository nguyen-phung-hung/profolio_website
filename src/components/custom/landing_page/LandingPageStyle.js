const landingStyles = {
  main_container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(25, 4%)",
    gridTemplateRows: "repeat(25, 4%)",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    "&:nth-child(1)": {
      gridArea: "8 / 2 / 17 / 5",
    },
    "&:nth-child(2)": {
      gridArea: "11/ 19 / 23 /23",
    },
    "&:nth-child(3)": {
      gridArea: "8 / 10 / 19 / 17",
    },
    "&:nth-child(4)": {
      gridArea: "20 / 3/ 26 / 8",
    },
    "&:nth-child(5)": {
      gridArea: "2 / 5 / 6 / 9",
    },
    "&:nth-child(6)": {
      gridArea: "2 / 17 / 7 / 22",
    },
    "&:nth-child(7)": {
      gridArea: "4 / 18 /13 / 21",
    },
  },
  image_inner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  element: {
    position: "relative",
    width: "10vw",
    height: "10vw",
    zIndex: 11,
    "&:nth-child(8)": {
      gridArea: "4 / 20 /13 / 21",
    },
    "&:nth-child(9)": {
      gridArea: "6 / 10 /8 / 10",
    },
    "&:nth-child(10)": {
      gridArea: "12 / 17 /12 / 18",
      transform: "rotate(70deg)",
    },
    "&:nth-child(11)": {
      gridArea: "1 / 1 /1 / 1",
      transform: "rotate(-30deg)",
      width: "40vw",
      height: "40vw",
      zIndex: 0,
    },
    "&:nth-child(12)": {
      gridArea: "18 / 8 /19 / 8",
      width: "12vw",
      height: "12vw",
      zIndex: 11,
    },
  },
  slogan_text: {
    gridArea: "22/11/23/16",
    width: "100%",
    fontWeight: 100,
    fontFamily: "Noto Serif HK, serif",
    fontSize: "1vw",
    textAlign: "center",
  },
};

export default landingStyles;

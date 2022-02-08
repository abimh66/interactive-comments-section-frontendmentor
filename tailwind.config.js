module.exports = {
  mode: "jit",
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik"],
      },
      colors: {
        primary: {
          blue: "hsl(238, 40%, 52%)",
          softRed: "hsl(358, 79%, 66%)",
          lightBlue: "hsl(239, 57%, 85%)",
          paleRed: "hsl(357, 100%, 86%)",
        },
        neutral: {
          darkBlue: "hsl(212, 24%, 26%)",
          grayBlue: "hsl(211, 10%, 45%)",
          lightGray1: "hsl(223, 19%, 93%)",
          lightGray2: "hsl(228, 33%, 97%)",
        },
      },
    },
  },
  plugins: [],
};

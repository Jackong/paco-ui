module.exports = {
  functions: {
    em: (normalSize, fontSize) => {
      return `${(eval(normalSize) / fontSize.slice(0, -2)).toPrecision(6)}em`;
    },
  },
};

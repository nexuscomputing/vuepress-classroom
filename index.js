const { path } = require("@vuepress/shared-utils");
const container = require("markdown-it-container");

function questionContainer(type, defaultTitle) {
  return [
    container,
    type,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const answer = token.info
          .trim()
          .slice(type.length)
          .trim();

        const title = defaultTitle;
        if (token.nesting === 1) {
          return `<InputBox class="${type} custom-block" correctAnswer="${answer}"><p class="custom-block-title">${title}</p>\n`;
        } else {
          return `</InputBox>\n`;
        }
      }
    }
  ];
}

module.exports = {
  enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFile.js")],
  extendMarkdown: md => {
    md.use(...questionContainer("question", "Frage"));
  }
  // globalUIComponents: ["Question", "InputBox"]
};

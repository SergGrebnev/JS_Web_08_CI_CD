const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jiyr4g',
  e2e: {
    retries: 2,
    baseUrl: "https://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

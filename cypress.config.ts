import { defineConfig } from 'cypress';
import { beforeRunHook, afterRunHook } from 'cypress-mochawesome-reporter/lib';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: '2022 鐵人賽範例',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        await afterRunHook();
      });
    },
  },
});

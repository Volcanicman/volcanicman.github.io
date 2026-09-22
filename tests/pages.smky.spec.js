'use strict';

const path = require('path');
const { test, expect } = require('@playwright/test');
const { registerYamlTests } = require('smky');

registerYamlTests({
  test,
  expect,
  root: path.join(__dirname, 'pages'),
});

// smky's element "contains" uses toContainText, which reads <title> as empty
// because it is not visible. This is the one check YAML cannot make.
test('document title names the site', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Volcanic International/);
});

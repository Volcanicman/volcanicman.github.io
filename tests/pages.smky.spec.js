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

// smky has no viewport step. `lacks` is an exact text match, so it cannot
// assert that the page does not contain a phrase.
test.describe('phone width', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('video poster stays inside the viewport', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const video = page.locator('#video');
    await expect(video.locator('a[href="https://vimeo.com/212780263"]')).toHaveCount(1);
    await expect(video.locator('iframe')).toHaveCount(0);

    const box = await video.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
    expect(box.height).toBeGreaterThan(100);

    const text = (await page.locator('body').innerText()).toLowerCase();
    expect(text).not.toContain('an error occurred');
    expect(text).not.toContain('load error');
    expect(errors.join('\n')).not.toContain('globalPrivacyControl');
  });
});

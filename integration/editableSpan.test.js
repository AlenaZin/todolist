describe('editableSpan', () => {
  it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=editablespan-component--editable-span-base-exampe&viewMode=story',
        {waitUntil: "networkidle2"});

      const image = await page.screenshot();

      // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
});
});

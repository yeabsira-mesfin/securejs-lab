import {test,expect} from '@playwright/test';

test('interactive secure demos work in Chromium and remain accessible at mobile width',async({page},testInfo)=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{name:/Understand the flaw/})).toBeVisible();
 await page.getByRole('button',{name:/Run safe example/}).click();
 await expect(page.getByRole('status')).toContainText('demo@example.test');
 await page.getByRole('button',{name:/Prototype pollution/}).first().click();
 await page.getByRole('button',{name:/Run safe example/}).click();
 await expect(page.getByRole('status')).toContainText('Unsafe object key rejected');
 await page.getByRole('button',{name:/DOM XSS/}).first().click();
 await page.getByRole('button',{name:/Run safe example/}).click();
 await expect(page.getByRole('status')).toContainText('executedAsMarkup');
 await expect(page.getByRole('status')).toContainText('false');
 await page.screenshot({path:testInfo.outputPath('securejs-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await expect(page.getByRole('navigation',{name:'Security modules'})).toBeVisible();
 await page.getByRole('button',{name:'Curriculum'}).click();
 await expect(page.getByRole('heading',{name:'ES6 to secure engineering'})).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('securejs-mobile.png'),fullPage:true});
 const horizontalOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 expect(horizontalOverflow).toBeLessThanOrEqual(1);
});

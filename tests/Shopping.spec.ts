import { test, expect } from '@playwright/test';
import{ LoginPage } from '../pages/LoginPage';
import{ HomePage } from '../pages/HomePage';
import { Shopping } from '../pages/Shopping';
test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const shopping = new Shopping(page);
    //Navigate to the demo page
    await homePage.goto();
    //Click log in link
    await homePage.loginClick();
    //Log in with correct credentials
    await loginPage.loginUser("taylorswift30@yopmail.com", "taylor@123");
    await shopping.clearCart();
});

test('Dashboard Test', async ({ page }) => {
    const shopping = new Shopping(page);
    //Hover over computers menu
    await shopping.computermenuHover();
    //Verify that we have navigate to Notebooks page
    await expect(page.locator('.breadcrumb')).toHaveText('Home / Computers / Desktops');
    await expect(shopping.pageTitle).toHaveText('Desktops');
    //Choose 4 from display dropdown
    await shopping.pageSize.selectOption('4');
    //Verify that only 4 items are displayed
    await expect(shopping.productItem).toHaveCount(4);
    //Filter by price '1000.00 - 1200.00'
    await page.getByRole('link', {name: '1000.00 - 1200.00' }).click();
    //Verify that only 1 item is displayed
    await expect(shopping.productItem).toHaveCount(1);
    //Remove filter 
    await page.locator('div.remove-filter').locator('.remove-price-range-filter').click();
    //Add third item to shopping cart
    await shopping.AddtoCart1(2,'shopping cart');
    //Navigate back desktop page
    await shopping.desktopLinkClick();
    //Add first item to shopping cart
    await shopping.AddtoCart2(0,'shopping cart');
    //Verify shopping cart on menu bar display 2
    await expect(shopping.cartQty).toContainText('(2)');
    //Hover over Electronic
    await shopping.electronicmenuHover();
    //Verify that we have navigate to Electronic page
    await expect(shopping.pageTitle).toHaveText('Cell phones');
    //Click Add to wishlist button of first item 
    await shopping.productTitle.first().click();
    //Add the first item to wishlist
    await page.locator('#add-to-wishlist-button-43').click();
    //Verify that 'The product has been added to you' is dispalyed
    await shopping.barNotificationSuccess("wishlist");
    //Verify shopping cart on menu bar display 1
    await expect(shopping.wishlistQty).toContainText('(1)')
 });

 test.only('shopping Cart', async ({ page }) => {
    const shopping = new Shopping(page);
    const homePage = new HomePage(page);
     //Hover over computers menu
    await shopping.computermenuHover();
     //Add third item to shopping cart
    await shopping.AddtoCart1(2,'shopping cart');
    //Navigate back desktop page
    await shopping.desktopLinkClick();
    //Add first item to shopping cart
    await shopping.AddtoCart2(0,'shopping cart');
    //Hover over shopping cart link
    await homePage.cartLink.first().hover();
    //Verify 'Go To Cart' button is displayed
    await expect(page.getByRole('button', {name: 'Go To Cart'})).toBeVisible();
    //CLick Go To Cart button
    await page.getByRole('button', {name: 'Go To Cart'}).click();
    await page.waitForTimeout(5000); // Wait 5 seconds
    //Verify that we have navigate to Shopping Cart Page
    await expect(shopping.pageTitle).toHaveText('Shopping cart');
    //Verify that 'Update shopping Cart' and 'Continue shopping' are displayed
    await expect(shopping.updateCart).toBeVisible();
    await expect(shopping.continueShopping).toBeVisible();
    //Verify that the prices for all items is equal to Total price in the end of page
    const orderTotaltxt = await page.locator('.product-price.order-total').textContent();
    const subTotal1txt = await page.locator('.product-subtotal').nth(0).textContent();
    const subTotal2txt = await page.locator('.product-subtotal').nth(1).textContent();
    const subTotal1 = parseFloat(subTotal1txt?.trim() || "0");
    const subTotal2 = parseFloat(subTotal2txt?.trim() || "0");
    const orderTotal = parseFloat(orderTotaltxt?.trim() || "0");
    const sumofAll = subTotal1 + subTotal2;

    await expect(sumofAll).toBeLessThan(orderTotal);
 
 });

test('Empty Shopping Cart Test', async ({ page }) => {
    const shopping = new Shopping(page);
    const homePage = new HomePage(page);
    //Hover over computers menu
    await shopping.computermenuHover();
     //Add third item to shopping cart
    await shopping.AddtoCart1(2,'shopping cart');
    //Navigate back desktop page
    await shopping.desktopLinkClick();
    //Add first item to shopping cart
    await shopping.AddtoCart2(0,'shopping cart');
    //Click shopping cart link
    await homePage.cartLink.first().click();
    //Verify items count in cart
    await expect(shopping.cartQty).toContainText('(2)');
    //Remove the first item on shopping cart
    await shopping.removeCart.first().click();
    //CLick on 'Update Shopping Cart' button
    await shopping.updateCart.click();
    //Verify items count is decreased by 1
    await expect(shopping.cartQty).toContainText('(1)');
    //Click on remove check box
    await shopping.removeCart.first().click();
    //Click 'Update Shoppping Cart' button
    await shopping.updateCart.click();
    //Verify items count is decreased by 1
    await expect(shopping.cartQty).toContainText('(0)');
    //Verify that shopping cart is empty
    await expect(page.locator('.order-summary-content')).toContainText("Your Shopping Cart is empty!");
 });


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import{ HomePage } from '../pages/HomePage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    //Navigate to the demo page
    await homePage.goto();
    //Click log in link
    await homePage.loginClick();
});

test('Log in Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  //Log in with correct credentials
  await loginPage.loginUser("taylorswift30@yopmail.com", "taylor@123");
  //Verify 'Welcome to our store' is dispalyed
  await expect(homePage.welcomeTitle).toContainText('Welcome to our store');
  //Verify mail and log out is displayed
  await expect(homePage.accountLink).toBeVisible();
  await expect(homePage.accountLink).toHaveText("taylorswift30@yopmail.com");
  await expect(homePage.logoutLink).toBeVisible();
  await expect(homePage.logoutLink).toHaveText("Log out");
  //Click log out
  await homePage.logOutClick();
 });

test('Incorrect mail log in test', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  //Log in with incorrect mail
  await loginPage.loginUser("invalidmail@yopmail.com", "taylor@123");

  //Verify expected error message is displayed
  await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessage).toContainText('No customer account found');

 });

 test('Incorrect password log in test', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  //Log in with incorrect pwd
  await loginPage.loginUser("taylorswift30@yopmail.com", "12345");

  //Verify expected error message is displayed
  await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessage).toContainText('The credentials provided are incorrect');

 });


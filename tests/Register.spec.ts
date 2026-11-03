import { test, expect } from '@playwright/test';
import{ RegisterPage } from '../pages/RegisterPage';
import{ HomePage } from '../pages/HomePage';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  //Navigate to the demo page
  await homePage.goto();
  //Click Register link
  await homePage.registerClick();
});

 test('Register New User', async ({ page }) => {
  const homePage = new HomePage(page);
  const register = new RegisterPage(page);
  //Verify title of the page
  await expect(register.pageTitle).toContainText('Register');
  //Fill the register
  await register.registerUser("Taylor", "Swift", "taylorswift30123@yopmail.com", "taylor@123")
  //Verify register is successful 
  await expect(register.registerResultMessage).toContainText('Your registration completed');
  //Click on contiue button
  await register.registerContinue();
  //Click on log out link
  await homePage.logOutClick();
 });

test('Register Existing User', async ({ page }) => {
  const register = new RegisterPage(page);
  const homePage = new HomePage(page);
  //Fill the existing user
  await register.registerUser("Taylor", "Swift", "taylorswift30@yopmail.com", "taylor@123")
  //Verify expected error message is displayed
  await expect(register.validmessageError).toContainText('The specified email already exists');
  // Verify user remain logs out
  await expect(homePage.registerLink).toBeVisible();
  await expect(homePage.registerLink).toHaveText("Register");
  await expect(homePage.loginLink).toBeVisible();
  await expect(homePage.loginLink).toHaveText("Log in");
});





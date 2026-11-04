import { Page,Locator } from "@playwright/test";

export class RegisterPage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly maleGender: Locator;
    readonly femaleGender: Locator;
    readonly firstName: Locator;
    readonly LastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;
    readonly registerResultMessage: Locator;
    readonly registerContinueButton: Locator;
    readonly validmessageError: Locator;

    constructor(page: Page){
          this.page = page;
          this.pageTitle = page.locator('div.page-title');
          this.maleGender = page.locator('#gender-male');
          this.femaleGender = page.locator('#gender-female');
          this.firstName = page.getByRole('textbox', {name: 'First name'});
          this.LastName = page.getByRole('textbox', {name: 'Last name'});
          this.email = page.getByRole('textbox', {name: 'Email'});
          this.password = page.locator('#Password');
          this.confirmPassword = page.locator('#ConfirmPassword');
          this.registerButton = page.getByRole('button', {name: 'Register'});
          this.registerResultMessage = page.locator('div.registration-result-page');
          this.registerContinueButton = page.locator('input.register-continue-button')
          this.validmessageError = page.locator('div.validation-summary-errors')

    }

  
    async registerUser(firstName: string, lastName: string, email: string, pass: string) {
     await this.femaleGender.click();
     await this.firstName.fill(firstName);
     await this.LastName.fill(lastName);
     await this.email.fill(email);
     await this.password.fill(pass);
     await this.confirmPassword.fill(pass);
     await this.registerButton.click();
   
  }

  async registerContinue() {
    await this.registerContinueButton.click();
}
}
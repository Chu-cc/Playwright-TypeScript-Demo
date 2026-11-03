import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly logInButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.locator('#Password');
        this.logInButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.locator('div.validation-summary-errors');
    }

    async loginUser(email: string, pass: string) {
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.logInButton.click();
    }
}
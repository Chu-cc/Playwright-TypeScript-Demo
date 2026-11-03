import { Page,Locator } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly accountLink: Locator;
    readonly logoutLink: Locator;
    readonly cartLink: Locator;
    readonly wishListLink: Locator;
    readonly welcomeTitle: Locator;
    readonly headerLink: Locator;
  

    constructor(page: Page){
          this.page = page;
          this.registerLink = page.getByRole('link', {name: 'Register'});
          this.loginLink = page.getByRole('link', { name: 'Log in' });
          this.accountLink = page.locator('div.header-links').locator('a.account');
          this.logoutLink = page.getByRole('link', {name: 'Log out'});
          this.cartLink = page.getByRole('link', {name: 'Shopping cart'});
          this.wishListLink = page.getByRole('link', {name: 'Wishlist'});
          this.welcomeTitle = page.locator('.topic-html-content-header');
          this.headerLink = page.locator('div.header-links');
    }
    async goto() {    
        await this.page.goto('https://demowebshop.tricentis.com/');
    }
    async loginClick(){
             await this.loginLink.click();
    }
    async registerClick(){
        await this.registerLink.click();
    }
    async logOutClick() {    
        await this.logoutLink.click();
    }
}
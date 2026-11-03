import { Page, Locator, expect} from "@playwright/test";

export class Shopping{
    readonly page: Page;
    readonly computerMenu: Locator;
    readonly electronicMenu: Locator;
    readonly desktopSubMenu: Locator;
    readonly pageSize: Locator;
    readonly productItem: Locator;
    readonly addtocartButton: Locator;
    readonly barNotification: Locator;
    readonly desktopLink: Locator;
    readonly electronicSubMenu: Locator;
    readonly pageTitle: Locator;
    readonly cartQty: Locator;
    readonly wishlistQty: Locator;
    readonly updateShoppingCart: Locator;
    readonly continueShopping: Locator;
    readonly removeCart: Locator;
    readonly productTitle: Locator;

    constructor(page: Page){
          this.page = page;
          this.computerMenu = page.locator('div.header-menu').getByRole('link', { name: 'Computers'});
          this.electronicMenu = page.locator('div.header-menu').getByRole('link', { name: 'Electronics'});
          this.desktopSubMenu = page.getByRole('link', { name :'Desktops'});
          this.electronicSubMenu = page.getByRole('link', { name :'Cell phones'});
          this.pageSize = page.locator('#products-pagesize');
          this.productItem = page.locator('div.product-item');
          this.addtocartButton = page.getByRole('button',{name : 'Add to cart'});
          this.barNotification = page.locator('#bar-notification');
          this.desktopLink = page.locator('.breadcrumb').getByRole('link', {name : 'Desktops'});
          this.pageTitle = page.locator('div.page-title h1');
          this.cartQty = page.locator('.cart-qty');
          this.wishlistQty = page.locator('.wishlist-qty');
          this.updateShoppingCart = page.getByRole('button',{name: 'Update shopping Cart'});
          this.continueShopping = page.getByRole('button',{name: 'Continue shopping'});
          this.removeCart = page.locator('input[name="removefromcart"]');
          this.productTitle = page.locator('div.product-title');
          
    }
   
    async computermenuHover(){
        await this.computerMenu.hover();
        await this.desktopSubMenu.click();

    }

     async electronicmenuHover(){
        await this.electronicMenu.hover();
        await this.electronicSubMenu.click();

    }

    async pageSizeClick(){
        await this.pageSize.click();
    }

    async addtocartButtonClick(index: number){
        await this.addtocartButton.nth(index).click();

       
    }
    async barNotificationSuccess(context : string){
        await expect(this.barNotification).toContainText(`The product has been added to your ${context}`);

    }

    async desktopLinkClick(){
        await this.desktopLink.click();
    }

     
    
}
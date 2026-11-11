import { Page, Locator, expect} from "@playwright/test";
import{ HomePage } from './HomePage';

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
    readonly cellPhoneLink: Locator;
    readonly cellPhoneSubMenu: Locator;
    readonly pageTitle: Locator;
    readonly cartQty: Locator;
    readonly wishlistQty: Locator;
    readonly updateCart: Locator;
    readonly continueShopping: Locator;
    readonly removeCart: Locator;
    readonly productTitle: Locator;
    readonly estimateShoppingTitle: Locator;
    readonly countryDropdown: Locator;
    readonly stateProvinceDropdown: Locator;
    readonly zipPostalCodeInput: Locator;
    readonly estimateShippingButton: Locator;

    constructor(page: Page){
          this.page = page;
          this.computerMenu = page.locator('div.header-menu').getByRole('link', { name: 'Computers'});
          this.electronicMenu = page.locator('div.header-menu').getByRole('link', { name: 'Electronics'});
          this.desktopSubMenu = page.getByRole('link', { name :'Desktops'});
          this.cellPhoneSubMenu = page.getByRole('link', { name :'Cell phones'});
          this.pageSize = page.locator('#products-pagesize');
          this.productItem = page.locator('div.product-item');
          this.addtocartButton = page.getByRole('button',{name : 'Add to cart'});
          this.barNotification = page.locator('#bar-notification');
          this.desktopLink = page.locator('.breadcrumb').getByRole('link', {name : 'Desktops'});
          this.cellPhoneLink = page.locator('.breadcrumb').getByRole('link', {name : 'Cell phones'});
          this.pageTitle = page.locator('div.page-title h1');
          this.cartQty = page.locator('.cart-qty');
          this.wishlistQty = page.locator('.wishlist-qty');
          this.updateCart = page.locator('input[name="updatecart"]');
          this.continueShopping = page.getByRole('button',{name: 'Continue shopping'});
          this.removeCart = page.locator('input[name="removefromcart"]');
          this.productTitle = page.locator('div.product-item').locator('h2.product-title');
          this.estimateShoppingTitle = page.locator('div.estimate-shipping').locator('div.title strong');
          this.countryDropdown = page.locator('#CountryId');
          this.stateProvinceDropdown = page.locator('#StateProvinceId');
          this.zipPostalCodeInput = page.locator('#ZipPostalCode');
          this.estimateShippingButton = page.locator('input[name="estimateshipping"]');
          
    }

    async clearCart(){
         const homePage = new HomePage(this.page);
         //Click shopping cart link
         await homePage.cartLink.first().click();
         while (await this.removeCart.count() > 0) {
           await this.removeCart.first().click();
        
           await this.updateCart.click();
        }
       
         
    }
    

    async clearWishlist(){
         const homePage = new HomePage(this.page);
         //Click wishlist link
         await homePage.wishListLink.first().click();
         while (await this.removeCart.count() > 0) {
           await this.removeCart.first().click();
        
           await this.updateCart.click();
        }
    }
 

    async AddtoCart1(index: number){
        //Click Add to cart button of first item
        await this.addtocartButton.nth(index).click();
        //Add the first item to shopping cart
         await this.page.locator('#add-to-cart-button-74').click(); 
    }

    async AddtoCart2(index: number){
        //Click Add to cart button of second item
        await this.addtocartButton.nth(index).click();
        //Add the first item to shopping cart
         await this.page.locator('#add-to-cart-button-72').click();
    }

     async AddtoCart3(index: number){
        //Click Add to cart button of first item
        await this.addtocartButton.nth(index).click();
        //Add the first item to shopping cart
         await this.page.locator('#add-to-cart-button-16').click(); 
    }

   //Hover over computer menu and choose desktop 
    async navigatetoDesktopMenu(){
        await this.computerMenu.hover();
        await this.desktopSubMenu.click();

    }
    //Hover over electonic menu and choose cellphone
     async navigatetoCellPhoneMenu(){
        await this.electronicMenu.hover();
        await this.cellPhoneSubMenu.click();

    }

    async pageSizeClick(){
        await this.pageSize.click();
    }

    async addtocartButtonClick(index: number){
        await this.addtocartButton.nth(index).click();

       
    }
   

    async desktopLinkClick(){
        await this.desktopLink.click();
    }

     async cellPhoneLinkClick(){
        await this.cellPhoneLink.click();
    }

     
    
}
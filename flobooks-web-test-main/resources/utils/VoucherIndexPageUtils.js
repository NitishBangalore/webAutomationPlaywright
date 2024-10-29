class VoucherIndexPageUtils{

    static async scrollPage(noOfPages,page){
        const pageSize = await page.viewportSize();
        await page.mouse.move(pageSize.width/2,pageSize.height/2);
        await page.mouse.wheel(0, noOfPages*2000);
    }

}
module.exports =  {VoucherIndexPageUtils};
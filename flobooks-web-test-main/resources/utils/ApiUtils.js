class APiUtils {


    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://niobooks.in/api/web/authenticat",
            {
                data: this.loginPayLoad
            })//200,201,
        const loginResponseJson = await loginResponse.json();
        const { token } = loginResponseJson;
        console.log(token);
        return token;

    }
}
module.exports = { APiUtils };
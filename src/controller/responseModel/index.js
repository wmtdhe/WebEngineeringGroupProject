
/**
 * standardize response format
 */

class Response{
    constructor({errno, data, msg}){
        this.errno = errno;
        if(data){
            this.data = data;
        }
        if(msg){
            this.msg = msg;
        }
    }
}

class SuccessResponse extends Response{
    constructor(data={}) {
        super({errno: 0, data}); // 0 for success requests
    }

}

class FailureResponse extends Response{
    constructor(errno, msg) {
        super({
            errno,
            msg
        });
    }

}

module.exports = {
    SuccessResponse,
    FailureResponse
};
export class APIResponse {

    static success (data=null, message="") {
        return {success: true, data, message, timestamp:new Date().getTime()};
    }
    
    static fail(err=null, message="INTERNAL SERVER ERROR"){
        return {success: false, error: err, message, timestamp:new Date().getTime()};
    }
}
class Output{
    static create(code = 1000, data = {}){
        return {code: code, message: this.responseMessage(code), data};
    }

    static responseMessage(code = 1000) {
         const message = {
            1000: 'OK',
            9991: 'Spam',
            9992: 'Product is not existed',
            9993: 'Code verify is incorrect',
            9994: 'No Data or end of list data',
            9995: 'User is not validated',
            9996: 'User existed.',
            9997: 'Method is invalid',
            9998: 'Token is invalid.',
            9999: 'Exception error.',
            1001: 'Can not connect to DB.',
            1002: 'Parameter is not enought.',
            1003: 'Parameter type is invalid.',
            1004: 'Parameter value is invalid.',
            1005: 'Unknown error.',
            1006: 'File size is too big.',
            1007: 'Upload File Failed!.',
            1008: 'Maximum number of images.',
            1009: 'Not access.',
            1010: 'action has been done previously by this user.',
            1011: 'The product has been sold.',
            1012: 'Address does not support Shipping.',
            1013: 'Url User\'s is exist.',
            1014: 'Promotional code expired.',
            1015: 'Can not process bank card.',
            1016: 'Policy Violation, not support weight over 20KG & price over 30M',
            1017: 'Change Username: requires minimum 30 days',
            1018: 'Change Username: same other name',
    
            0: 'request',
            1: 'accept',
            2: 'shipping',
            3: 'waitting rate',
            4: 'success',
            5: 'failed',
            6: 'Reject',
            12: 'Chờ duyệt vận đơn',
            13: 'Đã duyệt',
            14: 'Đang lấy hàng',
            15: 'lấy hàng không thành công',
            16: 'lấy hàng thành công',
            17: 'đang phát hàng',
            18: 'phát hàng không thành công',
            19: 'phát hàng thành công',
            20: 'chờ xác nhận chuyển hoàn',
            21: 'Đang chuyển hoàn',
            22: 'hủy đơn hàng'
        };
        return message[code];
    }
    
}

module.exports = Output;
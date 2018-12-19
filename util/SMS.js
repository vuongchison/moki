class SMS {
    static send(phonenumber, content) {
        var PhoneNumber = require('awesome-phonenumber');
        var pn = new PhoneNumber(phonenumber, 'VN');
        var internationalPhonenumber = pn.getNumber();

        var twilio = require('twilio');
        var accountSid = 'ACdaa80ab0aaaa360bc8242bbf1474c8b7'; // Your Account SID from www.twilio.com/console
        var authToken = 'adf70bb174102f87c1bb22218949b30f';   // Your Auth Token from www.twilio.com/console

        var twilio = require('twilio');
        var client = new twilio(accountSid, authToken);

        client.messages.create({
            body: content,
            to: internationalPhonenumber,  // Text this number
            from: '+18543335046' // From a valid Twilio number
        });
    }
}

module.exports = SMS;
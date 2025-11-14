public with sharing class RazorpayOrderService {

    @AuraEnabled
    public static Map<String, Object> createOrder(Integer amountValue) {

        String keyId     = 'rzp_test_XXXXXXXXXXXX';   // <-- Replace
        String keySecret = 'YOUR_OWN_API_KEY';         // <-- Replace

        String authHeader = 'Basic ' +
            EncodingUtil.base64Encode(Blob.valueOf(keyId + ':' + keySecret));

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.razorpay.com/v1/orders');
        req.setMethod('POST');
        req.setHeader('Authorization', authHeader);
        req.setHeader('Content-Type', 'application/json');

        Integer amountInPaise = amountValue * 100;

        Map<String, Object> body = new Map<String, Object>();
        body.put('amount', amountInPaise);
        body.put('currency', 'INR');
        body.put('receipt', 'rcpt_' + DateTime.now().getTime());

        req.setBody(JSON.serialize(body));

        Http http = new Http();
        HTTPResponse res = http.send(req);

        System.debug('### STATUS: ' + res.getStatusCode());
        System.debug('### RESPONSE: ' + res.getBody());

        if (res.getStatusCode() == 200 || res.getStatusCode() == 201) {
            Map<String,Object> parsed = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());

            Map<String,Object> result = new Map<String,Object>();
            result.put('id', (String) parsed.get('id'));
            result.put('amount', (Integer) parsed.get('amount'));
            result.put('currencyCode', (String) parsed.get('currency'));

            return result;
        }

        throw new AuraHandledException('Razorpay Error: ' + res.getBody());
    }
}
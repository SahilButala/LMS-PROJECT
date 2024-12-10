import paypal from 'paypal-rest-sdk'

paypal.configure( {
    mode : 'sandbox',
    client_id : 'AQSYtKeaY1MuV0GJTuOwhN3Le1ThkKQ7AthiSyXWkxmLLdjZzSjEsktDYbk1WHVSAotpHIW9XGKVvmE5',
    client_secret : "ENA_4UnnOitEzlDNkH6e3SMJjuLChVs-Ml6HeTxRrqztJtvs_dY8AZkqB9hfSUPIGZhkRzwL6AMhmB9-"
})

export default paypal   
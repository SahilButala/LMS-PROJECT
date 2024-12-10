import express from 'express'
import {createOrder, capturePaymentFinalOrder} from '../../controllers/OrderController.js'
const Order_Route = express.Router()

Order_Route.post('/create',createOrder)
Order_Route.post('/finalize',capturePaymentFinalOrder)


export default Order_Route
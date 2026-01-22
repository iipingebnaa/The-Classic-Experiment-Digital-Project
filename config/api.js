const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

export const API = {
  // =====================
  // CUSTOMERS
  // =====================

  // Create customer (SIGNUP)
  createCustomer: `${BASE_URL}/customers`,



  // Get customer by phone (scoped to company)
  getCustomerByPhone: (phoneNumber) =>
    `${BASE_URL}/customers?company=${COMPANY_ID}&phone_number=${encodeURIComponent(
      phoneNumber
    )}`,

  // =====================
  // AUTH / ACCOUNT
  // =====================
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
  verifyCode: `${BASE_URL}/verify-code`,

  


  createOrder: `${BASE_URL}/sales_orders`,

  getOrderById: (orderId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_SALES_ORDER_BY_ID.replace(
      ":orderId",
      orderId
    )}`,

  getOrdersByUser: (userId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_SALES_ORDER_BY_USER.replace(
      ":userId",
      userId
    )}`,

  getOrderStatus: (orderId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_SALES_ORDER_STATUS.replace(
      ":orderId",
      orderId
    )}`,

  updateOrder: (orderId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_UPDATE_SALES_ORDER.replace(
      ":orderId",
      orderId
    )}`,

  // =====================
  // BILLING
  // =====================
  getInvoice: (orderId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_INVOICE.replace(
      ":orderId",
      orderId
    )}`,

  createPayment: `${BASE_URL}${process.env.NEXT_PUBLIC_API_PAYMENT}`,

  // =====================
  // SERVICES
  // =====================
  getItems: () => `${BASE_URL}/items?company=${COMPANY_ID}`,
};

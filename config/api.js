const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  // AUTH
  register: `${BASE_URL}${process.env.NEXT_PUBLIC_API_REGISTER}`,
  login: `${BASE_URL}${process.env.NEXT_PUBLIC_API_LOGIN}`,
  forgotPassword: `${BASE_URL}${process.env.NEXT_PUBLIC_API_FORGOT_PASSWORD}`,
  resetPassword: `${BASE_URL}${process.env.NEXT_PUBLIC_API_RESET_PASSWORD}`,
  verifyCode: `${BASE_URL}${process.env.NEXT_PUBLIC_API_VERIFY_CODE}`,

  // ORDERS
  createOrder: `${BASE_URL}${process.env.NEXT_PUBLIC_API_SALES_ORDER}`,
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

  // BILLING
  getInvoice: (orderId) =>
    `${BASE_URL}${process.env.NEXT_PUBLIC_API_INVOICE.replace(
      ":orderId",
      orderId
    )}`,
  createPayment: `${BASE_URL}${process.env.NEXT_PUBLIC_API_PAYMENT}`,

  // SERVICES
  getServices: `${BASE_URL}${process.env.NEXT_PUBLIC_API_SERVICES}`,
};

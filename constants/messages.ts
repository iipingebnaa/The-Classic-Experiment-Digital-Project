export const MESSAGES = {

    //Auth
    LOGIN_SUCCESS : "Login Sucessful!",
    LOGIN_ERROR : "Something went wrong. Please try again",
    PHONE_INVALID : "Please enter a valid phone number",
    PHONE_REQUIRED : "Please enter your phone number",
    PHONE_NUMBER_NOT_FOUND : "Phone number not found. Please sign up first.",

    //SIGNUP
    SIGNUP_FAILURE : "Failed to create account",
    FAILED_ACCOUNT_CREATION : "Failed to create account. Please try again.",
    INVALID_PHONE : "Please enter a valid phone number",
    INVALID_EMAIL : "Please enter a valid email address",
    ACCOUNT_EXISTS : "An account with this phone number already exists. Redirecting to Welcome page.",


    //REQUESTS
    FAILED_REQUEST : "Request failed",

    //ORDERS
    LOGIN_REQUIRED_ORDER :  "Please log in to complete your order",
    ORDER_ITEM_REQUIRED : "Please add at least one item",
    ORDER_SUBMIT_FAILED : "Failed to submit order",
    ITEMS_FETCH_FAILED : "Failed to fetch items",

    //LOGOUT
    LOGOUT_SUCCESS : "You have been logged out",




} as const;
export const REVIEW_ERRORS = (err) => {
  switch (err) {
    case "ALREADY_REVIEW":
      return "you're already review this product";
    case "REVIEW_GET_ALL_FAILED":
      return "";
    case "REVIEW_IS_EMPTY ":
      return "";
    case "Unauthorized":
      return "Let's login to review this product";

    case "GET_BRANDS_FAILED ":
      return "";
    case "ADD_BRAND_ERROR":
      return "";

    case "BRAND_NOT_FOUND":
      return "";

    case "GET_FRAGRANCES_FAILED":
      return "";

    case "ADD_FRAGRANCE_ERROR":
      return "";
    case "FRAGRANCE_NOT_FOUND":
      return "";
    case "USER_NOT_FOUND":
      return "";
    default:
      return " something went wrong, please check again";
  }
};

export const PERFUME_ERRORS = (err) => {
  switch (err) {
    case "PERFUME_NOT_FOUND":
      return "perfume not found ";
    default:
      return " something went wrong, please check again";
  }
};

export const CART_ERRORS = (err) => {
  switch (err) {
    case "Unauthorized":
      return "Required to Login!";
    default:
      return " something went wrong, please check again";
  }
};

export const BOOKING_ERRORS = (err) => {
  switch (err) {
    case "Unauthorized":
      return "Required to Login!";
    case "BOOKING_NO_ITEM":
      return "Your cart is empty";
    default:
      return " something went wrong, please check again";
  }
};

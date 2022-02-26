export const CART_MESSAGES = (mess) => {
  switch (mess) {
    case "added":
      return "ADDED TO CART SUCCESSFULLY!";

    default:
      return " something went wrong, please check again";
  }
};

export const CART_MESSAGES = (mess) => {
  switch (mess) {
    case "added":
      return "ADDED TO CART SUCCESSFULLY!";

    case "cartEmpty":
      return "YOUR CART IS EMPTY!";

    default:
      return " Your cart is being loading..";
  }
};

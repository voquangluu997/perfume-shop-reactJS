export const BUTTONS = (mess) => {
  switch (mess) {
    case "send":
      return "Send";
    case "addToCart":
      return "add to cart";
    case "buyNow":
      return "buy now";
    case "viewCart":
      return "View cart";
    case "keepShopping":
      return "Keep shopping";
    case "confirm":
      return "Confirm";
    case "cancel":
      return "Cancel";

    default:
      return " something went wrong, please check again";
  }
};

export const REVIEW_LABELS = (mess) => {
  switch (mess) {
    case "send":
      return "Send";

    default:
      return " something went wrong, please check again";
  }
};

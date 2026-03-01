export const productLocators = {
  actions: {
    addToCartButtonName: /Add to cart/i,
    viewCartLinkName: /View cart/i,
  },

  variation: {
    container: ".single_variation_wrap",
    readyState: ".woocommerce-variation-add-to-cart-enabled",
    select: (attribute: string) =>
      `select[name*="${attribute}"]`,
  },

  grouped: {
    row: "tr.cart_item, tr.product", 
    quantityInput: "input.qty",
  },

  messages: {
    success: ".woocommerce-message",
  },
} as const;
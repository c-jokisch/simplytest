export const cartLocators = {

  emptyMessage: ".cart-empty",

  row: {
    container: "tr.cart_item",
    quantityInput: "input.qty",
    subtotal: "td.product-subtotal .amount",
  },

  totals: {
    subtotal: ".cart-subtotal .amount",
    orderTotal: ".order-total .amount",
  },

  actions: {
    updateButtonName: /Update cart/i,
  },

} as const;
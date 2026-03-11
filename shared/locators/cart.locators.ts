export const cartLocators = {
  emptyMessage: ".cart-empty",
  successMessageName: /Cart updated\./i,

  actions: {
    updateButtonName: /Update cart/i,
    updateQuantity: /Product quantity/i,
  },

  row: {
    container: "tr.cart_item",
    quantityInput: "input.qty",
    subtotal: "td.product-subtotal .amount",
  },

  totals: {
    subtotal: ".cart-subtotal .amount",
    orderTotal: ".order-total .amount",
  }
} as const;
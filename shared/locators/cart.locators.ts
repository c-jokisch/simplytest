export const cartLocators = {
  emptyCartMessageClass: '.cart-empty',
  cartHeaderPriceClass: '#site-header-cart .woocommerce-Price-amount.amount',

  cartRow: 'tr.cart_item',
  quantityInput: 'input.qty',
  productSubtotal: 'td.product-subtotal .amount',
  cartTotalsSubtotal: '.cart-subtotal .amount',
  cartOrderTotal: '.order-total .amount',

  updateCartButtonRole: { role: 'button', name: /Update cart/i },
  successMessageRole: { role: 'alert' }

} as const;
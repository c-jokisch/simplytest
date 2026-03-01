export const productLocators = {
    
  addToCartButtonRole: {
    role: "button",
    name: /Add to cart/i
  },

  variationSelect: (attribute: string) =>
    `select[name*="${attribute}"]`,

  variationWrap: ".single_variation_wrap",
  variationReadyState: ".woocommerce-variation-add-to-cart-enabled",

  groupedRow: "tr",
  groupedQuantityInput: "input.qty",

  successMessage: ".woocommerce-message",

  viewCartLinkRole: {
    role: "link",
    name: /View cart/i
  }

} as const;
export const productLocators = {

  addToCartButtonRole: /Add to cart/i,

  variationSelect: (attribute: string) =>
    `select[name*="${attribute}"]`,

  variationWrap: ".single_variation_wrap",
  variationReadyState: ".woocommerce-variation-add-to-cart-enabled",

  groupedRow: "tr",
  groupedQuantityInput: "input.qty",

  successMessage: ".woocommerce-message",

  viewCartLinkRole: /View cart/i,
  
} as const;
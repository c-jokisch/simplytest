export const shopLocators = {
  product: {
    container: "li.product",

    buttons: {
      addToCart: /Add to cart/i,
      selectOptions: /Select options/i,
      viewProducts: /View products/i,
      viewCart: /View cart/i,
    },

    states: {
      loading: "loading",
      added: "added",
    },
  },
} as const;
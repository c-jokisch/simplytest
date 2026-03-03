import { errorMonitor } from "node:events";

export const checkoutLocators = {
  form: {
    container: 'form.checkout',
    placeOrderButton: '#place_order',
  },

  billing: {
    firstName: '#billing_first_name',
    lastName: '#billing_last_name',
    company: '#billing_company',
    country: '#billing_country',
    address1: '#billing_address_1',
    address2: '#billing_address_2',
    city: '#billing_city',
    state: '#billing_state',
    postcode: '#billing_postcode',
    phone: '#billing_phone',
    email: '#billing_email',
  },

  additional: {
    orderNotes: '#order_comments',
  },

  orderReview: {
    container: '#order_review',
    productRows: 'tr.cart_item',
    subtotalRow: '.cart-subtotal',
    totalRow: '.order-total',
    errorMonitor: '.woocommerce-error'
  },

  payment: {
    container: '#payment',
    methods: {
      bankTransfer: '#payment_method_bacs',
    },
  },

  states: {
    successUrl: /order-received/,
  },
} as const;
<template lang="pug">
  .customer-payment-checkout
    .customer-payment-checkout__title 
      b Checkout your order !

    template
      v-row.mt-10(class="d-flex justify-center")
        LabDetailCard
        PaymentDetailCard(
          @onContinue="onContinue"
        )


</template>

<script>

import LabDetailCard from "./LabDetailCard.vue"
import PaymentDetailCard from "./PaymentDetailCard.vue"

export default {
  name: "PaymentCheckout",

  components: {
    LabDetailCard,
    PaymentDetailCard
  },

  methods: {
    onContinue () {
      this.$emit("onContinue")
    }
  }


}
</script>

<style lang="sass">
  @import "@/common/styles/mixins.sass"

  .customer-payment-checkout
    width: 100%
    height: 100% 
    display: flex
    flex-direction: column
    align-items: center

    &__title
      display: flex
      flex-direction: column
      align-items: center
      margin-top:55px
      @include h6

</style>

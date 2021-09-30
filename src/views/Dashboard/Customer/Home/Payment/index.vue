<template lang="pug">
  .payment-history
    .payment-history__wrapper
      DataTable(:headers="headers" :items="orderHistory")
        template(v-slot:[`item.service_info.name`]="{ item }")
          .payment-history__name-details
            ui-debio-avatar(:src="item.service_info.image" size="41" rounded)
            .payment-history__item-details
              .payment-history__item-name {{ item.service_info.name }}
              .payment-history__item-speciment {{ item.dna_sample_tracking_id }}

        template(v-slot:[`item.service_info.prices_by_currency[0].total_price`]="{ item }")
          .payment-history__price-details
            .payment-history__item-price {{ item.service_info.prices_by_currency[0].total_price }}
            .payment-history__item-currency {{ item.service_info.prices_by_currency[0].currency }}

        template(v-slot:[`item.actions`]="{ item }")
          Button(color="secondary" dark block) {{ item.status }}
</template>

<script>
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"
import { searchOrder } from "@/common/lib/polkadot-provider/query/orders"

export default {
  name: "CustomerPaymentHistory",
  
  components: { DataTable, Button },

  data: () => ({
    orderHistory: [],
    headers: [
      { text: "Service Name", value: "service_info.name", sortable: false},
      { text: "Lab Name", value: "lab_info.name", sortable: false},
      { text: "Order Date", value: "created_at", sortable: false},
      { text: "Price", value: "service_info.prices_by_currency[0].total_price", sortable: false},
      { text: "Reward", value: "created_at", sortable: false},
      { text: "Payment Status", value: "status", sortable: false},
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%"
      }
    ]
  }),

  async mounted() {
    await this.onSearchInput()
  },

  methods: {
    async onSearchInput(val) {
      const results = await searchOrder(val)
      this.orderHistory = results.map(result => ({
        ...result._source,
        service_info: { ...result._source.service_info, image: "https://picsum.photos/41/41" },
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))

      console.table(this.orderHistory)
    }
  }
}
</script>

<style lang="sass">
  @import "@/common/styles/mixins.sass"

  .payment-history
    &__name-details
      display: flex
      gap: 15px
      align-items: center

    &__item-details
      display: flex
      gap: 8px
      flex-direction: column

    &__item-name
      @include body-text-medium-3

    &__item-speciment
      color: #757274
      @include body-text-4
</style>

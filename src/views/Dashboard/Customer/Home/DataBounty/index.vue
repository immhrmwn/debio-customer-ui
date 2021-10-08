<template lang="pug">
  .customer-data-bounty
    .customer-data-bounty__wrapper
      Banner.customer-data-bounty__banner(
        title="Data Bounty"
        subtitle="Spread medical awareness to the world! store your genetical test result to ocean marketplace as data aggregation, and receive $DBIO reward!"
        gradient-color="secondary"
        with-decoration
      )
        template(slot="illustration")
          ui-debio-icon(
            :icon="researchIllustration"
            :size="cardBlock ? 250 : 180"
            view-box="0 0 170 170"
            fill
          )

      DataTable(:headers="headers" :items="bounties")
        template(v-slot:[`item.name`]="{ item }")
          .customer-data-bounty__item-wrapper
            ui-debio-avatar.customer-data-bounty__item-image(:src="item.avatar" rounded)
            .customer-data-bounty__item-details
              .customer-data-bounty__item-name {{ item.name }}
              .customer-data-bounty__item-speciment {{ item.speciment }}
</template>

<script>
import Banner from "@/common/components/Banner.vue"
import DataTable from "@/common/components/DataTable"
import { researchIllustration } from "@/common/icons" 

export default {
  name: "CustomerDataBounty",

  components: { Banner, DataTable },

  data: () => ({
    researchIllustration,

    bounties: [
      {
        name: "Covid-19 Testing",
        speciment: "AYEY6073POOH",
        labName: "GSI Lab",
        avatar: "https://picsum.photos/40",
        desc: "Result from covid-19 test gen contain badai sitokin and low hemoglobin it’s hapen mostly in tropis region",
        reward: "100 DBIO",
        hash: "F6325D9FE1CAC14BA1AS3832NC"
      },
      {
        name: "Covid-19 Testing2",
        speciment: "AYEY6073POOH",
        labName: "GSI Lab",
        avatar: "https://picsum.photos/40",
        desc: "Result from covid-19 test gen contain badai sitokin and low hemoglobin it’s hapen mostly in tropis region",
        reward: "100 DBIO",
        hash: "F6325D9FE1CAC14BA1AS3832NC"
      }
    ],

    headers: [
      {
        text: "Service Name",
        value: "name",
        sortable: true
      },
      {
        text: "Lab Name",
        value: "labName",
        sortable: true
      },
      {
        text: "Description",
        value: "desc",
        sortable: true
      },
      {
        text: "Reward",
        value: "reward",
        sortable: true
      },
      {
        text: "Hashcode",
        value: "hash",
        sortable: true
      }
    ],
    cardBlock: false
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
  }
}
</script>

<style lang="sass" scoped>
  @import "@/common/styles/mixins.sass"

  .customer-data-bounty
    &__wrapper
      display: flex
      flex-direction: column
      gap: 35px

    &__item-wrapper
      display: flex
      align-items: center
      gap: 15px

    &__item-details
      display: flex
      flex-direction: column
      gap: 2px

    &__item-name
      @include body-text-3-opensans

    &__item-speciment
      color: #8C8C8C
      @include body-text-3-opensans
    
    &::v-deep
      .banner__subtitle
        max-width: 29.2rem !important
</style>

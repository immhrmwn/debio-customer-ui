<template lang="pug">
  .customer-orderHistoryDetail
    div.body
      ui-debio-card(
        width="100%"
        height="1000px"
      )
        div.headerSection
          span Test Summary
        div.bodyContent
          v-row
            v-col
              div.leftSection.box.fillColor
                div.topRow.fillColor_II
                  div.topHead
                    span Lab Details
                  div.box
                    div.topBody
                      ui-debio-icon.dataIcon.box(
                        :icon="microscopeIcon"
                        :size="92"
                        stroke
                        :stroke-width="0"
                        color="linear-gradient(180deg, #716CFF 0%, #B267FF 100%)"
                        view-box="0 0 47 52"
                      )
                      div.topContentWraper
                        span {{ myTest.lab_info.name }}
                        span {{ myTest.lab_info.address }}
                div.middleRow.fillColor_II
                  div.topHead
                    span Product Details
                  div.box
                    div.topBody
                      ui-debio-icon.dataIcon.box(
                        :icon="selectedIcon"
                        :size="92"
                        stroke
                        :stroke-width="0"
                        color="linear-gradient(180deg, #716CFF 0%, #B267FF 100%)"
                        view-box="0 0 55 55"
                      )
                      div.topContentWraper
                        span {{ myTest.service_info.name }}
                        span {{ myTest.service_info.description }}
                div.bottomRow
                  span Specimen Number
                  v-spacer
                  span {{ myTest.dna_sample_tracking_id }}
            v-col
              div.rightSection.box
                div
                  div.imageBanner.box
                    ui-debio-icon(
                      :icon="banner"
                      :size="status['size']"
                      :view-box="status['viewBox']"
                    )
                div.statusSection
                  span.status {{ status['name'] }}
                  span.detail {{ status['detail'] }}
                div.statusStepper
                  v-stepper(alt-labels v-model="e1" flat)
                    v-stepper-header
                      v-stepper-step(step="" :complete="e1 > 1")
                        small Registered
                      v-divider
                      v-stepper-step(step="" :complete="e1 > 2")
                        small Received
                      v-divider
                      v-stepper-step(step="" :complete="e1 > 3")
                        small Quality Control
                      v-divider
                      v-stepper-step(step="" :complete="e1 > 4")
                        small Analyzed
                      v-divider
                      v-stepper-step(step="" :complete="e1 > 5")
                        small Results Ready
                .button
                  v-btn(
                    color="primary"
                    large
                    width="100%"
                    :disabled="myTest.status !== `ResultReady`"
                  ) View Result
</template>

<script>
import {
  microscopeIcon,
  weightLifterIcon,
  fileSearchIcon,
  hairIcon,
  familyTreeIcon,
  dnaIcon,
  foodAppleIcon,
  pillIcon,
  virusIcon,
  registeredBanner, //"0 0 182 135" size 185
  receivedBanner, //"-20 0 300 135" size 300
  wetworkBanner, //"-20 0 300 150" size 295
  resultReadyBanner, //"-20 0 300 150" size 295
  qualityControlBanner //"-20 0 300 125" size 295
} from "@/common/icons";
export default {
  name: "OrderHistoryDetail",
  data: () => ({
    microscopeIcon,
    fileSearchIcon,
    hairIcon,
    familyTreeIcon,
    dnaIcon,
    foodAppleIcon,
    pillIcon,
    virusIcon,
    weightLifterIcon,
    registeredBanner,
    receivedBanner,
    wetworkBanner,
    resultReadyBanner,
    qualityControlBanner,
    cardBlock: false,
    DnaSampleStatus: "Registered",
    banner: registeredBanner,
    selectedIcon: weightLifterIcon,
    e1: 1,
    status: {
      status: "",
      name: "",
      detail:"",
      size: 0,
      viewBox: ""
    },
    myTest: {},
    orderDetail: [
      {
        status: "Registered",
        name: "Registered",
        detail:
          "Your request has been registered, please send sample in 48 hours! see instruction here",
        size: 185,
        viewBox: "0 0 182 135"
      },
      {
        status: "Received",
        name: "Received",
        detail: "Your sample has been arrived at the lab",
        size: 300,
        viewBox: "-20 0 300 135"
      },
      {
        status: "QualityControlled",
        name: "Quality Control",
        detail: "Your sample has passed the quality control",
        size: 295,
        viewBox: "-20 0 300 125"
      },
      {
        status: "WetWork",
        name: "Wet Work",
        detail: "Your sample is being analyzed by the Lab",
        size: 295,
        viewBox: "-20 0 300 150"
      },
      {
        status: "ResultReady",
        name: "Result Ready",
        detail: "Your sample has been successfully analyzed",
        size: 295,
        viewBox: "-20 0 300 150"
      }
    ]
  }),
  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true;
      else this.cardBlock = false;
    });
    this.myTest = this.$route.params;
    this.checkOrderDetail();
    this.iconSwitcher()
    console.log(this.myTest);
  },
  methods: {
    iconSwitcher() {
      switch (this.myTest.service_info.name) {
      case "Covid-19 Testing":
        this.selectedIcon = virusIcon;
        break;
      case "Whole Genome Sequencing":
        this.selectedIcon = dnaIcon;
        break;
      case "Diet":
        this.selectedIcon = weightLifterIcon;
        break;
      case "Skin":
        this.selectedIcon = hairIcon;
        break;
      case "SNP Microarray":
        this.selectedIcon = dnaIcon;
        break;
      default:
        this.selectedIcon = weightLifterIcon;
        break;
      }
    },
    
    checkOrderDetail() {
      switch (this.myTest.status) {
      case "Registered":
        this.banner = registeredBanner;
        this.status = this.orderDetail[0]
        this.e1 = 2
        break;
      case "Received":
        this.status = this.orderDetail[1]
        this.banner = receivedBanner;
        this.e1 = 3
        break;
      case "QualityControlled":
        this.status = this.orderDetail[2]
        this.banner = qualityControlBanner;
        this.e1 = 4
        break;
      case "WetWork":
        this.status = this.orderDetail[3]
        this.banner = wetworkBanner;
        this.e1 = 5
        break;
      case "ResultReady":
        this.status = this.orderDetail[4]
        this.banner = resultReadyBanner;
        this.e1 = 6
        break;
      default:
        this.status = this.orderDetail[0]
        this.banner = registeredBanner;
        this.e1 = 1
        break;
      }
    }
  },
  beforeMount() {
    if (!Object.keys(this.$route.params).length)
      this.$router.push({ name: "my-test" });
  }
};
</script>

<style lang="sass">
.customer-orderHistoryDetail
  margin: 10px
  &::v-deep
    .banner__subtitle
      max-width: 36.188rem !important
  .headerSection
    text-align: center
    margin: 25px 0 50px 0
    font-weight: 600
    font-size: 24px
  .box
    border: solid 0.5px #E4E4E4
    box-sizing: border-box
    margin: 0px
  .fillColor
    height: 456px
  .fillColor_II
    height: 150px
  .bodyContent
    margin: 0 0 0 0
  .leftSection
    padding: 17px
    height: 456px
    .topRow
      margin: 0px
    .middleRow
      margin: 25px 0 0 0
    .bottomRow
      display: flex
      margin-top: 21px
      font-weight: 600
      font-size: 14px
      line-height: 20px
      justify-content: space-between
  .rightSection
    padding: 17px
    height: 456px
  .bodyWraper
    padding: 10px
  .dataIcon
    padding: 10px
    margin: 10px
    min-width: 92px
    .dataContent
      margin: 0 0 0 5px
  .topHead
    margin: 0 0 10px 0
    font-weight: 600
    font-size: 20px
    line-height: 32px
  .topBody
    display: flex
  .topContentWraper
    display: flex
    flex-direction: column
    margin: 5px 0 5px 5px
    justify-content: space-evenly
    font-size: 14px
  .imageBanner
    width: 481px
    height:184px
    margin-bottom: 15px
    align-items: center
    display: flex
    flex-direction: column
    background: linear-gradient(81.43deg, #6344D0 2.53%, #9D82FF 100%)
  .statusStepper
    margin-top: 16px
    .v-stepper__step
    .v-stepper--alt-labels .v-stepper__step
      flex-direction: column-reverse
    .v-stepper--alt-labels .v-stepper__step__step
      margin-top: 11px
      margin-bottom: 0
    .v-stepper--alt-labels .v-stepper__header .v-divider
      margin: 57px -67px 0
    .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step
      background: none
      border: 2px solid #c400a5
      
  .statusSection
    display: flex
    flex-direction: column
    .status
      font-size: 14px
      font-weight: 600
      line-height: 20px
      margin: 0 0 10px 0
    .detail
      font-size: 12px
      font-weight: 400
      line-height: 16px
  
  .button
    margin-top: 6px
</style>

import { checkIsLoggedIn } from "@/common/lib/route-guard"

const customerRoutes = [{
  path: "/customer",
  component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Layout"),
  beforeEnter: checkIsLoggedIn,
  children: [
    {
      path: "/",
      name: "customer-dashboard",
      meta: { pageHeader: "Home" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home")
    },

    // EMR
    {
      path: "emr",
      name: "customer-emr",
      meta: { pageHeader: "Emr" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Emr")
    },
    {
      path: "emr/create",
      name: "customer-emr-create",
      meta: { pageHeader: "Emr Create", parent: "customer-emr" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Emr/Create")
    },

    // PAYMENT HISTORY
    {
      path: "payment-history",
      name: "customer-payment-history",
      meta: { pageHeader: "Payment History" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Payment")
    },
    {
      path: "payment-history/details",
      name: "customer-payment-details",
      meta: { pageHeader: "Payment Details", parent: "customer-payment-history" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Payment/Details")
    }
  ]
}]

export default customerRoutes

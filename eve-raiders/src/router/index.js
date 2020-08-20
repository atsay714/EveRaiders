import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PlanetsReport from "../components/PlanetsReport";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/planets',
      name: 'Planets',
      component: PlanetsReport
    }
  ]
})

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/meals",
      name: "meals",
      component: () => import("./components/MealsList")
    },
    {
      path: "/meals/:id",
      name: "meal-details",
      component: () => import("./components/Meal")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddMeal")
    }
  ]
});
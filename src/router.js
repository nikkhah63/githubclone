
import { createWebHistory, createRouter } from "vue-router";
import List from "@/components/List.vue";
import Details from "@/components/Details.vue";

const routes = [
    {
      path: "/",
      name: "Home",
      component: List,
      
    },
    {
      path: "/:id",
      name: "details",
      component: Details,
      props: true,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
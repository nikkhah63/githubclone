<script>


import axios from 'axios'
import Loading from './Loading.vue'

export default {
   name: "List",
   data() {
      return {
         repository: [],
         pagesize: 100,
         since: 0,
         isLoading: false

      };
   },
   methods: {
      //this is a method to get data from repository
      getData: function () {

         axios
            .get("https://api.github.com/repositories?since=" + this.since + "&per_page=" + this.pagesize)
            .then(response => {
               this.repository.push(...response.data);

            }).catch(error => {

               console.log(error)

            })

      },
      getNextData() {
         window.onscroll = () => {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (bottomOfWindow) {
               this.since = this.repository.slice(-1)[0]?.id;
               this.getData();
            }
         }
      }
   },

   // beforeCreate: function () {     

   // },
   beforeMount() {
      axios.interceptors.request.use(
         (config) => {
            this.isLoading = true;
            return config;
         },
         (error) => {
            this.isLoading = false;
            return Promise.reject(error);
         }
      );

      axios.interceptors.response.use(
         (response) => {
            this.isLoading = false;
            return response;
         },
         (error) => {
            this.isLoading = false;
            return Promise.reject(error);
         }
      );

      this.getData();
   },
   mounted() {

      this.getNextData();

   }

};

</script>
<template>


   <div class="container">


      <!-- </div> -->
      <div class="row g-3">
         <div class="col-md-12 " v-for="(item, key) in repository" :key="key">

            <router-link :to="`/${item.id}`" class="text-decoration-none">
               <div class="card ">
                

                  <div class="card-body d-flex flex-cloumn  align-items-center">
                      <img  :src="`${item.owner?.avatar_url}`"   class="img-fluid img-thumbnail rounded-circle w-10 me-2" />
                     <div>
                        <h5 class="card-title text-muted">{{ item.name }} </h5>
                        <p  class="card-title bold">{{ item.full_name }}</p>                       
                        <p class="card-text text-muted text-justify ">{{ item.description }}</p>
                     </div>
                     
                  </div>
                  <div class="card-body text-end" >
                     <a href="#" class="btn btn-primary btn-sm card-link align-self-start right">Details</a>
                  </div>
               </div>
            </router-link>

         </div>
      </div>
      <div class="spinner-border text-dark " role="status" v-if="isLoading">
         <span class="sr-only">Loading...</span>
      </div>
   </div>
</template>


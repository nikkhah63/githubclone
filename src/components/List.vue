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
            // alert("yes");
            this.isLoading = true;
            return config;
         },
         (error) => {
            //  alert("no");
            this.isLoading = false;
            return Promise.reject(error);
         }
      );

      axios.interceptors.response.use(
         (response) => {
            this.isLoading = false;
            //alert("no");
            return response;
         },
         (error) => {
            this.isLoading = false;
            //  alert("no");
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
      <div class="col-md-12" v-for="(item, key) in repository" :key="key">

         <router-link :to="`/${item.id}`">{{ item.id }} : {{ item.full_name }}</router-link>

      </div>
       <div class="spinner-border text-dark " role="status" v-if="isLoading">
         <span class="sr-only">Loading...</span>
      </div>
   </div>
</template>


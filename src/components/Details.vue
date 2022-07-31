<script>
import axios from 'axios'

export default {

   name: "Details",
   props: ['id'],
   //    props: {
   //     id: String,
   //   },
   data() {
      return {
         item: {},
         id: "",
         isLoading: false
      };
   },
   beforeCreate: function () {

      axios
         .get(`https://api.github.com/repositories/` + this.id)
         .then(result => {

            this.item = result.data;
         })
   },
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


   },


};

</script>
<template>
   <div class="container">
      <div class="spinner-border text-dark " role="status" v-if="isLoading">
         <span class="sr-only">Loading...</span>
      </div>
      <div class="col-md-12">
         <div class="card ">


            <div class="card-body d-flex flex-cloumn  align-items-center">
               <img :src="`${item.owner?.avatar_url}`" class="img-fluid img-thumbnail rounded-circle w-10 me-2" />
               <div>
                  <h5 class="card-title text-muted">{{ item.name }} </h5>
                  <p class="card-title bold">{{ item.full_name }}</p>
                  <p class="card-text text-muted text-justify ">{{ item.description }}</p>
               </div>

            </div>
            <div class="card-body text-end">
               <a href="#" class="btn btn-primary btn-sm card-link align-self-start right">download</a>
            </div>
         </div>


      </div>
   </div>
</template>


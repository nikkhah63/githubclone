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
         isLoading: false,
         commentItems: []
      };
   },
   beforeCreate: function () {

      axios
         .get(`https://api.github.com/repositories/` + this.id)
         .then(result => {

            this.item = result.data;
            axios
               .get("https://api.github.com/repos/mojombo/" + this.item.name + "/comments")
               .then(result => {
                  this.commentItems = result.data;
               })
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
      <div class="col-md-12 shadow-sm">
         <div class="card card border-0">


            <div class="card-body d-flex flex-cloumn  align-items-center">
               <div class="text-center w-10 me-1">
                  <img :src="`${item.owner?.avatar_url}`" class="img-fluid img-thumbnail rounded-circle me-2" />
                  <a :href="`${item.owner?.html_url}`" class="card-title text-muted text-decoration-none">{{ item.name
                  }} </a>
               </div>
               <div class="flex-grow-1">
                  <div class="card-title d-flex flex-cloumn  align-items-start text-end">
                     <span class="text-success bold me-2"> {{ item.visibility }}</span>
                     <span class="badge bg-success rounded-pill me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-star" viewBox="0 0 16 16">
                           <path
                              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                        {{ item.stargazers_count > 0 ? item.stargazers_count : 0 }}</span>

                     <span class="badge bg-secondary rounded-pill me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-share" viewBox="0 0 16 16">
                           <path
                              d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                        {{ item.forks_count > 0 ? item.forks_count : 0 }}</span>
                     <span class="badge bg-info rounded-pill me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-eye" viewBox="0 0 16 16">
                           <path
                              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                           <path
                              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                        {{ item.watchers_counts > 0 ? item.watchers_counts : 0 }}</span>

                  </div>

                  <p class="card-title bold">{{ item.full_name }}</p>
                  <p class="card-text text-muted text-justify ">{{ item.description }}</p>
               </div>

            </div>
            <div class="card-body text-end">
               <a :href="`${item.html_url}`" target="_blank"
                  class="btn btn-outline-primary btn-sm card-link align-self-start right ">go to repository</a>
            </div>
            <div class="card-body text-start">

               <h4 class="text-primary mb-2">List of Comments</h4>
               <div class="col-md-12 border-bottom g-3 p-2" v-for="(comment, key) in commentItems" :key="key">
                  <p class="text-primary">{{ comment.user.login }} <small class="text-muted me-2 ms-2">{{
                        comment.created_at
                  }}</small></p>
                  <p class="text-muted">{{ comment.body }}</p>
               </div>
            </div>
         </div>


      </div>
   </div>
</template>


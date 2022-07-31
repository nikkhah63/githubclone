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
         repository: {},
         id: ""
      };
   },
   beforeCreate: function () {
    
        axios
      .get(`https://api.github.com/repositories/`+this.id)
         .then(result => {
            this.repository = result.data;
         })
   },
   created: function () {
      console.log('created!')
    
   },
   beforeMount: function () {

      console.log('Before Mount!')

   },


};

</script>
<template>
   <div class="container">
      <div class="col-md-12">
         <p>{{ repository?.name }}</p>
         
      </div>
   </div>
</template>


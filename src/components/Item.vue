<template>
  <div class="col-md-12">
   
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
  </div>
</template>

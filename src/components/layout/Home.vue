<template>
  <div class="">
      <navbar></navbar>
      <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import router from '@/router/index'
export default { 
  data() {
      return {
       
      }
    },
  components:{
    Navbar
  },
  methods: {
      createdt(){
        console.log(123)
      }
  },
}
</script>

<style scoped>
.content{
  padding-top: 20px;
  min-height: 420px;
  margin: auto;
  width: 1040px;
}
</style>

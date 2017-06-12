<template>
    <div class="home">
    <h2>{{msg}}</h2>
    </div>
</template>

<script>
export default {
  name: 'home',
  mounted(){
    
  },
  data () {
    return {
      msg: 'Bienvenido a la aplicación estas en HOME'
    }
  }
}
</script>
<style>
.home{
  width: 95vw;
}
</style>

<template>
  <div class="home">
    <h2>{{msg}}</h2>
    <h3>Armario digital</h3>
    
    <div class="fin">
      <h5>Realizado por:</h5>
      <h6>Jesús Sabroso Centella</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {

  },
  data() {
    return {
      msg: 'Proyecto Final de ciclo'
    }
  }
}
</script>
<style>
.home {
  height: 90vh;
  width: 95vw;
  display: flex;
  flex-flow: column nowrap;
}
.home > h2{
  padding: 10%;
}
/*.home::before {
  content:'';
  background-image: url('http://localhost:8080/dist/img/armario.jpg') ;
  background-repeat: no-repeat;
  opacity: 0.5;
  top: 1vh;
  left: 0;
  width:100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;   
}*/
.fin{
  position:fixed;
  bottom: 20px;
  right: 20px;
}
</style>

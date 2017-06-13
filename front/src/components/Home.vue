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
.fin{
  position:fixed;
  bottom: 20px;
  right: 20px;
}
</style>

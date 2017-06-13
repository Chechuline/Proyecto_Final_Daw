<template>
  <div class='derecha'>
    <h2>{{msg}}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    this.token = this.$route.params.userId
  },
  data() {
    return {
      msg: '',
      token: null,
    }
  },
}
</script>
<style>
.derecha {
  display: flex;
  flex-flow: column nowrap;
  order: 1;
  width: 80vw;
  max-width: 80vw;
  height: 94vh;
  max-height: 94vh;
  overflow:auto;
  background-color: rgba(242, 135, 115,0.1);
  /*background-image: url('http://localhost:8080/dist/img/armario.jpg');
  background-position: 10%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: rgba(0,0,0,0.2);*/
  /*justify-content: center;*/

}

/*small size*/
@media all and (min-width: 320px) and (max-width: 480px) {
  .derecha {
    position: relative;
    /*left: -10vw;*/
    width: 100% !important;
    height: 100%;
    overflow:auto;
  }
}

/*medium size*/
@media all and (min-width: 481px) and (max-width: 640px) {

}
</style>
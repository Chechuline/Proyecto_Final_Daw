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
  width: 70vw;
  max-width: 70vw;
  height: 80vh;
  max-height: 80vh;
}

/*small size*/
@media all and (min-width: 320px) and (max-width: 480px) {
  .derecha {
    position: relative;
    left: -10vw;
    width: 100vw !important;
    height: 100vh;
  }
}

/*medium size*/
@media all and (min-width: 481px) and (max-width: 640px) {
  .derecha {}
}
</style>
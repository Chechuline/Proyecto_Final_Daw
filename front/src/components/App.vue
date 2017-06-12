<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <navigation :userId='id'></navigation>
  
    <div class='contenedor'>
  
      <!-- Cuando el usuario esté conectado se mostraran los componentes del usuario -->
      <router-view name="izq"></router-view>
      <router-view name="dch"></router-view>
      <router-view @tokenizado='obtenerToken' @logOut='limpiarToken'></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      token: null,
      id: null,
    }
  },
  beforeMount() {
  },
  mounted() {
    this.obtenerToken(localStorage.getItem('token'));
  },
  afterMount() {

  },
  methods: {
    obtenerToken: function (LogToken) {
      this.token = LogToken;
      this.id = localStorage.getItem('id');
    },
    limpiarToken: function () {
      console.log("limpia")
      this.token = null;
      this.id = null;
      localStorage.clear();
    }
  }
  , event() {

  }

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  display:flex;
  flex-flow: column nowrap;
}
.contenedor {
  margin-right: 0px;
  max-width: 100vw;
  max-height: 80vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

*{
  background-color: lightcyan; 
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 0px;
}

a,a:active {
  color: #42b983;
}
</style>


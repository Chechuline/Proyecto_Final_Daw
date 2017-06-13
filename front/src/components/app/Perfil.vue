<template>
  <div id='perfil'>
    <h2>
      {{msg}}
    </h2>
    <span class="alert alert-danger" role="alert" v-if="error">
      {{error}}
    </span>
    <p>
      <p>
        <strong>Nombre:</strong> {{datos.nombre}}
      </p>
      <p>
        <strong>Apellidos:</strong> {{datos.apellidos}}
      </p>
      <p>
        <strong>Email:</strong> {{datos.email}}
      </p>
      <p>
        <strong>Nombre de usuario:</strong> {{datos.usuario}}
      </p>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'principal',
  beforeMount() {
    this.token = this.$parent.token;
  },
  watch: {
    //cuando reciba el token, cargo los datos
    token: function () {
      this.cargarDatos();
    }
  },
  mounted() {
    //console.log('recien montado, tiene token?: '+this.$parent.token);
    //this.cargarDatos();
    this.cargarDatos();
  },
  data() {
    return {
      msg: 'Mis datos',
      datos: 'cargando datos de usuario...',
      error: undefined,
    }
  },
  methods: {
    cargarDatos() {
      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });

      customReq.get('http://localhost:3977/api/user/' + localStorage.getItem('id'))
        .then((response) => {
          var data = JSON.parse(response.request.responseText);
          if (data.message == 'ok') {
            this.datos = data.usuario;
          }

          console.log(data)
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });

    }
  }
}
</script>
<style>

</style>
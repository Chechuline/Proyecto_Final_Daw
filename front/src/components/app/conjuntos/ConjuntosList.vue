<template>
  <div id='conjuntos'>
    <div>
      {{msg}}
    </div>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{error}}
    </div>
    <div>
      <router-link :to="{name:'crearConjunto',params: {userId:userId}}">Nuevo</router-link>
      <br/>
      <label for="buscar">Buscar</label>
      <input type="text" v-model='buscar'>
    </div>
    <div id='conjuntos-list'>
      <ul v-if='conjuntos'>
        <li v-for="conjunto in conjuntos">
          <span>{{conjunto.nombre}}</span>
          <p>
            <router-link :to="{name:'conjunto',params: {userId:userId,setId: conjunto._id}}">Ver</router-link>
            <router-link :to="{name:'editarConjunto', params: {userId:userId,setId: conjunto._id}, props: {editable:true}}">Editar</router-link>
            <span v-if="showBorrar != conjunto._id">
              <a @click="borrarConjunto(conjunto._id)">Eliminar</a>
            </span>
            <span v-else>
              <p>¿Seguro?
                <button @click="cancelarBorrar">No</button>
                <button @click="confirmarBorrar(conjunto)">Si</button>
              </p>
            </span>
          </p>
        </li>
      </ul>
      <span v-else>Cargando conjuntos...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../../bus/bus.js';
export default {
  name: 'ConjuntosList',
  beforeMount() {
    this.userId = this.$route.params.userId;
  },
  data() {
    return {
      msg: 'Mis conjuntos',
      conjuntos: undefined,
      showBorrar: -1,
      error: undefined,
      buscar: ''
    }
  },
  watch: {
    buscar: function () {
      (this.buscar != '') ? this.busqueda(this.buscar) : this.cargarConjuntos();
    }
  },
  mounted() {
    this.cargarConjuntos();
  },
  methods: {
    cargarConjuntos() {
      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });

      customReq.get('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets')
        .then((response) => {
          var data = JSON.parse(response.request.responseText);
          if (data.message == 'ok') {
            this.conjuntos = data.conjuntos;
          }
          console.log(data)
        })
        .catch((error) => {
          this.error = error.response.data.error;
        });
    },
    borrarConjunto(id) {
      this.showBorrar = id;
    },
    cancelarBorrar() {
      this.showBorrar = -1;
    },
    confirmarBorrar(conjunto) {
      //peticion para borrar
      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });
      customReq.delete('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/' + conjunto._id)
        .then(response => {
          var data = JSON.parse(response.request.responseText);
          if (data.message == 'borrado') {
            this.cargarConjuntos();
            EventBus.$emit('actualizarConjuntos');
          }
        })
        .catch(response => {
          this.error = error.response.data.error;
        })
    },
    busqueda(cadena) {
      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });
      console.log('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/find/' + cadena)
      customReq.get('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/find/' + cadena)

        .then((response) => {
          var data = JSON.parse(response.request.responseText);
          if (data.message == 'ok') {
            this.conjuntos = data.conjuntos;
          }
        })
        .catch((error) => {
          this.error = error.response.data.error;
        })
    }
  }
}
</script>
<style>
/*#conjuntos{
  float: right;
  text-align: center;
  max-width: 70%;
}*/

#conjuntos-list>ul>li{
  margin-top: 10px;
  width: 30%;
  height: 120px;
  border: 1px solid #ddd;
  background: #eee;
  overflow: hidden;
}
</style>

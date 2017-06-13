<template>
  <div id='conjuntos'>
    <h3>
      {{msg}}
    </h3>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{error}}
    </div>
    <div class="contenedorSup">
      <div>
        <router-link :to="{name:'crearConjunto',params: {userId:userId}}">Nuevo</router-link>
      </div>
      <div class="buscar">
        <div class="form-inline">
            <input class="form-control" type="text" v-model='buscar' placeholder="Buscar">
          </div>
      </div>
      
    </div>
    <div id='conjuntos-list'>
      <ul v-if='conjuntos'>
        <li v-for="conjunto in conjuntos">
          <h4>{{conjunto.nombre}}</h4>
          <p>
            <router-link class="btn btn-outline-success" :to="{name:'conjunto',params: {userId:userId,setId: conjunto._id}}">Ver</router-link>
            <router-link class="btn btn-outline-warning" :to="{name:'editarConjunto', params: {userId:userId,setId: conjunto._id}, props: {editable:true}}">Editar</router-link>
            <span class="btn btn-outline-danger" v-if="showBorrar != conjunto._id">
              <a @click="borrarConjunto(conjunto._id)">Eliminar</a>
            </span>
            <span v-else>
              <p>¿Seguro?
                <button class="btn btn-outline-success" @click="cancelarBorrar">No</button>
                <button class="btn btn-outline-danger" @click="confirmarBorrar(conjunto)">Si</button>
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
#conjuntos{
  background-color: rgba(243,250,254,1);
}
.contenedorSup{
  width:100%;
  display:flex;
  flex-flow: row nowrap;
  align-content: center;
}

.contenedorSup > div{
  width:40vw;
  height: 40px;
}
.buscar {
  display: flex;
  flex-flow: row nowrap;
}
#conjuntos-list {
  list-style: none;
}

#conjuntos-list>ul>li {
  margin: 10px 5px;
  padding-top: 2px;
  width: 30%;
  min-width: 184px;
  height: 140px;
  background-color: rgba(207,235,253,.5);
}



/*small size*/

@media all and (min-width: 320px) and (max-width: 640px) {
  #conjuntos-list>ul>li {
    display: block;
    width: 90%;
  }
}



/*medium size*/

@media all and (min-width: 481px) and (max-width: 640px) {}
</style>

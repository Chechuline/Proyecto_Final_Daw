<template>
  <div id='conjunto'>
    <h2>{{msg}}</h2>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{error}}
    </div>
    <span v-if="datos">
    <!-- si estamos en modo edicion -->
      <div v-if="editable">
        <label for="name">Nombre Conjunto:</label>
        <input type="text" v-model="datos.nombre" id="name">
        <button @click.prevent="addElemento" class="btn btn-outline-primary">Añadir pieza conjunto</button>

        <div v-for="elemento in datos.elementos">
          <label for="">Nombre elemento: </label>
          <input type="text" v-model="elemento.nombre">
          <br/>
          <span>Etiquetas :</span>
          <input type="text" v-model="elemento.tags">
          </div>
          <button @click.prevent="actualizarConjunto" class="btn btn-info">Guardar</button>
      </div>
      <!-- si no estamos en modo edicion -->
      <div v-else>
        <label>Nombre Conjunto:</label>
        <span>{{datos.nombre}}</span>
        <div v-for="elemento in datos.elementos">
          <img v-if="elemento.imagen" v-bind:src="elemento.imagen" v-bind:alt="elemento.nombre + 'foto'" height="120px" width="120px"/>
          <label>Nombre elemento:</label>
          <span>{{elemento.nombre}}</span>
          <span>Etiquetas :</span>
          <div v-for="tag in elemento.tags">
            <span>{{tag}}</span>
          </div>
          
        </div>
      </div>
  
    </span>
  </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../bus/bus.js';

export default {
  name: 'conjunto',
  beforeMount() {
    this.userId = this.$route.params.userId;
    this.setId = this.$route.params.setId;
    //si el nombre de la ruta es editar, autmaticamente pasa a forma edicion
    this.editable = (this.$route.name == 'editarConjunto');
  },
  mounted() {
    this.cargarDatos(this.setId);
  },
  watch: {
    '$route.name': function (newVal, oldVal) {
      this.editable = (this.$route.name == 'editarConjunto');
    },
    '$route.params.setId': function (newId, oldId) {
      //this.datos=undefined;
      this.cargarDatos(newId);
    }

  },
  data() {
    return {
      error:undefined,
      userId: undefined,
      setId: undefined,
      msg: 'esto es un conjunto',
      datos: undefined,
      editable: false
    }
  }, methods: {
    cargarDatos(conjuntoId) {

      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });

      customReq.get('http://localhost:3977/api/user/' + this.userId + '/sets/' + conjuntoId)
        .then((response) => {
          var data = JSON.parse(response.request.responseText);
          if (data.message == 'ok') {
            console.warn(data.conjunto);
            this.datos = data.conjunto;
          }
        })
       .catch((error)=>{
            this.error = error.response.data.error;
          });

    },
    actualizarConjunto(){
      var customReq = axios.create({
				headers: { 'authorization': localStorage.getItem('token') }
			});

			customReq.patch('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/'+this.setId,this.datos)
				.then((response) => {

					var data = JSON.parse(response.request.responseText);
          console.log("------------update-----------");
          console.log(data);
          console.log("-----------------------");
          
					if (data.message == "actualizado correctamente") {
						EventBus.$emit('actualizarConjuntos');
						this.$router.push({ name: "conjuntos", params: { userId: localStorage.getItem('id') } });
					}
				})
				.catch((error) => {
					this.error = error.response.data.error;
				})

    },
    addElemento() {
			this.datos.elementos.push({ nombre: '', tags: ''});
		}
  }
}
</script>
<style>

</style>

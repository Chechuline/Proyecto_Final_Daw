<template>
  <div id='conjunto' v-if="datos">
    <h2 v-if="datos.nombre">{{datos.nombre}}</h2>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{error}}
    </div>
    <span v-if="datos">
      <!-- si estamos en modo edicion -->
      <div v-if="editable" class="editable">
        <div class="form-group d-lg-inline">
          <label for="name" class='form-control-label'>Nombre Conjunto:</label>
          <input type="text" v-model="datos.nombre" id="name" class='form-control'>
        </div>
        <button @click.prevent="addElemento" class="btn btn-outline-primary">Añadir pieza conjunto</button>
  
        <div v-for="(elemento, index) in datos.elementos" class="form-group form-inline contenedorPiezas">
          <div>
            <label>Nombre: </label>
            <input type="text" v-model="elemento.nombre" class='form-control'>
          </div>
          <div>
            <span>Etiquetas :</span>
            <input type="text" v-model="elemento.tags" class='form-control'>
          </div>
  
          <input v-if="!elemento.imagen" type="file" v-bind:name="'imagen_'+index" class='form-control-file' accept="image/*" @change="uploadImage">
          <div v-else-if="elemento.imagen == 'subiendo' ">Subiendo...</div>
          <img v-else v-bind:src="elemento.imagen" v-bind:alt="elemento.nombre + 'foto'" height="120px" width="120px" />
        </div>
        <button @click.prevent="actualizarConjunto" class="btn btn-info">Guardar</button>
      </div>
      <!-- si no estamos en modo edicion -->
      <div v-else>
        <label>Nombre Conjunto:</label>
        <span>{{datos.nombre}}</span>
        <div v-for="elemento in datos.elementos" class="form-group form-inline contenedorPiezas">
          <img v-if="elemento.imagen" v-bind:src="elemento.imagen" v-bind:alt="elemento.nombre + 'foto'" height="120px" width="120px" />
          <div>
          <label>Nombre:</label>
          <span>{{elemento.nombre}}</span>
          </div>
          <div>
          <span>Etiquetas :</span>
          <div v-for="tag in elemento.tags">
            <span>{{tag}}</span>
          </div>
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
      error: undefined,
      userId: undefined,
      setId: undefined,
      msg: 'esto es un conjunto',
      datos: undefined,
      editable: false,
      pos: 0,
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
        .catch((error) => {
          this.error = error.response.data.error;
        });

    },
    actualizarConjunto() {
      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });

      customReq.patch('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/' + this.setId, this.datos)
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
      this.datos.elementos.push({ nombre: '', tags: '', imagen: '' });
    },
    uploadImage(e) {
      e.preventDefault();
      console.log(this);
      let imagen = e.target.files[0];
      debugger;
      let valor = e.target.name.split('_')[1];
      let elemento = this.datos.elementos[e.target.name.split('_')[1]];
      debugger;
      elemento.imagen = 'subiendo';

      //var imagenes;
      let data = new FormData();
      data.append('imagen', imagen);

      var customReq = axios.create({
        headers: { 'authorization': localStorage.getItem('token') }
      });

      customReq.post('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/upload-image', data)
        .then((response) => {
          var data = JSON.parse(response.request.responseText);

          if (data.message == "subida correctamente") {

            elemento.imagen = 'http://localhost:3977/upload/elementos/' + data.image;

          }
        })
        .catch((error) => {
          elemento.imagen = undefined;
          this.error = error.response.data.error;
        })

    }
  }
}
</script>
<style>
.editable {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin: 0;
  justify-content: center;
}

.editable>div:first-of-type {
  display: flex;
  flex-flow: column wrap;
  margin-left: 40%;
  width: 200px;
}

.editable button {
  margin-left: 40%;
  width: 200px;
}

@media all and (min-width: 320px) and (max-width: 480px) {
  .editable {
    width: 60vw;
    flex-flow: column wrap;
  }
  .editable>div:first-of-type {
    margin-left: 1%;
  }
  .editable button {
    margin-left: 1%;
  }
}

@media all and (min-width: 481px) and (max-width: 640px) {
  .editable>div:first-of-type {
    margin-left: 30%;
  }
  .editable button {
    margin-left: 30%;
  }
}
</style>

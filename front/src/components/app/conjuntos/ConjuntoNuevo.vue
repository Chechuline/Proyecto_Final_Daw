<template>
	<div id="conjunto">
		<h2>{{msg}}</h2>
		<div class="alert alert-danger" role="alert" v-if="error">
			{{error}}
		</div>
		<form v-on:submit.prevent="guardarConjunto" enctype="multipart/form-data">
			<div class="form-group d-lg-inline">
				<label for="nombre" class='form-control-label'>Nombre conjunto</label>
				<input class='form-control' id="nombre" type="text" v-model="conjunto.nombre">
			</div>
	
			<button @click.prevent="addElemento" class="btn btn-outline-primary">Añadir pieza conjunto</button>
	
				<div v-if="elementos" v-for="elemento in elementos" class="form-group form-inline contenedorPiezas">
					<div>
						<label>nombre: </label>
						<input class='form-control' type="text" v-model="elemento.nombre">
					</div>
					<div>
						<label>tags: </label>
						<input class='form-control' type="text" v-model="elemento.tags">
					</div>
					<div v-if="!elemento.imagen">Imagen:
						<input type="file" class='form-control-file' v-bind:name="'imagen_'+pos" accept="image/*" @change="uploadImage">
					</div>
					<div v-else-if="elemento.imagen == 'subiendo' ">Subiendo...</div>
					<img v-else v-bind:src="elemento.imagen" v-bind:alt="elemento.nombre + 'foto'" />
				</div>
			<button type="submit" class="btn btn-info" v-bind:class="{disabled: !isValid}">Guardar</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../../bus/bus.js';

export default {
	name: 'home',
	mounted() {

	},
	data() {
		return {
			msg: 'Crear conjunto nuevo',
			error: undefined,
			conjunto: {
				nombre: ''
			},
			elementos: [],
			pos: 0

		}
	},
	methods: {
		uploadImage(e) {
			e.preventDefault();
			console.log(this);
			let imagen = e.target.files[0];
			let elemento = this.elementos[e.target.name.split('_')[1] - 1];
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

		},
		guardarConjunto() {
			var customReq = axios.create({
				headers: { 'authorization': localStorage.getItem('token') }
			});
			this.conjunto['elementos'] = this.elementos;
			customReq.post('http://localhost:3977/api/user/' + localStorage.getItem('id') + '/sets/', this.conjunto)
				.then((response) => {
					var data = JSON.parse(response.request.responseText);

					if (data.message == "guardado correctamente") {
						this.conjuntos = data.conjuntos;
						EventBus.$emit('actualizarConjuntos');

						this.$router.push({ name: "conjuntos", params: { userId: localStorage.getItem('id') } });
					}
				})
				.catch((error) => {
					this.error = error.response.data.error;
				})
		},
		addElemento() {
			this.elementos.push({ nombre: '', tags: '', imagen: undefined, posicion: this.pos });
			this.pos++;
		}
	},
	computed: {
		isValid: function () {
			return (this.conjunto.nombre != '')
		}
	}
}
</script>
<style>
#conjunto {
	float: right;
	text-align: center;
	width: 100%;
}

#conjunto>form {
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
	margin: 0;
}

.contenedorPiezas {
	height: 120px;
	margin-left:20px;
	width:90% !important;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}
.contenedorPiezas input[type='text']{
	width: 140px;
}
.contenedorPiezas input[type='file']{
	width: 160px;
}
.contenedorPiezas img{
	height:120px; 
	width:120px;
	margin-top: 5px;
}
@media all and (min-width: 320px) and (max-width: 640px) {
	.contenedorPiezas{
		height: auto;
		flex-flow: column wrap;
	}
}
</style>

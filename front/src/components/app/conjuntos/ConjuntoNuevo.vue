<template>
	<div id="conjunto" class="container">
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
	
			<span v-if="elementos">
				<span v-for="elemento in elementos">
					<div class="form-group form-inline">
						<span>
							<label>nombre: </label>
							<input class='form-control' type="text" v-model="elemento.nombre">
						</span>
						<br/>
						<span>
							<label>tags: </label>
							<input class='form-control' type="text" v-model="elemento.tags">
						</span>
						<br/>
						<span v-if="!elemento.imagen">Imagen:
							<input type="file" class='image' v-bind:name="'imagen_'+pos" accept="image/*" @change="uploadImage">
						</span>
						<span v-else-if="elemento.imagen == 'subiendo' ">Subiendo...</span>
						<img v-else v-bind:src="elemento.imagen" v-bind:alt="elemento.nombre + 'foto'" height="120px" width="120px" />
					</div>
				</span>
	
			</span>
	
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
			this.pos++;		}
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
	width: 90%;
}
</style>

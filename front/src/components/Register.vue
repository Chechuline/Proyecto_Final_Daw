<template>
    <div class='login'>
        <h2>{{msg}}</h2>
        <span class="alert alert-danger" role="alert" v-if="error">
            {{error}}
        </span>
        <span class="alert alert-success" role="alert" v-if="mensaje_respuesta">
            {{mensaje_respuesta}}
        </span>
        <form v-on:submit.prevent="register" v-if="!mensaje_respuesta"> 
            <p>
                <strong><label for="usuario">Usuario*:</label></strong>
                <input type="text" class="form-control" id='usuario' v-model="user.usuario" name="usuario" value="" required>
            </p>
            
            <div class="form-group">
                <strong><label for="passwd">Contraseña*:</label></strong>
                <input type="passwd" class="form-control" id='passwd' v-model="user.passwd" name="passwd" value="" required>
            </div>
            <div class="form-group">
                <strong><label for="email">Email*:</label></strong>
                <input type="text" class="form-control" id='email' v-model="user.email" name="email" value="" required>
            </div>
    
            <div class="form-group">
                <strong><label for="nombre">Nombre:</label></strong>
                <input type="text" class="form-control" id='nombre' v-model="user.nombre" name="usuario" value="">
            </div>
            <div class="form-group">
                <strong><label for="apellidos">Apellidos:</label></strong>
                <input type="text" class="form-control" id='apellidos' v-model="user.apellidos" name="apellidos" value="">
            </div>
    
            <input type="submit" value="Registrar" class="btn btn-info enviar">
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'home',
    mounted() {

    },
    data() {
        return {
            msg: 'Bienvenido a la página de registro',
            error: '',
            mensaje_respuesta: undefined,
            user: {
                usuario: '',
                passwd: '',
                email: '',
                nombre: '',
                apellidos: ''
            },
        }
    },
    methods: {
        register() {
            //registra al usuario en el sistema y
            //si todo va bien guardamos token de user y redireccionamos
            if (this.user.usuario != '' && this.user.passwd != '' && this.user.email != '') {
                axios.post('http://localhost:3977/api/register', this.user)
                    .then((response) => {
                        var data = JSON.parse(response.request.responseText);
                        if (data.message === 'OK') {
                            this.mensaje_respuesta = 'Usuario creado correctamente, redireccionando a página de login...';
                            this.user.gethash = true;
                            setTimeout(() => this.$router.push('login'), 1000);
                        } else {
                            this.error = data.message;
                        };

                        console.log(data);
                    })
                    .catch((error) => {
                        this.error = error.response.data.error;
                    })
            } else {
                this.error = 'campos obligatorios no rellenos'
            }
        },
        //redireccionamos a la página principal de usuario
        logIn() {
            axios.post('http://localhost:3977/api/login', this.user)
                .then((response) => {
                    var data = JSON.parse(response.request.responseText);
                    if (data.token) {
                        this.$emit('tokenizado', data.token);
                        this.$router.push('/user/' + data.token);
                    }
                    console.log("login then:")
                    console.log(response)
                })
                .catch((error) => {
                    this.error = error.response.data.error;
                });
        }
    }
}
</script>
<style>
#registro{
    
    width: 100vw;
    height: 80vh;
    min-height: 450px;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
}
/*}
.login{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

}*/
form{
    max-width: 80%;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-self: center;
}
</style>

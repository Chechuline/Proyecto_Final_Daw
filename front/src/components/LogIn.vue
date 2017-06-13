
<template>
    <div class='login'>
        <h3>{{msg}}</h3>
        <form v-on:submit.prevent="logIn">
            <span class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </span>
            <div class="form-group">
                <strong>
                    <label for="title" class="col-form-label">Usuario/Email</label>
                </strong>
                <input type="text" id="usuario" class="form-control" v-model="user.usuario" required>
            </div>
            <div class="form-group">
                <strong>
                    <label for="title">Contraseña</label>
                </strong>
                <input type="password" id="passwd" class="form-control" v-model="user.passwd" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Entrar" class="btn btn-info enviar">
                <router-link to="/register">Registrate</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            msg: 'Login',
            error: '',
            user: {
                usuario: '',
                passwd: '',
                gethash: true
            },
        }
    },
    methods: {
        //llamada a la api para logueo
        logIn() {
            axios.post('http://localhost:3977/api/login', this.user)
                .then((response) => {
                    var data = JSON.parse(response.request.responseText);
                    if (data.token) {
                        localStorage.setItem('id', data.id);
                        localStorage.setItem('token', data.token);

                        this.$emit('tokenizado', data.token);
                        this.$router.push('/user/' + data.id);
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
.login {

    width: 100vw;
    height: 80vh;
    min-height: 450px;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
}

.enviar {
    /*font: "fontawesome";
    content: "\f2bd";*/
    height: 40px;
}
</style>

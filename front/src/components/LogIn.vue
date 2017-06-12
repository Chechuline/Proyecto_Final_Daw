
<template>
    <div>
        <h2>{{msg}}</h2>
        <form v-on:submit.prevent="logIn">
            <p>Formulario LogIn</p>
            <span class="alert alert-danger" role="alert" v-if="error">
                {{error}}
            </span><br/>
            <p>
                <label for="title">Usuario/Email</label>
                <input type="text" id="usuario" v-model="user.usuario" required>
            </p>
            <p>
                <label for="title">Contraseña</label>
                <input type="password" id="passwd" v-model="user.passwd" required>
            </p>
            <input type="submit" value="Conectar">
            <router-link to="/register">Registrate</router-link>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            msg: 'LogIn',
            error: '',
            user: {
                usuario: '',
                passwd: '',
                gethash: true
            },
        }
    },
    methods: {
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
<template>
    <div id="navigation">
        <ul>
            <li>
                <router-link to="/home">Home</router-link>
            </li>
            <li>
                <router-link to="/contacto">Contacto</router-link>
            </li>
            <li v-if="!logueado">
                <router-link to="/login">Entrar</router-link>
            </li>
            <li v-else>
                <router-link :to="{name:'perfilUsuario',params: {userId: userId}}">Usuario</router-link>
            </li>
            <li v-if="logueado">
                <router-link to="/logoff">Desconectar</router-link>
            </li>
    
        </ul>
    </div>
</template>

<script>
export default {

    name: 'navigation',
    props: ['userId'],
    watch: {
        //observa una variable y actua cuando cambia
        userId: function (newVal, oldVal) {
            console.log("cambia valor");
            this.logueado = !this.logueado;
        }
    },
    data() {
        return {
            msg: '',
            logueado: false,
            token: null,

        }
    }
}
</script>
<style>
/*normal size*/
#navigation {
    background-color: lightsalmon;

    min-height: 20px;
    height: 10vh;
    max-height: 50px;

    /*margin: 0px 1px 10px 1px;*/
    padding: 0;
    /*border: 1px solid black;*/
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
}

#navigation>ul {
    background-color: lightsalmon;
    margin:0;
    padding:0;
    width: 60%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    
}

#navigation>ul> li {
    padding: 10px 20px 0px 20px;
    width: 25vw;
    /*padding: 10px 0px 10px 0px;*/
    background-color: lightsalmon;
    margin: 0;
    transition: background-color .3s ease;
    /*padding-top:10px;*/
}
#navigation>ul> li:hover {
    background-color: salmon;
}
#navigation a{
    text-decoration: none;
    color: white;
}
#navigation a:active{
    text-decoration: none;
    color: darksalmon;
}
/*small size*/
@media all and (min-width: 320px) and (max-width: 480px) {
    #navigation {
        /*background-color: red;*/
    }
    #navigation>ul {
        width: 100vw;
        flex-flow: row nowrap;
    }
    #navigation>ul>li{
        padding:10px;
        width: 100vw;
    }
}
/*medium size*/
@media all and (min-width: 481px) and (max-width: 640px) {
    #navigation {
        /*background-color: blue;*/
    } 
    #navigation>ul>li{
        padding:10px;
    }
}
</style>

<template>
    <nav class='izq'>
        <div id="burguerMenu">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
                <li>
                    <router-link :to='{name: "perfilUsuario"}'>Perfil</router-link>
                </li>
                <li>
                    <router-link :to='{name: "conjuntos"}'>Conjuntos</router-link>
                </li>
                <div v-if="conjuntos">Mis Conjuntos</div>
                <li v-if="conjuntos" v-for="conjunto in conjuntos">
                    <router-link :to="{name:'conjunto',params: {userId:userId,setId: conjunto._id},props:{editable:editable}}">{{conjunto.nombre}}</router-link>
                </li>
    
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../bus/bus.js';
//import { mapGetters } from 'vuex'

export default {

    name: 'izq',
    data() {
        return {
            token: null,
            conjuntos: undefined,
            editable: false,
        }
    },
    watch: {
    },
    beforeMount() {
        this.userId = this.$route.params.userId;

        //escuchando evento actualizarConjuntos
        EventBus.$on('actualizarConjuntos', () => {
            this.cargarNombresConjuntos();
        })

    },
    mounted() {
        this.cargarNombresConjuntos();
    },
    methods: {
        cargarNombresConjuntos() {
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
                .catch((response) => {
                    console.log(response)
                })
        }
    },
    computed: {

    }


}
</script>
<style>
.izq {
    color: lightblue;
    background: linear-gradient(to right, rgba(135,206,250,1) 0%, rgba(135,206,250,1) 20%, rgba(207,235,253,1) 80%, rgba(243,250,254,1) 100%);
    display: flex;
    flex-flow: column nowrap;
    order: 0;
    width: 20vw;
    max-width: 20vw;
    height: 94vh;
    
}

.izq ul {
    height: 40px;
    display: flex;
    flex-flow: column nowrap;
}

.izq ul>li {
    padding: 10px 0px 10px 0px;
    display: flex;
    flex-flow: column nowrap;
}

.izq ul>div {
    padding: 10px 0px 10px 0px;
    color: black;
}

.izq a {
    color: white;
    text-decoration: none;
    transition: color .5s;
}
.izq a:hover{
    color:navy;
}

#burguerMenu>input {
    display: none;
}

/*small and medium size*/
@media all and (min-width: 320px) and (max-width: 480px) {
    /* https://codepen.io/erikterwan/pen/EVzeRP */
    #burguerMenu {

        display: block;
        position: relative;
        top: 5vw;
        left: 5vw;

        z-index: 1;

        -webkit-user-select: none;
        user-select: none;
    }

    #burguerMenu input {
        display: block;
        width: 30px;
        height: 30px;
        left: -1vw;
        top: -1vh;
        position: absolute;
        cursor: pointer;
        opacity: 0;

        z-index: 2;
    }

    #burguerMenu span {

        
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;

        background: #cdcdcd;
        border-radius: 3px;

        z-index: 1;

        transform-origin: 4px 0px;

        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        opacity 0.55s ease;
    }

    #burguerMenu span:first-child {
        transform-origin: 0% 0%;
    }

    #burguerMenu span:nth-last-child(2) {
        transform-origin: 0% 100%;
    }

    #burguerMenu input:checked~span {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #232323;
    }

    #burguerMenu input:checked~span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    #burguerMenu input:checked~span:nth-last-child(2) {
        opacity: 1;
        transform: rotate(-45deg) translate(0, -1px);
    }

    #menu {
        
        overflow:auto;
        background: rgba(239, 197, 202, 1);
        background: linear-gradient(to right, rgba(135,206,250,1) 0%, rgba(135,206,250,1) 20%, rgba(207,235,253,1) 99%, rgba(255,255,255,1) 100%);

        position: relative;
        display: flex;
        flex-flow: column nowrap;
        top: 60px;
        left: 30px;
        width: 50vw;
        height: 80vw;

        margin: -100px 0 0 -70px;

        list-style-type: none;

        transform-origin: 0% 0%;
        transform: translate(-100%, 0);

        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
        -webkit-box-shadow: 7px 4px 8px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 7px 4px 8px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 7px 4px 8px 0px rgba(0, 0, 0, 0.75);
    }

    #menu>li {
        padding: 1vw;
        margin-left: 1vw;
        margin-right: 0;
    }

    #burguerMenu input:checked~ul {
        transform: scale(1.0, 1.0);
        opacity: 1;
    }

    .izq {
        border: none;
        width: 0vw;
    }
}





























/*medium size*/

@media all and (min-width: 481px) and (max-width: 640px) {
    .izq {}
    .izq ul {}
}
</style>

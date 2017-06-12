import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

//store para poder utilizar eventos entre componentes no relacionados
//import store from './store'
import routes from './routes'

import Navigation from './components/Navigation.vue'
import App from './components/App.vue'

// //anteriores y ejemplos
// import RestaurtanteTop from './RestaurantesTop.vue'
// import RestaurtantesList from './RestaurantesList.vue'
// import Restaurante from './Restaurante.vue'
// import RestauranteAdd from './Restaurante-add.vue'

Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(Vuex)

Vue.component('navigation', Navigation);
//Vue.component('home',Home);
//Vue.component('contacto',Contacto)

/*
  {path: '/crear-restaurante',name:"crear-restaurante", component: RestauranteAdd},
  {path: '/restaurantes', component: RestaurtantesList},
  {path: '/restaurante/:id',name:'restaurante', component: Restaurante},
  {path: '/editar-restaurante/:id',name:'editar-restaurante', component: Restaurante},
  {path: '/restaurante-destacado/:id',name:'restaurante-destacado', component: RestaurtanteTop},
*/

//Rutas de la aplicación
const router = new VueRouter({
  routes,
  mode: 'history'
});

var mainApp = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


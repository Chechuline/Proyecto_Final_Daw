import Home from '../components/Home.vue'
import Contacto from '../components/Contacto.vue'
import LogIn from '../components/Login.vue'
import LogOff from '../components/LogOff.vue'
import User from '../components/app/User.vue'
import Register from '../components/register.vue'

import UserIzq from '../components/app/lateral.vue'
import Perfil from '../components/app/Perfil.vue'
import Conjunto from '../components/app/Conjunto.vue'
import ConjuntosList from '../components/app/conjuntos/ConjuntosList.vue'
import ConjuntoNuevo from '../components/app/conjuntos/ConjuntoNuevo.vue'

export default [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/contacto', component: Contacto },
  { path: '/login', name: 'login', component: LogIn },
  { path: '/logoff', component: LogOff },
  { path: '/register', component: Register },
  /*{path: '/user/:userId',name: "user",component: User, children:
    [
        {path:'profile'},
        {path:'sets'}
    ]
  },*/ //anterior a prueba
  //aqui prueba
  {
    path: '/user/:userId/', name: "user", components: {
      dch: User,
      izq: UserIzq
    }, children:
    [
      { path: '/user/:userId/', name: 'perfilUsuario', component: Perfil },
      { path: '/user/:userId/sets', name: 'conjuntos', component: ConjuntosList },
      { path: '/user/:userId/sets/:setId', name: 'conjunto', component: Conjunto },
      { path: '/user/:userId/sets/:setId/update', name: 'editarConjunto', component: Conjunto },
      { path: '/user/:userId/sets/new', name: 'crearConjunto', component: ConjuntoNuevo }
    ]
  },
  { path: '*', redirect: '/' },
];


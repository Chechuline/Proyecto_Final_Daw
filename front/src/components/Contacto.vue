<template>
    
    <div class="contacto">
      <h2>Esto es la {{msg}}</h2>
      <p>Nombre: {{name}}</p>
      <p>email: {{contact}}</p>
      <p><a @click="goLinkedIn">LinkedIn</a></p>
    </div>
</template>

<script>
export default {
  name: 'contacto',
  data () {
    return {
      msg: 'Pagina Contacto',
      contact: 'jscentelladev@gmail.com',
      name: 'Jesús Sabroso',
      LinkedIn: 'https://www.linkedin.com/in/jes%C3%BAs-sabroso-centella-1a08b588/'
    }
  },
  methods:{
    goLinkedIn(){
      window.location.href = this.LinkedIn;
    }
  }
}
</script>
<style>
.contacto{
  width: 95vw;
}
</style>

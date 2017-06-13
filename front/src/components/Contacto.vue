<template>
    
    <div class="contacto">
      <h2>{{msg}}</h2>
      <h4><strong>Nombre:</strong> {{nombre}}</h4>
      <h4><strong>Email:</strong> {{contacto}}</h4>
      <p><a @click="goLinkedIn">LinkedIn</a></p>
    </div>
</template>

<script>
export default {
  name: 'contacto',
  data () {
    return {
      msg: 'Desarrollado por:',
      contacto: 'jscentelladev@gmail.com',
      nombre: 'Jesús Sabroso',
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
.contacto > h2{
  padding-top: 5%;
}
</style>

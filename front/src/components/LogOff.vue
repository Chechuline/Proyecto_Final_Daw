<template>
    
</template>

<script>
export default {
  name: 'logoff',
  mounted(){
        console.log('eliminando token: '+localStorage.getItem('token'));
        localStorage.removeItem('token');

        
        this.$emit('logOut');
        
        var router=this.$router;
        router.push("/");
  }
}
</script>
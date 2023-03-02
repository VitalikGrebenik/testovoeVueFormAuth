<template>
  <div class="app">
    <div class="loginForm">
      <h1 class="header">Login</h1>
      <h3>username: {{ dateProfile.full_name }}</h3>
      <h3>email: {{ dateProfile.email }}</h3>
      <button class="buttonExit" @click="loginExit">Exit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { Dashboard } from './dashboard.interface';
    import axios from 'axios';

    const dateProfile = ref<Dashboard>({full_name: '', email: ''})
    const tokenCookies = useCookie('token')

    const apiUrlProfile = 'https://my.shtab.app/api/users/profile/'
    async function dateProfileLoading() {
      const response = await axios.get<Dashboard>(apiUrlProfile, {
              headers: {
                  Authorization: `Token ${tokenCookies.value}`
              }
        });
        dateProfile.value = response.data;
    }
    if(!tokenCookies.value){
        navigateTo('/')
    }

    onMounted(() => {
      dateProfileLoading()
    })

    const loginExit= () =>{
        tokenCookies.value = null
        navigateTo('/login')
    }

</script>

<style scoped>
.app {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    padding: 1rem;
    animation: fade 0.7s;
}
  
.header {
  margin-bottom: 1rem;
}
 
.loginForm {
    background: white;
    width: 40%;
    border-radius: 10px;
    padding: 2em;
}
.buttonExit{
  width: 200px;
  margin-top: 2rem;
  background: 
    linear-gradient(90deg, rgb(217 217 217) 0%, rgb(199, 0, 33) 100%);
}

@media (max-width: 768px){
    h1 {
      font-size: 1.5rem;
  }
}
</style>
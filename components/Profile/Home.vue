<script setup lang="ts">
    import { Dashboard, DashboardData } from './dashboard.interface';
    import axios from 'axios';

    const article = ref<Dashboard>({full_name: '', email: ''})

    const tokenCookies = useCookie('token')
    const apiUrlProfile = 'https://my.shtab.app/api/users/profile/'

    async function fetchArticle() {
      const response = await axios.get<Dashboard>(apiUrlProfile, {
              headers: {
                  Authorization: `Token ${tokenCookies.value}`
              }
        });
        article.value = response.data;
    }
    if(!tokenCookies.value){
        navigateTo('/')
    }

    onMounted(() => {
        fetchArticle()
    })

    const loginExit= () =>{
        tokenCookies.value = null
        navigateTo('/login')
    }

</script>

<template>
    <div class="app">
      <div class="login-form">
        <h1 class="header">Login</h1>
        <h3 class="header">username: {{ article.full_name }}</h3>
        <h3 class="header">email: {{ article.email }}</h3>
        <button @click="loginExit">Exit</button>
      </div>
    </div>
</template>


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
  
.login-form {
    background: white;
    width: 80%;
    border-radius: 10px;
    padding: 2em;
}
  
button {
  background: none;
  width: 200px;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  font: inherit;
  padding: 0.75em 2em;
  color: white;
  background: rgb(79,192,141);
  background: 
    linear-gradient(90deg, rgb(217 217 217) 0%, rgb(199, 0, 33) 100%);
  font-weight: bold;
  transition: all .2s ease-in-out;
}
  
button:hover {
  cursor: pointer;
  box-shadow: rgb(158 158 158 / 35%) 0px 5px 15px;
}
  
button:focus {
  outline: none;
  border-width: 2px;
}

@media (max-width: 768px){
    h1 {
      font-size: 1.5rem;
  }
}
</style>
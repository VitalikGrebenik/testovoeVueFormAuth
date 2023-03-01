<template>
  <div class="app">
      <form @submit.prevent='onSubmit' class="login-form">
        <h1 class="header">Login</h1>
        <div class="formInputBlok">
          <label for="username">Username</label>
          <input
            id="email"
            type="email" 
            class="input"
            placeholder='enter your email' 
            v-model="email" 
          />
          <div v-if="emailError" class="error">{{ emailError }}</div>
        </div>
        <div class="formInputBlok">
          <label for="password">Password</label>
          <input 
            id="password"
            type="password" 
            class="input" 
            v-model="password"
            placeholder='enter your password' 
            />
            <div class="error">{{ passwordError }}</div>
        </div>
        <div v-if="checkForm" class="error">Invalid email or password</div>
        <button v-if='isLoading' :disabled='isLoading' class='buttonLoading'>
          <span>loading..</span>
        </button>
        <button v-else :disabled='!checkInputCheck'>
          <span>Sign In</span>
        </button>
      </form>
  </div>
</template>
<script setup lang="ts">
  import { useField } from 'vee-validate'
  import { AuthData, AuthResponse } from './formSignIn.interface';
  import axios from 'axios';

  const { value: email, errorMessage: emailError } = useField('email', validateFieldInput)
  const { value: password, errorMessage: passwordError } = useField('password', validateFieldPassword)

  const checkInputCheck = ref(false)
  function validateFieldInput(value: string) {
    if (!value) {
      return 'this field is required';
    }
    checkInputCheck.value = true
    return true;
  }
  function validateFieldPassword(value: string) {
    if (!value) {
      return 'this field is required';
    }
    return true;
  }

  const checkForm = ref(false)
  const errorCheck = (check: boolean) => {
    checkForm.value = check
  }

  const apiUrl = 'https://my.shtab.app/api/users/user/login/'
  const isLoading = ref(false)
  const tokenCookies = useCookie('token')

  async function onSubmit() {
    try {
      isLoading.value = true
      const form: AuthData = {
        username: email.value,
        password: password.value,
      }
      const { data } = await axios.post<AuthResponse>(apiUrl, form);
        tokenCookies.value = data.token
        errorCheck(false)
        navigateTo('/profile')
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false
        errorCheck(true)
      }
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
@media (max-width: 768px){
    .header {
    margin-bottom: 0rem;
  }
}
.error {
  color: red;
}
  
.login-form {
  display: grid;
  place-items: start;
  background: white;
	width: 100%;
	max-width: 60%;
  border-radius: 10px;
  padding: 2em;
  grid-gap: .5em;
  margin: 0 15% 0 15%;
}
@media (max-width: 768px){
    .login-form {
    max-width: 100%;
    margin: 0px 10%;
  }
}
  
.input {
  height: 1.2rem;
  border-width: 0 0 2px;
  font-size: inherit;
  width: 100%;
  opacity: 0.6;
}
  
.input:focus {
  border-color: #2d9cdb;
  outline: none;
  opacity: 1;
}
.formInputBlok{
  width: 100%;
}
  
label {
  opacity: 0.6;    
}

button {
  background: none;
  width: 100%;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  font: inherit;
  padding: 0.75em 2em;
  color: white;
  background: rgb(79,192,141);
  background: 
    linear-gradient(90deg, rgb(217 217 217) 0%, rgb(0 135 199) 100%);
  font-weight: bold;
  transition: all .2s ease-in-out;
}
  
button:hover {
  cursor: pointer;
  box-shadow: rgb(158 158 158 / 35%) 0px 5px 15px;
}
.buttonLoading{
  background: 
    linear-gradient(90deg, rgb(217 217 217) 0%, rgb(125 125 125) 100%)
}
  
button:focus {
  outline: none;
  border-width: 2px;
}
</style>
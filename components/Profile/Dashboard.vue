<template>
  <div class="app">
    <div class="loginForm">
      <h1 class="header">Login</h1>
      <h2>username: {{ dateProfile.full_name }}</h2>
      <h2>email: {{ dateProfile.email }}</h2>
      <button class="buttonExit" @click="loginExit">Exit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { Dashboard } from "./dashboard.interface";

const dateProfile = ref<Dashboard>({ full_name: "", email: "" });
const tokenCookies = useCookie("token");

const apiUrlProfile = "https://my.shtab.app/api/users/profile/";
async function dateProfileLoading() {
  const response = await axios.get<Dashboard>(apiUrlProfile, {
    headers: {
      Authorization: `Token ${tokenCookies.value}`,
    },
  });
  dateProfile.value = response.data;
}
if (!tokenCookies.value) {
  navigateTo("/");
}

onMounted(() => {
  dateProfileLoading();
});

const loginExit = () => {
  tokenCookies.value = null;
  navigateTo("/login");
};
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
  width: 60%;
  border-radius: 10px;
  padding: 2em;
}
.buttonExit {
  width: 200px;
  margin-top: 2rem;
  background: linear-gradient(90deg, rgb(217 217 217) 0%, rgb(199, 0, 33) 100%);
}
@media (max-width: 768px) {
  .app {
    margin-top: 30px;
  }
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
  .loginForm {
    padding: 1em;
  }
  .header {
    margin-bottom: 0.25rem;
  }
  .buttonExit {
    margin-top: 1rem;
    width: 100px;
    padding: 0.5em 1em;
    font-size: 10px;
  }
}
@media (max-width: 481px) {
  h1 {
    font-size: 1rem;
  }
  h2 {
    font-size: 0.5rem;
  }
  .buttonExit {
    margin-top: 0.5rem;
    width: 70px;
    padding: 0.5em 1em;
    font-size: 8px;
  }
}
</style>

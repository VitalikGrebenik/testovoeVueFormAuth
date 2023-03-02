<template>
  <div class="app">
    <div class="containerApp">
      <div class="blokLogin">
        <h1 class="header">Login</h1>
        <button class="buttonRegister" @click="redirectRegister">
          <span>Register</span>
        </button>
      </div>
      <form class="loginForm" @submit.prevent="onSubmit">
        <div class="formInputBlok">
          <label for="username">Username</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="enter your email"
          />
          <div v-if="emailError" class="error">
            {{ emailError }}
          </div>
        </div>
        <div class="formInputBlok">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="passwordVisibility ? 'password' : 'text'"
              class="input"
              placeholder="enter your password"
            />
            <div class="togglePassword" @click="togglePasswordVisibility">
              <i
                :class="
                  passwordVisibility ? 'fa fa-eye-slash' : 'fa fa-eye fa-fw'
                "
              />
            </div>
          </div>
          <div class="error">
            {{ passwordError }}
          </div>
        </div>
        <div v-if="checkForm" class="error">Invalid email or password</div>
        <button v-if="isLoading" class="buttonLoading" :disabled="isLoading">
          <span>loading..</span>
        </button>
        <button v-else class="buttonSihIn">
          <span>Sign In</span>
        </button>
      </form>
      <div class="linkBlok">
        <a
          class="linkPassword"
          href="https://my.shtab.app/auth/restore-password"
          target="_blank"
          >Forgot your password?</a
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";
import axios from "axios";
import { AuthData, AuthResponse } from "./formSignIn.interface";

const { value: email, errorMessage: emailError } = useField(
  "email",
  validateFieldInput
);
const { value: password, errorMessage: passwordError } = useField(
  "password",
  validateFieldPassword
);

function validateFieldInput(value: string) {
  if (!value) {
    return "this field is required";
  }
  return true;
}
function validateFieldPassword(value: string) {
  if (!value) {
    return "this field is required";
  }
  return true;
}

const checkForm = ref(false);

const passwordVisibility = ref(true);
const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value;
};

const redirectRegister = () => {
  const url = "https://my.shtab.app/auth/registration";
  window.open(url, "_blank");
};

const apiUrl = "https://my.shtab.app/api/users/user/login/";
const isLoading = ref(false);
const tokenCookies = useCookie("token");

if (tokenCookies.value) {
  navigateTo("/profile");
}

async function onSubmit() {
  try {
    isLoading.value = !isLoading.value;
    const form: AuthData = {
      username: email.value,
      password: password.value,
    };
    const { data } = await axios.post<AuthResponse>(apiUrl, form);
    tokenCookies.value = data.token;
  } catch (error) {
    console.error(error);
    checkForm.value = true;
  } finally {
    if (tokenCookies.value) {
      checkForm.value = false;
      navigateTo("/profile");
    }
    isLoading.value = !isLoading.value;
  }
}
</script>
<style scoped>
.togglePassword {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.togglePassword i {
  font-size: 1.25rem;
  color: #1c1c1c;
}
.app {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  animation: smoothly 0.7s;
}
.containerApp {
  width: 100%;
  max-width: 40%;
  background: white;
  border-radius: 10px;
  padding: 2em;
  margin: 0 15% 0 15%;
}
.error {
  color: red;
}
.linkBlok {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.linkPassword {
  color: grey;
}
.linkPassword:hover {
  color: rgb(255, 45, 45);
}
.loginForm {
  display: grid;
  place-items: start;
  grid-gap: 0.5em;
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
.formInputBlok {
  width: 100%;
}

label {
  opacity: 0.6;
}

.blokLogin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.buttonSihIn {
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(90deg, rgb(217 217 217) 0%, rgb(0 135 199) 100%);
}

.buttonRegister {
  background: linear-gradient(90deg, rgb(217 217 217) 0%, rgb(63 215 106) 100%);
}

.buttonLoading {
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(
    90deg,
    rgb(217 217 217) 0%,
    rgb(125 125 125) 100%
  );
}

@media (max-width: 768px) {
  .app {
    margin-top: 30px;
  }
  .header {
    font-size: 20px;
  }
  .containerApp {
    padding: 1em;
    max-width: 60%;
  }
  .buttonRegister {
    padding: 0.25rem 1rem;
    padding: 0.25rem 0.5rem;
    font-size: 11px;
  }
  .buttonSihIn {
    margin-top: 0.5rem;
    padding: 0.5em 1em;
  }
  .linkBlok {
    margin-top: 10px;
  }
  label {
    font-size: 15px;
  }
  .input {
    font-size: 13px;
  }
  .linkPassword {
    font-size: 11px;
  }
  .error {
    font-size: 12px;
  }
}
@media (max-width: 481px) {
  .containerApp {
    padding: 0.5em;
  }
  .app {
    margin-top: 30px;
  }
  .buttonLoading {
    font-size: 14px;
    padding: 0.25rem 0.5rem;
  }
  .error {
    font-size: 8px;
  }
  .buttonRegister {
    padding: 0.25rem 0.5rem;
    font-size: 11px;
  }
  .buttonSihIn {
    font-size: 14px;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 13px;
  }
  .input {
    font-size: 10px;
  }
  .linkPassword {
    font-size: 8px;
  }
}
</style>

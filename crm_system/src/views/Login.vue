<template>
    <div>
<main
  class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
>
  <!-- component -->
  <section class="flex w-[30rem] flex-col space-y-10">
    <div class="text-center text-4xl font-medium">Log In</div>
    <form @submit.prevent="submitForm">
        <div
        class="w-full transform border-b-2 bg-transparent text-lg mb-4 duration-300 focus-within:border-indigo-500"
        >
        <input
            type="text"
            placeholder="Email or username"
            v-model="email"
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        />
        </div>

        <div
        class="w-full transform border-b-2 bg-transparent text-lg mb-4 duration-300 focus-within:border-indigo-500"
        >
        <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        />
        </div>
        <p v-if="errors" class="mb-4 text-red-600 text-center">Wrong username/email or password.</p>
        <button type="submit"
        class="w-full transform rounded-sm bg-indigo-600 p-2 font-bold duration-300 hover:bg-indigo-400"
        >
        LOG IN
        </button>
    </form>
    <!-- <a
      href="#"
      class="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
      >FORGOT PASSWORD?</a
    > 
    and
    remember me
    -->
  </section>
</main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : 'Login',

    data() {
        return {
            email: "",
            password: "",
            errors: false,
        }
    },
    methods: {
        async submitForm(e) {
            if (this.email && this.password) {
            this.$store.commit('setIsLoading', true)

            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('access')
            const formData = {
                email: this.email,
                password: this.password
            }
            await axios
                .post('/api/jwt/create/', formData)
                .then(response => {
                    
                    const access = response.data.access
                    const refresh = response.data.refresh

                    this.$store.commit('setAccess', access)
                    this.$store.commit('setRefresh', refresh)

                    axios.defaults.headers.common['Authorization'] = "Bearer " + access
                    localStorage.setItem('access', access)
                    localStorage.setItem('refresh', refresh)

                    this.$router.push('/')

                    this.errors = false
                })
                .catch(() => {
                    this.errors = true
                })

            this.$store.commit('setIsLoading', false)
            }
        }
    },
}

</script>
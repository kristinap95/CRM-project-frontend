<template>
    <div>
<nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
         <a href="/"> <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"> </a>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a v-if="isAdmin" href="/dashboard/clients" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Clients</a>
            <a href="/dashboard/projects" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>

          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <span :src="user_data" class="text-white px-3 py-2 rounded-md text-sm font-medium">{{user_data}}</span>
        <button @click="logout()" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log out</button>
      </div>
    </div>
  </div>
</nav>
    </div>
</template>

<script>
import axios from 'axios';

export default ({
    name: 'Navbar',
    data() {
        return {
            user_data: '',
            isAdmin: false,
        }
    },
    created() {
        if(this.$store.state.isAuthenticated) {
          this.getMe()
        }
    },
    methods: {
        getMe(e) {
            axios.get('/api/users/me/')
            .then(response => {
                this.user_data = response.data.name
                this.isAdmin = response.data.is_superuser
                localStorage.setItem('admin', response.data.is_superuser)
            })
            .catch(error => {
                console.log(error)
            })
        },
        logout() {
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('admin')
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            this.$store.commit('removeAccess')
            this.$router.go('/')
        }
    }
})
</script>
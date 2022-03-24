<template>
<div v-if="!showError">
    <div class="w-full container mx-auto py-10">
        <form class="border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3" @submit.prevent="editName">
            <h1 class="text-xl font-normal leading-norma">Edit a User name</h1>
             <div class="text-left text-sm">
                <span class="text-md font-semibold">User information:</span> <br>
                    Email: <span class="italic">{{user.email}}</span> <br>
                    Name: <span class="italic">{{user.name}}</span>
                </div>
            <Notifications v-if="show_msg" class="w-full"/>
                <div class="text-left">
                    <label>Name</label>
                    <input v-model="name" type="text" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required>
                </div>
                <button type="submit" 
                class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit
                </button>
            </form>
    </div>
    <div class="w-full container mx-auto py-10">
        <form class="w-1/3 border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3" @submit.prevent="deleteUser">
            <h1 class="text-xl font-normal leading-norma">Are you sure you want to delete this project? <br><span class="text-sm text-red-600">This action cannot be undone.</span></h1>
            <div class="flex flex-col items-left space-y-2 text-left">
                <div>
                    <label>Your password</label>
                    <input v-model="password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required>
                </div>
                <button type="submit" 
                class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete
                </button>
                <p v-if="error_password" class="text-red-600">Invalid password.</p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Notifications from '../components/Notifications.vue'

export default {
    name: 'SingleUserPage',
    data() {
        return {
            id: this.$route.params.id,
            show_msg: false, 
            password: '',
            user: [],
            showError: false,
            error_password: false,
            name: '',
        }
    },
    components: {
        Notifications,
    },
    mounted() {
        axios.get('/api/users/'+parseInt(this.id)+'/').then(response => {
            this.user=response.data
            this.name = response.data.name
            })
    },
    methods: {
        deleteUser() {
            const deleteFormData = {
                current_password: this.password,
            }
            axios.delete('/api/users/'+parseInt(this.id)+'/', deleteFormData).then(() => {
                this.showError = true
                location.reload()
            })
            .catch(() => {
                this.error_password = true
            })
        },
        editName() {
             const formData = {
                name: this.name
            }
            axios.patch('/api/users/'+parseInt(this.id)+'/', formData).then(() => {
                this.show_msg = true
            })
        }
    },
}
</script>

<style>

</style>
<template>
<div>
  <Notifications  v-if="is_saved" />
  <div v-else-if="error_msg" class="mx-auto containter p-4 mt-4 text-sm w-1/3 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
  <span class="font-medium">Error alert! </span>{{error_msg}}
</div>
  <div class="bg-white container mx-auto flex flex-row items-start justify-center mt-10 space-x-4 shadow overflow-hidden sm:rounded-lg">
 <div class="w-1/3 border-2 border-gray-300 rounded-xl"> 
   <div class="px-4 py-5 sm:px-6 bg-gray-300">
     <h3 class="text-lg leading-6 font-medium text-gray-900">Admin Information</h3>
  </div>
  <div>
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Name</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{{admin_info['name']}}</dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Email</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{{admin_info['email']}}</dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Password</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">****</dd>
      </div>
    </dl>
  </div></div>

  <!--Edit information-->
  <div class="w-1/3 container mx-auto border-2 border-gray-300 rounded-xl">
        <div class="border-b border-gray-200 dark:border-gray-700">
           <div class="px-4 py-5 sm:px-6 bg-gray-300">
     <h3 class="text-lg leading-6 font-medium text-gray-900">Edit profile</h3>
  </div>
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="mr-2">
            <button @click="tabIsGeneral()" 
             v-bind:class="{'text-blue-600 border-blue-600' : tab === 'General'}" 
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>Name
            </button>
        </li>
        <li class="mr-2">
            <button @click="tabIsEmail()" 
             v-bind:class="{'text-blue-600 border-blue-600' : tab === 'Email'}" 
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
            <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>Email
            </button>
        </li>
        <li class="mr-2">
            <button @click="tabIsPassword()" 
            v-bind:class="{'text-blue-600 border-blue-600' : tab === 'Password'}" 
            class="inline-flex p-4 text-gray-400 rounded-t-lg border-b-2 active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Password
            </button>
        </li>
    </ul>
    <form v-show="tab === 'General'" @submit.prevent="editInfo" class="p-4">
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-300">Name</label>
    <input v-model="new_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New name" required>
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
</form>
  <form v-show="tab === 'Email'" @submit.prevent="editEmail" class="p-4">
      <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left sext-gray-900 dark:text-gray-300">Current password</label>
    <input v-model="email.current_password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-300">New email</label>
    <input v-model="email.new_email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-300">New email confirm</label>
    <input v-model="email.re_new_email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <p v-show="!emailMatch() && email.re_new_email.length !== 0" class="text-red-600">Emails don't match.</p>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
</form>
<form v-show="tab === 'Password'" @submit.prevent="editPassword" class="p-4">
      <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left sext-gray-900 dark:text-gray-300">Current password</label>
    <input v-model="password.current_password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-300">New password</label>
    <input v-model="password.new_password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-300">New password confirm</label>
    <input v-model="password.re_new_password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
</form>
</div>
  </div>
</div>
</div>
</template>
<script>

import axios from 'axios';
import Notifications from '../components/Notifications.vue'
export default {

    name: 'AdminPage',
    data() {
        return {
            admin_info: {},
            new_name: '',
            new_email: '',
            tab: 'General',
            password: {
              new_password: '',
              re_new_password: '',
              current_password: '',
            },
            email: {
              new_email: '',
              re_new_email: '',
              current_password: '',
            },
            is_saved: false,
            error_msg: '',
        }
    },
    components: {
      Notifications,
    },
    mounted() {
            axios.get('/api/users/me/')
            .then(response => {
                this.admin_info = response.data
                this.new_name = response.data.name
                this.new_email = response.data.email
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
      editInfo() {
        const new_fields = {
          name: this.new_name,
          email: this.new_email,
        }
        axios.patch('/api/users/me/', new_fields).then(response => {
          if(response.status == 200) {
            this.is_saved = true
          }
        })
        .catch(error => {
          this.error_msg = 'Account with this email is already exists.'
        })
      },
      editPassword() {
        const changed_password = {
          new_password: this.password.new_password,
          re_new_password: this.password.re_new_password,
          current_password: this.password.current_password,
        }
        axios.post('api/users/set_password/', changed_password)
             .then(reponse => {
               if(reponse.status === 204) {
                 this.is_saved = true
                 this.password.re_new_password = ''
                 this.password.new_password = ''
                 this.password.current_password = ''
               }
             })
             .catch(error => {
               this.error_msg = "Invalid current password."
             })
      },
      editEmail() {
        if(!this.emailMatch) {
        const changed_email = {
           new_email: this.email.new_email,
          re_new_email: this.email.re_new_email,
          current_password: this.email.current_password,
        }
        axios.post('/api/users/set_email/', changed_email)
        .then(() =>{
          this.is_saved = true
        })
        .catch(response => {
            this.error_msg = "400 ERROR. Make sure your password is correct or account with this email already exists."
        })
        }
      },
      tabIsGeneral() {
        this.tab = 'General'
      },
      tabIsPassword() {
        this.tab = 'Password'
      },
      tabIsEmail() {
        this.tab = 'Email'
      },
      emailMatch() {
        if(this.email.new_email === this.email.re_new_email && this.email.new_email && this.email.re_new_email)
        {
          return true
        }
        return false
      },
    }
}
</script>

<style>

</style>
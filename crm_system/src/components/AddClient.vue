<template>
  <div class="container mx-auto py-10">
  <form class="border-2 rounded-lg  mt-8 p-8 border-gray-300 shadow-lg space-y-6 w-1/3" @submit.prevent="add">
  <h1 class="text-xl font-normal leading-norma">Add Client</h1>
      <div class="rounded-md shadow-sm flex flex-col space-y-4">
        <div>
          <label class="sr-only">Email address</label>
          <input v-model="email" type="email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
          <span v-show="!isEmail() && email" class="text-red-600 text-sm">Email is not a valid</span>
        </div>
        <div>
          <label class="sr-only">Name</label>
          <input v-model="name" type="text" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name">
           <span v-show="!isName() && name" class="text-red-600 text-sm">Name is not a valid</span>
        </div>
        <div>
          <label class="sr-only">Password</label>
          <input v-model="password" type="password"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          <span v-show="!isPassword() && password" class="text-red-600 text-sm">
            Password must contains at least 7 characters and at least one lowercase, one uppercase and one digit characters.
          </span>
        </div>
        <div>
          <label class="sr-only">Passwords</label>
          <input v-model="confirm_password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm password">
          <span v-show="!isPasswordConfirm() && confirm_password && password" class="text-red-600 text-sm">
            Passwords do not match.
          </span>
        </div>
      </div>
      <div>
        <div v-if="error_msg" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span class="font-medium">Error message! </span>{{error_msg}}
        </div>
         <div v-if="successfully_msg" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
          <span class="font-medium">Success alert!</span>Account has been added successfully.
        </div>
        <button type="submit" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
         Add
        </button>
      </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {

    name: 'AddClient',
    data() {
        return {
            email: '',
            name: '',
            password: '',
            confirm_password: '',

            error_msg: '',
            successfully_msg: false,
        }
    },
    methods: {
      isName() {
          let result = this.name.replace(/^\s+|\s+$/gm,'');
          if(result.length !== 0) {return true}
          else {return false}
      },
      isEmail() {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(this.email);
      },
      isPassword() {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/;
        return re.test(this.password);
      },
      isPasswordConfirm() {
        if (this.password === this.confirm_password && this.password.length !== 0) {return true}
        else {return false}
      },

      add() {
         if(this.isName() && this.isEmail() && this.isPassword() && this.isPasswordConfirm()) {
            const clientData = {
              email: this.email,
              name: this.name.replace(/^\s+|\s+$/gm,''), // to avoid the case e.g.    Client      name    
              password: this.password,
            }
            axios.post('/api/users/', clientData)
            .then(response => {
              if(response.status === 201) {
                this.successfully_msg = true
                this.email = ''
                this.name = ''
                this.password = ''
                this.confirm_password = ''
              }
            })
            .catch(error =>{
              this.error_msg = "Account with this email already exists."
            })
          }
          else if(!this.isName() || this.isEmail() || this.isPassword() || this.isPasswordConfirm()){
            this.error_msg = "Please make sure all fields are filled in correctly. All fields are required."
            return false
          }
       },
    },
}
</script>

<style>

</style>
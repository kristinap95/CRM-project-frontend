<template>
  <div class="bg-white container w-1/3 mx-auto mt-10 shadow overflow-hidden sm:rounded-lg border-2 border-gray-300 rounded-xl">
  <div class="px-4 py-5 sm:px-6 bg-gray-300">
     <h3 class="text-lg leading-6 font-medium text-gray-900">Client Information</h3>
  </div>
  <div>
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Name</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{{client_info['name']}}</dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Email</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{{client_info['email']}}</dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Password</dt>
        <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">****</dd>
      </div>
    </dl>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ClientPage',
    data() {
        return {
            client_info: {},
        }
    },
    mounted() {
        axios.get('/api/users/me/')
            .then(response => {
                this.client_info = response.data
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style>

</style>
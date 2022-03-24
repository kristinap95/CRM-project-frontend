<template>
  <div class="w-full container mx-auto py-10">
  <form class="border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3" @submit.prevent="add">
  <h1 class="text-xl font-normal leading-norma">Add a Project</h1>
      <div class="rounded-md text-left text-sm shadow-sm flex flex-col space-y-4">
        <div>
          <label>Title</label>
          <input v-model="title" type="text" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required>
        </div>
        <div>
          <label class="">Description</label>
          <textarea v-model="description" rows="10" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required>
          </textarea>
        </div>
        <div>
          <label class="">Deadline</label>
         <VueDatePicker v-model="deadline" noToday :minDate="new Date()" :enableTimePicker="false" class="border border-gray-400" required/>
        </div>
        <div>
          <label class="">Status</label>
          <div>
            <div>
                <select v-model="status" class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-400
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" required>
                    <option value="New" selected>New</option>
                    <option value="In progress">In progress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
  </div>
</div>
        </div>
        <div>
          <label>Client</label>
                    <div>
            <div>
                <select v-model="idClient" class="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-400
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" required>
                    <option v-for="client in all_clients" v-bind:value="client.id">{{client.name}}</option>
                </select>
  </div>
</div>
        </div>
      </div>
      <div>
        <Notifications v-if="success_msg" class="w-full mb-2" />
        <button type="submit" 
        class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
         Add
        </button>
      </div>
    </form>
</div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';
import Notifications from './Notifications.vue'

export default {
    name: 'AddProject',
    data() {
      return {
        title: '',
        description: '',
        status: '',
        deadline: null,
        success_msg: false,
        all_clients: [],
        idClient: 0,
      }
    },
    components: {
       VueDatePicker,
       Notifications,
    },
    mounted() {
        axios.get('/api/users/me/').then(response => {this.me = response.data.id})
        axios.get('/api/users/').then(response => {this.all_clients = response.data})
    },
    methods: {
        add() {
          console.log(this.idClient)
          const date = this.deadline.getFullYear()+'-'+(this.deadline.getMonth() + 1)+'-'+this.deadline.getDate()
          const formData = {
            title: this.title,
            status: this.status,
            deadline: date,
            description: this.description,
            created_by: parseInt(this.idClient),
          }
          axios.post('/api/projects/', formData).then(response => {
            this.success_msg = true
            this.title = ''
            this.description = ''
            this.status = ''
            this.deadline = null
            this.idClient = 0
          })
        },
    },
}
</script>

<style>

</style>
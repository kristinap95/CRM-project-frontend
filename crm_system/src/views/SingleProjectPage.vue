<template>
<div v-if="!showError">
  <div v-if="role === 'false'" class="w-full container mx-auto py-10">
  <div class="border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3">
  <h1 class="text-xl font-normal leading-norma">Edit a Project</h1>
  <div class="text-left">
      <h1>Project information</h1>
      <p>Title:<span class="italic"> {{project_info['title']}} </span></p>
      <p>Description:<span class="italic"> {{project_info['description']}} </span></p>
      <p>Deadline:<span class="italic"> {{project_info['deadline']}} </span></p>
      <p>Status:<span class="italic"> {{project_info['status']}} </span></p>
  </div>
  <form class="text-left flex flex-nowrap items-center space-x-2" @submit.prevent="setStatus">
          <label class="">Status:</label>
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
        <button type="submit" 
        class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
         Edit
        </button>
    </form>
    
        <Notifications v-if="is_saved" class="w-full"/>
    </div>
    
</div>
 <div v-else-if="role === 'true'" class="w-full container mx-auto py-10">
  <form class="border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3" @submit.prevent="add">
  <h1 class="text-xl font-normal leading-norma">Edit a Project</h1>
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
<div class="w-full container mx-auto py-10">
  <form class="w-1/3 border-2 rounded-lg  mt-8 p-8 border-gray-500 shadow-lg space-y-6 w-1/3" @submit.prevent="deleteProject">
  <h1 class="text-xl font-normal leading-norma">Are you sure you want to delete this project? <br><span class="text-sm text-red-600">This action cannot be undone.</span></h1>
        <div class="flex justify-end">
        <button type="submit" 
        class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
         Delete
        </button>
        </div>
    </form>
</div>
</div>

</template>

<script>
import axios from 'axios';
import Notifications from '../components/Notifications.vue'
export default {
    name: 'SingleProjectPage',
    data() {
        return {
            id: this.$route.params.id,
            showError: false,
            project_info: [],
            status: '',
            role: localStorage.getItem('admin'),
            is_saved: false,
            all_clients: [],
            idClient: 0,
            title: '',
            description: '',
            deadline: '',
        }
    },
    components: {
        Notifications,
    },
    mounted() {
        axios.get('/api/projects/'+this.id+'/').then(response => {this.project_info=response.data, this.status=response.data.status}).catch(error => {this.showError=true})
    },
    methods: {
        deleteProject() {
            axios.delete('/api/projects/'+this.id+'/').then(response => {
                location.reload()
            })
        },
        setStatus() {
            const new_status = {
                status: this.status
            }
            axios.patch('/api/projects/'+this.id+'/', new_status)
            .then(() => {this.is_saved = true})
        },
    },
}
</script>

<style>

</style>
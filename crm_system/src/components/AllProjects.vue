<template>
  <div class="container mx-auto py-10">
            <div class="px-4 md:px-10 py-4 md:py-7 bg-gray-100 dark:bg-gray-700 rounded-tl-lg rounded-tr-lg">
                <div class="sm:flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white ">All Projects</p>
                </div>
            </div>
            <div class="mx-auto container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
                <div class="w-full overflow-x-scroll xl:overflow-x-hidden">
                <table class="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr class="w-full h-16 border-gray-300 border-b py-8">
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">No.</th>
                            <td role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Status</td>
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Title</th>
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Description</th>
                            <td role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Deadline</td>
                            <td v-if="role === 'true'" role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Client</td>
                             <td role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="role === 'false'"
                        v-for="(project, index) in all_projects" class="h-24 border-gray-300 border-b">
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{index+1}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                             <span v-bind:class="{
                                 'bg-yellow-100 text-yellow-800' : project.status === 'New',
                                 'bg-indigo-100 text-indigo-800' : project.status === 'In progress',
                                 'bg-red-100 text-red-800' : project.status === 'Cancelled',
                                 'bg-blue-100 text-blue-800' : project.status === 'Completed',
                             }"
                             class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{{project.status}}</span></td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.title}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.description}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.deadline}}</td>
                             <td><a :href="`/dashboard/project/${project.id}/`"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </a></td>
                         
                        </tr>
                        <tr v-else-if="role === 'true'"
                        v-for="(project, index) in all_projects_admin" :key='project.id' class="h-24 border-gray-300 border-b">
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{index+1}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                             <span v-bind:class="{
                                 'bg-yellow-100 text-yellow-800' : project.status === 'New',
                                 'bg-indigo-100 text-indigo-800' : project.status === 'In progress',
                                 'bg-red-100 text-red-800' : project.status === 'Cancelled',
                                 'bg-blue-100 text-blue-800' : project.status === 'Completed',
                             }"
                             class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{{project.status}}</span></td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.title}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.description}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.deadline}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{project.created_by}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            <a :href="`/dashboard/project/${project.id}/`"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </a></td>
                           
                        </tr>
                    </tbody>
                </table>
                <div v-if="!all_projects || !all_projects_admin" class="container my-10 mx-auto text-center text-2xl">No projects yet</div>
            </div>
              </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AllProjects',
    data() {
        return {
            all_projects: [],
            role: localStorage.getItem('admin'),
            all_projects_admin: [],
        }
    },
    mounted() {
       axios.get('/api/projects/')
           .then(response => {
               if(this.role === 'true') {this.all_projects_admin = response.data}
            else if(this.role === 'false'){this.all_projects = response.data}
           })
    },
    
}
</script>

<style>

</style>
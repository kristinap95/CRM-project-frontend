<template>
  <div class="container mx-auto py-10">
            <div class="px-4 md:px-10 py-4 md:py-7 bg-gray-100 dark:bg-gray-700 rounded-tl-lg rounded-tr-lg">
                <div class="sm:flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white ">All Clients</p>
                    <div class="flex items-center justify-center ">
                        <div class="flex border-2 border-gray-400 rounded">
                            <input v-model="filter" type="text" class="px-4 py-2 w-80" placeholder="Search by name...">
                            <button class="px-4 text-white bg-gray-600 border-l ">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-auto container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
                <div class="w-full overflow-x-scroll xl:overflow-x-hidden">
                <table class="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr class="w-full h-16 border-gray-300 border-b py-8">
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">No.</th>
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Name</th>
                            <th role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Email</th>
                            <td role="columnheader" class="text-center text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(client, index) in filteredClientsRows" class="h-24 border-gray-300 border-b">
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{index+1}}</td>
                            <td v-html="highlightMatches(client.name)" class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4"></td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{client.email}}</td>
                            <td class="w-full flex flex-row justify-center">
                             <a :href="`/dashboard/client/${client.id}/`"> <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
              </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AllClients',
    data() {
        return {
            all_clients: [],
            filter: '',
        }
    },
    mounted() {
      axios.get('/api/users/')
           .then(response => {
             this.all_clients = response.data
           })
    },
    computed: {
        filteredClientsRows() {
            return this.all_clients.filter(row => {
                const clients_name = row.name.toString().toLowerCase();
                const searchTerm = this.filter.toLowerCase();
                return clients_name.includes(searchTerm);
            });
        }
    },
    methods: {
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.filter.toLowerCase());
            if (!matchExists) return text;
            const re = new RegExp(this.filter, 'ig');
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
    }
},
}
</script>

<style>

</style>
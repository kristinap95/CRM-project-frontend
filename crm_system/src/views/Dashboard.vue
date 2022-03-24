<template>
    <div>
        <div v-if="role === 'true'"><AdminPage /></div>
        <div v-else> <ClientPage /> </div>
    </div>
</template>

<script>
import AdminPage from '../views/AdminPage.vue'
import ClientPage from '../views/ClientPage.vue'
export default {

    name: 'Dashboard',
    data() {
        return {
            role: localStorage.getItem('admin'),
        }
    },
    components: {
        AdminPage,
        ClientPage,  
    },
}
</script>
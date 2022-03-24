<template>
  <div>
      <AddProject v-if="role === 'false'"/>
      <AddProjectAsAdmin v-else-if="role === 'true'"/>
      <AllProjects />
  </div>
</template>

<script>
import AddProject from '../components/AddProject.vue'
import AllProjects from '../components/AllProjects.vue'
import AddProjectAsAdmin from '../components/AddProjectAsAdmin.vue'

export default {
    name: 'ProjectsPage',
    data() {
      return {
        role: localStorage.getItem('admin')
      }
    },
    components: {
        AddProject,
        AllProjects,
        AddProjectAsAdmin,
    }
}
</script>

<style>

</style>
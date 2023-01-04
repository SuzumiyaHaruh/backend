<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>
<script setup>

import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style scoped>

</style>

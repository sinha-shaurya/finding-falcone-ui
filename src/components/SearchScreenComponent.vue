<script setup>
//import { ref, onMounted } from "vue";


</script>

<template>
  <div class="card">
    <h1 v-if="isFound">Found on Planet {{ planet }}</h1>
    <h1 v-else>Not Found on any planet</h1>
  </div>
</template>

<style scoped></style>

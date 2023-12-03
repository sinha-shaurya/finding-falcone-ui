<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const isSuccess = ref(null);
const planet = ref(null);
const route = useRoute();

const data = ref(JSON.parse(route.query.data));
const request = computed(() => {
  return data.value.request;
});
const time = computed(() => {
  return data.value.time;
});

console.log(data.value);
console.log(request.value);

function findFalcone() {
  console.log("Triggered HTTP request");
  console.log(request.value);
  const url = "https://findfalcone.geektrust.com" + "/find";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  //set headers
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText);
      //check for success
      if (response.status === "false") {
        isSuccess.value = false;
      } else if (response.status === "success") {
        isSuccess.value = true;
        planet.value = response.planet_name;
      }
    }
  };
  xhr.send(JSON.stringify(request.value));
}

const router = useRouter();
const goBack=()=>{
  router.go(-1);
}
onMounted(() => {
  findFalcone();
});
</script>

<template>
  <div class="container px-0">
    <div class="row justify-content-center">
      <h2>Time taken : <br />{{ time }}</h2>
    </div>
    <div class="row justify-content-right">
      <h1 v-if="isSuccess">Found on Planet {{ planet }}</h1>
      <h1 v-else>Not Found on any planet</h1>
    </div>
    <button class="btn btn-primary" @click="goBack">Go Back</button>
  </div>
</template>

<style scoped></style>

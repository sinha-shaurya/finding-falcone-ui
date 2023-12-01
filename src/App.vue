<script setup>
import { onMounted, ref, computed, watch } from "vue";
import DestinationComponent from "./components/DestinationComponent.vue";

const base_url = "https://findfalcone.geektrust.com";

const token = ref(null);
const isTokenAccessible = ref(false);
function get_token() {
  const url = base_url + "/token";
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText);
      token.value = response.token;
      isTokenAccessible.value = true;
    } else {
      console.log("Error while getting response" + xhr.status);
      token.value = "Error";
    }
  };
  xhr.send();
}

//Planets API

const refPlanetList = ref([]);

const dest1 = ref(null);
const dest2 = ref(null);
const dest3 = ref(null);
const dest4 = ref(null);
function fetchPlanets() {
  const url = base_url + "/planets";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      refPlanetList.value = JSON.parse(xhr.responseText);
    } else {
      console.log("Error while getting response" + xhr.status);
      refPlanetList.value = [];
    }
  };
  xhr.send();
  return refPlanetList.value;
}

watch(isTokenAccessible, (newValue) => {
  if (newValue) {
    fetchPlanets();
    fetchVehicles();
  }
});
const planetList = computed(() => {
  return refPlanetList.value.map((planet, index) => {
    const toShow=![dest1.value, dest2.value, dest3.value, dest4.value].includes(index.toString())
    return { ...planet, toShow };
  });
});

// Vehicles API
const refVehiclesList = ref([]);

function fetchVehicles() {
  const url = base_url + "/vehicles";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      refVehiclesList.value = JSON.parse(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  };
  xhr.send();
  return refVehiclesList.value;
}
const vehicleList = computed(() => {
  return refVehiclesList.value;
});


//Get token as soon as app starts
onMounted(() => {
  get_token();
});
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Finding Falcone</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest1"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest2"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest3"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest4"
        />
      </div>
    </div>
  </div>

  <h1></h1>
</template>

<style scoped>
.col {
  width: auto;
}
</style>

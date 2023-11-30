<script setup>
import { onMounted, ref, computed, watch } from "vue";

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

const dest1 = ref("");
const dest2 = ref("");
const dest3 = ref("");
const dest4 = ref("");
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
  return refPlanetList.value.map((item) => {
    const toShow = ![dest1, dest2, dest3, dest4].some(
      (dest) => dest.value.name === item.name
    );
    return { ...item, toShow };
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
const vehicleList = computed(()=>{
  return refVehiclesList.value;
})

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
        <label for="dest1" class="text-nowrap">Destination 1</label>
        <select id="dest1" v-model="dest1" class="form-control">
          <option
            v-for="planetItem in planetList"
            :key="planetItem.distance"
            :value="{ name: planetItem.name, distance: planetItem.distance }"
            v-show="planetItem.toShow"
          >
            {{ planetItem.name }}
          </option>
        </select>
        
      </div>
      <div class="col">
        <label for="dest2" class="text-nowrap">Destination 2</label>
        <select id="dest2" v-model="dest2" class="form-control">
          <option
            v-for="planetItem in planetList"
            :key="planetItem.distance"
            :value="{ name: planetItem.name, distance: planetItem.distance }"
            v-show="planetItem.toShow"
          >
            {{ planetItem.name }}
          </option>
        </select>
      </div>
      <div class="col">
        <label for="dest3" class="text-nowrap">Destination 3</label>
        <select id="dest3" v-model="dest3" class="form-control">
          <option
            v-for="planetItem in planetList"
            :key="planetItem.distance"
            :value="{ name: planetItem.name, distance: planetItem.distance }"
            v-show="planetItem.toShow"
          >
            {{ planetItem.name }}
          </option>
        </select>
      </div>
      <div class="col">
        <label for="dest4" class="text-nowrap">Destination 4</label>
        <select id="dest4" v-model="dest4" class="form-control">
          <option
            v-for="planetItem in planetList"
            :key="planetItem.distance"
            :value="{ name: planetItem.name, distance: planetItem.distance }"
            v-show="planetItem.toShow"
          >
            {{ planetItem.name }}
          </option>
        </select>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<style scoped>
.col {
  width: auto;
}
</style>

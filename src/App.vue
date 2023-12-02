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
    const toShow = ![
      dest1.value,
      dest2.value,
      dest3.value,
      dest4.value,
    ].includes(index.toString());
    return { ...planet, toShow };
  });
});

// Vehicles API
const refVehiclesList = ref([]);
const originalVehicleList = ref([]);
const v1 = ref(-1);
const pv1 = ref(-1);
const v2 = ref(-1);
const pv2 = ref(-1);
const v3 = ref(-1);
const pv3 = ref(-1);
const v4 = ref(-1);
const pv4 = ref(-1);
function fetchVehicles() {
  const url = base_url + "/vehicles";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      refVehiclesList.value = JSON.parse(xhr.responseText);
      originalVehicleList.value = JSON.parse(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  };
  xhr.send();
  return refVehiclesList.value;
}

//Dynamically adjust list based on chosen options

watch(v1, (newValue) => {
  if (pv1.value >= 0) refVehiclesList.value[pv1.value].total_no += 1;
  refVehiclesList.value[newValue].total_no -= 1;
});
watch(v2, (newValue) => {
  if (pv2.value >= 0) refVehiclesList.value[pv2.value].total_no += 1;
  refVehiclesList.value[newValue].total_no -= 1;
});
watch(v3, (newValue) => {
  if (pv3.value >= 0) refVehiclesList.value[pv3.value].total_no += 1;
  refVehiclesList.value[newValue].total_no -= 1;
});
watch(v4, (newValue) => {
  if (pv4.value >= 0) refVehiclesList.value[pv4.value].total_no += 1;
  refVehiclesList.value[newValue].total_no -= 1;
});
const vehicleList = computed(() => {
  return refVehiclesList.value;
});

const handleVehicleUpdate = (newValue) => {
  console.log(newValue);
  switch (newValue.componentNumber) {
    case 1:
      pv1.value = v1.value;
      v1.value = newValue.index;
      break;
    case 2:
      pv2.value = v2.value;
      v2.value = newValue.index;
      break;
    case 3:
      pv3.value = v3.value;
      v3.value = newValue.index;
      break;
    case 4:
      pv4.value = v4.value;
      v4.value = newValue.index;
  }
};

//Button Click Handling
const time = ref(0);

//Get token as soon as app starts
onMounted(() => {
  get_token();
});

//utility function for creating map
function createFMap(arr) {
  const frequencyMap = new Map();

  for (const element of arr) {
    frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
  }

  return frequencyMap;
}
</script>

<template>
  <div class="container-fluid px-0" style="background-color: aqua;">
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
          @update:vehicle="handleVehicleUpdate"
          :componentNumber="1"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest2"
          @update:vehicle="handleVehicleUpdate"
          :componentNumber="2"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest3"
          @update:vehicle="handleVehicleUpdate"
          :componentNumber="3"
        />
      </div>
      <div class="col">
        <DestinationComponent
          :planets="planetList"
          :vehicles="vehicleList"
          v-model:planet="dest4"
          @update:vehicle="handleVehicleUpdate"
          :componentNumber="4"
        />
      </div>
      <div class="col">
        <h1>
          {{ time }}
        </h1>
      </div>
    </div>
  </div>

  <h1></h1>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

</style>

<script setup>
import { ref } from "vue";
const props = defineProps([
  "planets",
  "vehicles",
  "planet",
  "vehicle",
  "componentNumber",
]);
const emit = defineEmits(["update:planet", "update:vehicle"]);
const selectedPlanet = ref(0);

function handleDestinationChange(event) {
  selectedPlanet.value = props.planets[event.target.value].distance;
  //check for compatability
  if (
    currentVehicleObject.value != null &&
    cannotTravel(currentVehicleObject.value.max_distance)
  ) {
    //reset selection to null
    selectedVehicleIndex.value = null;
  }

  emit("update:planet", event.target.value);
}

const selectedVehicleIndex = ref("");
const currentVehicleObject = ref(null);

const handleVehicleChange = () => {
  currentVehicleObject.value = props.vehicles[selectedVehicleIndex.value];
  emit("update:vehicle", {
    index: selectedVehicleIndex.value,
    componentNumber: props.componentNumber,
  });
};

function cannotTravel(distance) {
  return distance < selectedPlanet.value;
}
</script>

<template>
  <div>
    <label class="text-nowrap">Destination</label>
    <select
      class="form-control"
      :value="planet"
      @change="handleDestinationChange($event)"
    >
      <option
        v-for="(planetItem, id) in planets"
        :key="planetItem.distance"
        :value="id"
        v-show="planetItem.toShow"
      >
        {{ planetItem.name }}
      </option>
    </select>

    <label v-for="(item, index) in vehicles" :key="index">
      <input
        type="radio"
        :value="index"
        @change="handleVehicleChange"
        v-model="selectedVehicleIndex"
        :disabled="item.total_no <= 0 || cannotTravel(item.max_distance)"
      />
      {{ item.name }} ({{ item.total_no }})
    </label>
  </div>
</template>

<style scoped></style>

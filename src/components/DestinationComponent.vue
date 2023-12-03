<script setup>
import { ref, computed } from "vue";
const props = defineProps([
  "planets",
  "vehicles",
  "planet",
  "vehicle",
  "componentNumber",
]);
const emit = defineEmits(["update:planet", "update:vehicle"]);
const selectedPlanet = ref(null);

function handleDestinationChange(event) {
  selectedPlanet.value = props.planets[event.target.value];
  emit("update:planet", event.target.value);
}

const selectedVehicleIndex = ref("");
const selectedVehicleObject = ref(null);
const handleVehicleChange = () => {
  selectedVehicleObject.value = props.vehicles[selectedVehicleIndex.value];
  emit("update:vehicle", {
    index: selectedVehicleIndex.value,
    componentNumber: props.componentNumber,
  });
};

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
        :disabled="item.total_no <= 0"
      />
      {{ item.name }} ({{ item.total_no }})
    </label>
  </div>
</template>

<style scoped></style>

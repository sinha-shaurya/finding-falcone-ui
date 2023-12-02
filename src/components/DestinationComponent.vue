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

function handleDestinationChange(event) {
  emit("update:planet", event.target.value);
}

const selectedVehicle = ref("");
const handleVehicleChange = () => {
  emit("update:vehicle", {
    index: selectedVehicle.value,
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
        v-model="selectedVehicle"
        :disabled="item.total_no <= 0"
      />
      {{ item.name }} ({{ item.total_no }})
    </label>
  </div>
</template>

<style scoped></style>

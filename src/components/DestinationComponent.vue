<script setup>
import { ref } from "vue";
defineProps(["planets", "vehicles", "planet"]);
const emit = defineEmits(["update:planet"]);

function handleDestinationChange(event) {
  emit("update:planet", event.target.value);
}

const formId = ref(Math.random().toString(36).substring(2, 7));
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

    <div class="form-check">
      <label v-for="vehicle in vehicles" :key="vehicle.total_no">
        <input type="radio" class="form-check-input" name="vehicleGroup" /> 
        {{ vehicle.name +"("+vehicle.total_no+")"}}
      </label>
    </div>
  </div>
</template>

<style scoped></style>

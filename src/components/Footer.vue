<template>
  <footer>
    <div class="filter"> Фильтровать по: </div>

    <div v-if="props.filter == 2" class="selected-filter-button">
      Отсутствующим 
    </div>

    <div v-else class="filter-button" @click="emit('selectFilter', 2, false)"> 
      Отсутствующим 
    </div>

    <div v-if="props.filter == 3" class="selected-filter-button"> 
      Присутствующим 
    </div>

    <div v-else class="filter-button" @click="emit('selectFilter', 3, false)">
      Присутствующим 
    </div>

    <div v-if="props.filter == 1" class="selected-filter-button">
      Без фильра 
    </div>

    <div v-else class="filter-button" @click="emit('selectFilter', 1, false)"> 
      Без фильра 
    </div>
  </footer>
</template>


<script setup>
import { defineProps, defineEmits, computed } from "vue"

const props = defineProps(['filter'])
const emit = defineEmits(['selectFilter'])

</script>


<style scoped>
footer {
  width: 100%;
  top: 92vh;
  height: 80px;
  display: flex;
  position: fixed;
  align-items: center;
  padding-left: 35px;
  gap: 35px;
  font-family: 'Open Sans', sans-serif;
  background-color: white;
}

.filter {
  font-size: 20px;
  font-weight: 600;
}

.filter-button {
  padding-top: 4px;
  font-size: 16px;
  font-weight: 400;
  color: #4E3000;
  
}

.selected-filter-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: white;
  background-color: #C4C4C4;
  border-radius: 15px;
  padding-right: 10px;
  padding-left: 10px;
  width: 130px;
  height: 40px;
}
</style>

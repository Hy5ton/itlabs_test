<template>
  <header class="site-header">
    <div class="logo">
      <Logo class="logo-text"></Logo>
      <RedCircle class="red-circle"></RedCircle>
      <GreenCircle class="green-circle"></GreenCircle>
    </div>
    <div class="action-block">
      <input v-model="nameToFind" class="search-input" type="text" placeholder="Поиск по имени">
      <button class="button-add" @click="emit('addUserPopup')"> 
        Добавить 
      </button>
    </div>
    <div class="users-block">
      <div> Посетители </div>
      <div class="users-counter">
        <div style="margin-right: 5px; color: #80BB00;"> 
          {{ presenceCount.present }}
        </div>

        <div> / </div>

        <div style="margin-left: 5px; color: #EC5937;"> 
          {{ presenceCount.absent }} 
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import Logo from './icons/Logo.vue';
import RedCircle from './icons/RedCircle.vue';
import GreenCircle from './icons/GreenCircle.vue';
import { ref, defineProps, defineEmits, computed, watchEffect } from "vue"

const emit = defineEmits(['addUserPopup', 'selectFilter'])
const props = defineProps(['users', 'filter'])

const presenceCount = computed(() => 
  props.users.reduce((counter, user) => {
    if (user.presence) {
      counter.present++
    } else {
      counter.absent++
    }
    return counter
  }, 
{ present: 0, absent: 0 }))

const nameToFind = ref(null)

watchEffect(() => emit('selectFilter', props.filter, nameToFind.value))
</script>


<style scoped>
.site-header {
  display: flex;
  margin-top: 20px;
}

.logo {
  display: flex;
}

.logo-text {
  height: 60px;
}

.action-block {
  display: flex;
  margin-top: 20px;
}

.red-circle {
  position: absolute;
  height: 16px;
  margin-left: 116px;
  margin-top: 9px;
}

.green-circle {
  position: absolute;
  height: 16px;
  margin-left: 83px;
  margin-top: 9px;
}

.search-input {
  height: 19px;
  width: 300px;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans', sans-serif;
}

.button-add {
  margin-left: 30px;
  width: 200px;
  height: 40px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
}

.users-block {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
}

.users-counter {
  display: flex;
  justify-content: end;
}
</style>

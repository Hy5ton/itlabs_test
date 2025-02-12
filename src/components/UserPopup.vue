<template>
  <div class="popup-mask">
    <div class="popup-container">
      <div class="popup-header">
        <Close class="close-icon" @click.stop="emit('closePopup')"/>
      </div>
      <div class="popup-body">
        <div class="popup-content">
          <div class="content-item"> ФИО </div>
          <input v-model="userName" class="search-input content-item" type="text">
        </div>
        <div class="popup-content">
          <div class="content-item"> Компания </div>
          <input v-model="userCompany" class="search-input content-item" type="text">
        </div>
        <div class="popup-content">
          <div class="content-item"> Группа </div>
          <select v-model="userGroup" class="select-item content-item">
            <option value=""> Выбрать </option>
            <option v-for="group in props.groups" :value="group"> {{ group }} </option>
          </select>
        </div>
        <div class="popup-content">
          <div class="content-item">Присутствие</div>
          <div class="content-item">
            <input v-model="userPresence" style="height: 24px; width: 24px;" type="checkbox" />
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <div>
          <button v-if="!props.editedUser" class="footer-button" style="background-color: #4CAF50; 
                  margin-right: 20px;" @click.stop="addUser"> 
            Добавить 
          </button>
          <button v-else class="footer-button" style="background-color: #4CAF50; 
                  margin-right: 20px;" @click.stop="saveEditedUser"> 
            Редактировать 
          </button>
          <button class="footer-button" style="background-color: #737373;" 
                  @click.stop="emit('closePopup')"> 
            Закрыть 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue"
import Close from './icons/Close.vue'

const props = defineProps(['userNumber', 'groups', 'editedUser']);
const emit = defineEmits(['closePopup', 'addUser', 'saveEditedUser']);

const userName = ref('')
const userCompany = ref('')
const userGroup = ref('')
const userPresence = ref(false)

function saveEditedUser() {
  const user = ref({
    name: userName.value,
    company: userCompany.value,
    group: userGroup.value,
    presence: userPresence.value
  })
  emit('saveEditedUser', props.editedUser, user)
}

function addUser() {
  const user = ref({
    name: userName.value,
    company: userCompany.value,
    group: userGroup.value,
    presence: userPresence.value
  })

  userName.value = ''
  userCompany.value = ''
  userGroup.value = ''
  userPresence.value = false

  emit('addUser', user)
  emit('closePopup')
}

onMounted(() => {
  if(props.editedUser) {
    userName.value = props.editedUser.name
    userCompany.value = props.editedUser.company
    userGroup.value = props.editedUser.group
    userPresence.value = props.editedUser.presence
  }
})
</script>


<style scoped>
select {
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	appearance: none;
	background-image: url('../assets/ArrowDown.svg');
	background-position: 98% center;
	background-repeat: no-repeat;
	outline: none;
}

.content-item {
  flex: 1;
}

.popup-content {
  margin-bottom: 30px;
  width: 600px;
  display: flex;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
}

.popup-header {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.close-icon {
  height: 30px;
  width: 30px;
}

.popup-body {
  display: flex;
  flex-direction: column;
}

.search-input {
  margin-left: 40px;
  height: 26px;
  width: 254px;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.select-item {
  padding-left: 20px;
  margin-left: 26px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-container {
  width: 900px;
  margin: 150px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup-footer {
  display: flex;
  justify-content: center;
}

.footer-button {
  font-family: 'Open Sans', sans-serif;
  width: 200px;
  height: 35px;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
}
</style>
<template>
  <Header :users="users" :filter="selectedFilter" @addUserPopup="addUserPopup" 
          @selectFilter="selectFilter"/>
  <Table :users="filtredUsers" @editUser="editUser"/>
  <Footer @selectFilter="selectFilter" :filter="selectedFilter"/>
  <UserPopup v-if="isOpenPopup" :editedUser="editedUser" :groups="groups" 
                @closePopup="closePopup" @saveEditedUser="saveEditedUser" 
                @addUser="addUser"/>
</template>


<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import UserPopup from './UserPopup.vue'
import Table from './Table.vue'
import { ref, computed, onMounted } from 'vue'
import { getItemsFromStorage, setItemsToStorage } from '@/api/users.api.js'

const groups = computed(() => ['Прохожий', 'Клиент', 'Партнер'])
const isOpenPopup = ref(false)

const users = ref([])
const filtredUsers = ref(users.value)
const selectedFilter = ref(1)
const editedUser = ref(null)

function addUser(user) {
  users.value.push(user.value)
  setItemsToStorage('users', users.value)
}

function saveEditedUser(user, editedUser) {
  const filteredIndex = filtredUsers.value.findIndex(
    (item) => item.name == user.name && item.company == user.company
  )
  if (filteredIndex !== -1) {
    filtredUsers.value.splice(filteredIndex, 1, editedUser.value)
  }

  const usersIndex = users.value.findIndex(
    (item) => item.name == user.name && item.company == user.company
  )
  if (usersIndex !==  -1) {
    users.value.splice(usersIndex, 1, editedUser.value)
  }

  setItemsToStorage('users', users.value)

  isOpenPopup.value = false
}

function addUserPopup() {
  editedUser.value = null
  isOpenPopup.value = true
}

function closePopup() {
  isOpenPopup.value = false
}

function editUser(index) {
  editedUser.value = filtredUsers.value[index]
  isOpenPopup.value = true
}

function selectFilter(filter, name) {
  selectedFilter.value = filter

  let usersCopy = users.value.slice(0)
  filtredUsers.value = []

  filtredUsers.value = usersCopy.filter((user) => {
    if (name && !user.name.includes(name)) {
      return false
    }

    if (filter == 2 && user.presence) {
      return false
    }
    if (filter == 3 && !user.presence) {
      return false
    }

    return true
  })
}

onMounted(() => {
  let savedUsers = getItemsFromStorage('users')
  if(savedUsers && savedUsers.length) users.value = savedUsers
})
</script>

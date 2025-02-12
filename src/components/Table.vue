<template>
  <div class="table-container">
    <div v-if="!props.users.length" class="empty-table-message">
      Нет данных для отображания в таблице
    </div>
    <table v-else>
      <thead>
        <tr>
          <th style="width: 10vw;"> Номер </th>
          <th style="width: 30vw;"> ФИО </th>
          <th style="width: 20vw;"> Компания </th>
          <th style="width: 20vw;"> Группа </th>
          <th style="width: 20vw;"> Присутствие </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in props.users" @click="emit('editUser', index)">
          <td style="width: 10vw;"> {{ index + 1 }} </td>
          <td style="width: 30vw;"> {{ user.name }} </td>
          <td style="width: 20vw;"> {{ user.company }} </td>
          <td style="width: 20vw;"> {{ user.group }} </td>
          <td style="width: 20vw;">
            <GreenCircle v-if="user.presence" class="presence-icon"></GreenCircle>
            <RedCircle v-else class="presence-icon"></RedCircle>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from "vue"
import RedCircle from './icons/RedCircle.vue'
import GreenCircle from './icons/GreenCircle.vue'

const props = defineProps(['users'])
const emit = defineEmits(['editUser']);
</script>


<style scoped>
.table-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
}

.empty-table-message {
  font-size: 18px;
  color: #4E3000;
  text-align: center;
  padding: 20px;
}

table {
  width: 97%;
  border-collapse: collapse;
}

th {
  border-bottom: 3px solid #E9E9E9;
  text-align: left;
  font-size: 16px;
  color: #4E3000;
  font-weight: 600;
}

td {
  padding-top: 30px;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
}

td:last-child {
  text-align: right;
  padding-right: 60px;
}

th:last-child {
  text-align: right;
  padding-right: 30px;
}

.presence-icon {
  height: 40px;
  width: 40px;
}
</style>
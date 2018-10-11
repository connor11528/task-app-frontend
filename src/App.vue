<template>
    <div>
        <h1>Task List</h1>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="task in tasks">
                {{ task.name }}
                <span @click='deleteTask(task._id)' class="badge badge-danger badge-pill">X</span>
            </li>
        </ul>
    </div>
</template>
<style>

</style>
<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    created() {
      axios.get(`/api/task`)
        .then((response) => {
          this.tasks = response.data;
        });
    },
    data() {
      return {
        tasks: []
      }
    },
    methods: {
      deleteTask(taskId) {
        axios.delete(`/api/task/${taskId}`)
          .then((response) => {
            this.tasks = _.remove(this.tasks, (task) => {
              return task._id !== taskId;
            });
          });
      }
    },
    computed: {}
  }
</script>
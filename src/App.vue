<template>
    <div class="row">
        <div class="col-sm-12 offset-sm-1 mt-4">
            <h1>Task List</h1>
            <p>{{taskListCount}} tasks</p>
            <div class="row">
                <div class="col-sm-4 mb-2">
                    <input type="text" class="form-control" placeholder="Add task..." v-model="newTask" @keyup.enter="addTask">
                </div>
            </div>

            <transition-group name="task-list">
                <div class="row mb-2" v-for="(task, index) in tasks" :key="task._id">
                    <div class="col-sm-4">
                        {{ task.name }}
                    </div>
                    <div class="col-sm-2">
                        <span @click='updateTask(task._id, index)' class="task-action"><i class="fas fa-pencil-alt"></i></span>
                        <span @click='deleteTask(task._id, index)' class="task-action badge badge-danger badge-pill">X</span>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<style>
    .task-action { cursor: pointer; }

    .task-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .task-list-enter-active, .task-list-leave-active {
        transition: opacity .5s;
    }
    .task-list-enter, .task-list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
<script>
  import axios from 'axios';

  export default {
    created() {
      axios.get(`/api/task`)
        .then((response) => this.tasks = response.data );
    },
    data() {
      return {
        tasks: [],
        newTask: ''
      }
    },
    methods: {
      addTask(){
        const newTask = {
          name: this.newTask,
          description: ''
        };

        axios.post(`/api/task`, newTask).then((response)=>{
          this.tasks.unshift(response.data.task);
        });
      },
      updateTask(taskId, index) {
        // todo
      },
      deleteTask(taskId, index) {
        axios.delete(`/api/task/${taskId}`)
          .then(() => this.tasks.splice(index, 1) );
      }
    },
    computed: {
      taskListCount(){
        return this.tasks.length;
      }
    }
  }
</script>
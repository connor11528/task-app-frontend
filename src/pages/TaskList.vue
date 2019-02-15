<template>
    <div class="row">
        <div class="col-sm-12 offset-sm-1 mt-4">
            <h1>All Tasks</h1>
            <div class="flex-column w-50 mb-5" v-if="isLoggedIn">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Task name" v-model="newTask.name"
                           @keyup.enter="addTask">
                </div>
                <div class="form-group">
                    <textarea class="form-control" placeholder="Task description" v-model="newTask.description"
                              @keyup.enter="addTask"></textarea>
                </div>
            </div>
            <p>Displaying {{taskListCount}} tasks</p>
            <transition-group name="task-list">
                <div class="list-group" v-for="(task, index) in tasks" :key="task._id">
                    <div class="list-group-item list-group-item-action flex-column align-items-start d-flex w-50">
                        <div class="justify-content-between">
                            <h5 class="mb-1">{{task.name}}</h5>
                            <small @click='removeTask(task._id, index)'
                                  class="text-muted pointer" v-if="isLoggedIn">Delete</small>
                        </div>
                        <p class="mb-1">{{task.description}}</p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<style>
    .pointer {
        cursor: pointer;
    }

    .task-list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .task-list-enter-active, .task-list-leave-active {
        transition: opacity .5s;
    }

    .task-list-enter, .task-list-leave-to {
        opacity: 0;
    }
</style>
<script>
  import _ from 'lodash';
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: 'TaskListPage',
    created() {
      this.$store.dispatch('getTaskList');
    },
    data() {
      return {
        newTask: {
          name: '',
          description: '',
        }
      }
    },
    methods: {
      addTask() {
        this.$store.dispatch('addTask', {
          name: this.newTask.name,
          description: this.newTask.description,
        }).then(() => {
          this.newTask = {
            name: '',
            description: '',
          }
        });
      },
      removeTask(taskId, index) {
        this.$store.dispatch('removeTask', {
          taskId,
          index
        });
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
      ]),
      ...mapState([
        'tasks'
      ]),
      taskListCount() {
        return _.get(this.$store, 'state.tasks.length');
      }
    }
  }
</script>

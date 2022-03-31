<script>
  import { flip } from 'svelte/animate'
  import Todo from './Todo.svelte'
  import AddTodo from './AddTodo.svelte'
  import MembersPanel from './MembersPanel.svelte'
  import { Todos, loggedIn, memberId } from '../stores/Writable'

  let logged

  loggedIn.subscribe((bool) => (logged = bool))

  let memberSelected

  memberId.subscribe((data) => {
    memberSelected = data
  })

  let todos = []

  Todos.subscribe((data) => {
    todos = data
  })

  memberId.subscribe((id) => {
    if (id) {
      fetch('http://localhost:3000/family/member/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Failed to fetch member.')
          }
          return res.json()
        })
        .then((resData) => {
          Todos.set([])
          return resData.member.tasks
        })
        .then((tasksIds) => {
          tasksIds.forEach((id) => {
            fetch('http://localhost:3000/todoList/todo/' + id, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
              .then((res) => {
                if (res.status !== 200) {
                  throw new Error('Failed to fetch todos.')
                }
                return res.json()
              })
              .then((resData) => {
                Todos.update((todos) => [
                  ...todos,
                  {
                    task: resData.todo.task,
                    id: resData.todo._id,
                    completed: resData.todo.completed,
                  },
                ])
              })
              .catch((err) => console.log(err))
          })
        })
        .catch((err) => console.log(err))
    }
  })
</script>

<main class="flex flex-col">
  {#if logged == true}
    <MembersPanel />

    {#if memberSelected == undefined}
      <p class="mt-4">Select a Family Member</p>
    {:else if todos.length > 0 && todos[0] !== undefined}
      <AddTodo />
      {#each todos as todo (todo.id)}
        <Todo {todo} />
        <!-- transition:fly={{ x: 50, duration: 100 }} -->
      {/each}
    {:else}
      <AddTodo />
      <p class="mt-16">There are currently no tasks to show</p>
    {/if}
  {:else}
    <p class="mt-16">You need to be logged in</p>
  {/if}
</main>

<style>
</style>

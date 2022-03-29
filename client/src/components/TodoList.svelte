<script>
  import { flip } from 'svelte/animate'
  import Todo from './Todo.svelte'
  import AddTodo from './AddTodo.svelte'
  import MembersPanel from './MembersPanel.svelte'
  import { Todos, loggedIn, memberId } from '../stores/Writable'

  let logged

  loggedIn.subscribe((bool) => (logged = bool))

  let todos = []

  Todos.subscribe((data) => {
    todos = data
    console.log(todos);
  })

  memberId.subscribe((id) => {
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
              Todos.update((todos) => [...todos, {task: resData.todo.task, id: resData.todo._id}])
            })
            .catch((err) => console.log(err))
        })
      })
      .catch((err) => console.log(err))
  })
</script>

<main class="flex flex-col">
  {#if logged == true}
    <MembersPanel />
    <AddTodo />

    {#if todos.length > 0}
      {#each todos as todo (todo.id)}
        <Todo {todo} />
        <!-- transition:fly={{ x: 50, duration: 100 }} -->
      {/each}
    {:else}
      <p>There are currently no task to show</p>
    {/if}
  {:else}
    <p>You need to be logged in</p>
  {/if}
</main>

<style>
</style>

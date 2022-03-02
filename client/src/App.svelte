<!------------------------------ JS ------------------------------>
<script>
  import { onMount } from 'svelte'
  // export let name;

  let todos = []
  let json = {}
  $: message = ''

  onMount(() => {
    message = 'Processing'
    fetch('http://localhost:3000/todoList/todos')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch todos.')
        }
        return res.json()
      })
      .then((resData) => {
        todos = resData.todos
        console.log(todos)
      })
    message = ''
  })

  let deleteTodo = (id) => {
    message = 'Processing'
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status == 200) {
        message = ''
        todos = todos.filter((t) => t._id !== id)
      }
    })
  }

  let createTodo = (e) => {
    e.preventDefault()
    message = 'Processing'
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    fetch('http://localhost:3000/todoList/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    }).then((res) => {
      if (res.status == 201) {
        message = 'Processing'
        fetch('http://localhost:3000/todoList/todos')
          .then((res) => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch todos.')
            }
            return res.json()
          })
          .then((resData) => {
            todos = resData.todos
            console.log(todos)
          })
        message = ''
      }
    })
  }
</script>

<!----------------------------- HTML ----------------------------->
<main>
  <h1>Family Todos</h1>
  <!-- <div class="popup"><h2 class="popup__message">{message}</h2></div> -->
  <!-- make it a modal-->

  <form on:submit={createTodo}>
    <label for="task">Add Todo</label>
    <input id="task" name="task" type="text" />
    <button>Submit</button>
  </form>

  {#if todos.length > 0}
    {#each todos as todo (todo._id)}
      <label>
        <input type="checkbox" />
        {todo.task}
        <button on:click={() => deleteTodo(todo._id)}>x</button>
      </label>
    {/each}
  {:else}
    <p>There are currently no task to show</p>
  {/if}
</main>

<!------------------------------ CSS ----------------------------->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  /* .popup {
    position: absolute;
    background-color: black;
    width: 100vw;
    height: 100vh;
  } */

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

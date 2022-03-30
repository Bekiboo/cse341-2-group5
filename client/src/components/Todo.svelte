<script>
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { Todos } from '../stores/Writable'

  export let todo

  let todos
  Todos.subscribe((data) => {
    todos = data
  })

  let deleteTodo = (id) => {
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.status == 200) {
          console.log(todos);
          Todos.update((list) => list.filter((t) => t.id !== id))
        }
      })
      .catch((err) => console.log(err))
  }

  let completeTodo = (id, status) => {
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        completed: !status,
      }),
    }).then((res) => {
      if (res.status == 200) {
        console.log('awesome');
      }
    })
  }
</script>

<label transition:fly={{ x: 50, duration: 100 }} class="flex justify-between">
  <input
    type="checkbox"
    class="checkbox"
    checked={todo.completed}
    on:change={() => completeTodo(todo.id, todo.completed)}
  />
  {todo.task}
  <button on:click={() => deleteTodo(todo.id)}
    ><img src="trash.png" alt="trash icon" /></button
  >
</label>

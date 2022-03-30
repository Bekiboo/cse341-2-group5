<script>
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { Todos } from '../stores/Writable'

  export let todo
let completed = false
let status = 'Incomplete'

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
          Todos.update((list) => list.filter((t) => t._id !== id))
        }
      })
      .catch((err) => console.log(err))
  }

  let completeTodo = (id) => {
   
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'put',
    }).then((res) => {
      completed = !completed
      if(completed === true){
        status = 'Completed'
      }
      else{status = 'Incomplete'}
      if (res.status == 200) {
      }
    })
  }
</script>

<label transition:fly={{ x: 50, duration: 100 }} class="flex justify-between">
  <input
    type="checkbox"
    class="checkbox"
    completed={completed}
    on:change={() => completeTodo(todo.id)}
  />
  Chore: {todo.task}
  <br>
  Status: {status}
  <button on:click={() => deleteTodo(todo.id)}
    ><img src="trash.png" alt="trash icon" /></button
  >
</label>

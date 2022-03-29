<script>
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { Todos } from '../stores/Writable'

  export let todo

  let checked = ''


  let deleteTodo = (id) => {
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status == 200) {
          Todos.update((list) => list.filter((t) => t._id !== id))
        }
      })
      .catch((err) => console.log(err))
  }

  let completeTodo = (id) => {
    console.log('Task completed')
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'UPDATE',
    }).then((res) => {
      if (res.status == 200) {

      }
      if(todo.completed == true){
        checked = 'checked'
      }
    })
  }
</script>

<label transition:fly={{ x: 50, duration: 100 }} class="flex justify-between">
  <input
    type="checkbox"
    class="checkbox"
    completed="{todo.completed}"
   {checked}
    on:change={() => completeTodo(todo._id)}
  />
  {todo.task}
  <button on:click={() => deleteTodo(todo._id)}
    ><img src="trash.png" alt="trash icon" /></button
  >
</label>

<script>
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { Todos } from '../stores/Writable'

  export let todo
let completed = todo.completed
let status = ''
let checked = 'hi'
if(completed === true){
        checked = 'checked'
        status = 'Completed'
      }
      else{
        checked = ""
      }
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
    
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'PUT',
    }).then((res) => {
      completed = !completed
      if(completed === false){
        checked = ''
        status = 'Incompleted'
      }
      else{
        status = 'Completed'
        
      }

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
    {checked}
    on:change={() => completeTodo(todo._id)}
  />
  {todo.task}
  <br>
  Status: {status}
  <button on:click={() => deleteTodo(todo._id)}
    ><img src="trash.png" alt="trash icon" /></button
  >
</label>

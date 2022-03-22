<script>
  import { Todos } from '../stores/Writable'

  let inputField
  let newFieldValue = ''

  let json = {}

  let createTodo = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    console.log(json)
    fetch('http://localhost:3000/todoList/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(json),
    }).then((res) => {
      if (res.status == 201) {
        return res
          .json()
          .then((json) => Todos.update((t) => (t = [...t, json.todo])))
          .then((inputField.value = ''))
      }
    })
  }
</script>

<form class="form-control my-4" on:submit={createTodo}>
  <div class="input-group">
    <input
      class="input input-bordered"
      id="task"
      name="task"
      type="text"
      placeholder="Add Todo"
      bind:this={inputField}
      bind:value={newFieldValue}
    />
    <button class="btn btn-square px-8">Submit</button>
  </div>
</form>

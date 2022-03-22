<script>
  let json = {}

  let name

  let open

  let signup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    //console.log(json)
    fetch('http://localhost:3000/family/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (res.status == 201) {
          console.log('New Member Added')
          open = false
        }
      })
      .catch((err) => console.log(err))
  }
</script>


<input type="checkbox" id="addMember-modal" class="modal-toggle" bind:checked={open} />
<div class="modal">
  <div class="modal-box">
    <label for="addMember-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <form on:submit={signup} class="flex flex-col items-center">
      <input
      class="input input-bordered w-full max-w-xs mb-2"
        id="name"
        name="name"
        type="name"
        placeholder="Name"
        bind:value={name}
      />
      <button class="btn">Add New Member</button>
    </form>
  </div>
</div>


<style>
</style>

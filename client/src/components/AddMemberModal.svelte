<script>
  import { familyMembersIds } from '../stores/Writable'

  let json = {}
  let name
  let open

  let addMember = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    fetch('http://localhost:3000/family/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(json),
      userId: localStorage.getItem('userId'),
    })
      .then((res) => {
        if (res.status == 201) {
          console.log('New Member Added')
          open = false
          return res.json()
        }
      })
      .then((resData) => {
        const memberId = resData.memberId
        console.log(memberId);
        familyMembersIds.update(Ids => [...Ids, memberId])
      })
      .catch((err) => console.log(err))
  }
</script>

<input
  type="checkbox"
  id="addMember-modal"
  class="modal-toggle"
  bind:checked={open}
/>
<div class="modal">
  <div class="modal-box">
    <label
      for="addMember-modal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <form on:submit={addMember} class="flex flex-col items-center">
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

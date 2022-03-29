<script>
  import { familyMembersIds, memberId } from '../stores/Writable'

  let open

  let memberToDelete

  memberId.subscribe(id => {
		memberToDelete = id;
	});

  let deleteMember = () => {
    fetch('http://localhost:3000/family/member/' + memberToDelete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      userId: localStorage.getItem('userId'),
    })
      .then((res) => {
        if (res.status == 200) {
          console.log('Member Deleted')
          open = false
          return res.json()
        }
      })
      .then((resData) => {
        const memberId = resData.memberId
        console.log(memberId)
        familyMembersIds.update((Ids) => [...Ids, memberId])
      })
      .catch((err) => console.log(err))
  }
</script>

<input
  type="checkbox"
  id="deleteMember-modal"
  class="modal-toggle"
  bind:checked={open}
/>
<div class="modal">
  <div class="modal-box">
    <label
      for="deleteMember-modal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <div class="flex flex-col items-center">
      <p class="mb-2 font-bold text-2xl">Are you sure?</p>
      <button class="btn btn-error text-white" on:click={deleteMember}
        >Delete</button
      >
    </div>
  </div>
</div>

<style>
</style>

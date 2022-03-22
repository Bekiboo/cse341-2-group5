<script>
  import { onMount } from 'svelte'
  let members = []

  onMount(() => {
    fetch('http://localhost:3000/family/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch members.')
        }
        return res.json()
      })
      .then((resData) => {
        members = resData.members
      })
      .catch((err) => console.log(err))
  })
</script>

<div class="flex flex-row">
  <div>
    <select name="member" id="member" class="select w-full max-w-xs">
      <option value="default" selected disabled>Member</option>
      {#each members as member}
        <option value="{member}">{member}</option>
      {/each}
    </select>
  </div>
  
  <label for="addMember-modal" class="btn btn-xs mt-2">Add Member</label>
</div>
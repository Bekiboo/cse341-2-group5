<script>
  import { familyMembersIds, memberId } from '../stores/Writable'
  
  let members = []
  let selected


  familyMembersIds.subscribe((ids) => {
    let updatedMemberList = []
    ids.forEach((id) =>
      fetch('http://localhost:3000/family/member/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Failed to fetch member.')
          }
          return res.json()
        })
        .then((resData) => {
          updatedMemberList.push({ name: resData.member.name, memberId: id })
          members = updatedMemberList
        })
        .catch((err) => console.log(err))
    )
  })
</script>

<div class="flex flex-row mt-4">
  <div>
    <select
      bind:value={selected}
      name="member"
      id="member"
      class="select w-full max-w-xs"
      on:change={() => memberId.set(selected)}
    >
      <option value="default" selected disabled>Member</option>
      {#each members as { name, memberId }}
        <option value={memberId}>{name}</option>
      {/each}
    </select>
  </div>

  <div class="flex flex-col justify-center ml-2">
    <label for="addMember-modal" class="btn btn-xs">Add New Member</label>
    {#if selected !== 'default'}
      <label
        for="deleteMember-modal"
        class="btn btn-error text-white btn-xs mt-2">Delete Member</label
      >
    {/if}
  </div>
</div>

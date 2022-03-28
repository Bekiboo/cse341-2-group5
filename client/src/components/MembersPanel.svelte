<script>
  import { familyMembersIds } from '../stores/Writable'
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
          console.log(resData.member.name)
          updatedMemberList.push({ name: resData.member.name, memberId: id })
          members = updatedMemberList
        })
        .catch((err) => console.log(err))
    )
  })
</script>

<div class="flex flex-row">
  <div>
    <select bind:value={selected} name="member" id="member" class="select w-full max-w-xs" on:change={() => console.log('')}>
      <option value="default" selected disabled>Member</option>
      {#each members as member (member.memberId)}
        <option value={member.name}>{member.name}</option>
      {/each}
    </select>
  </div>

  <label for="addMember-modal" class="btn btn-xs mt-2">Add Member</label>
</div>

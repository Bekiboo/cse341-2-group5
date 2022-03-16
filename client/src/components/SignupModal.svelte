<script>
  let json = {}

  let email
  let name
  let password
  let confirmedPw

  let open

  let signup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    console.log(json)
    fetch('http://localhost:3000/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (res.status == 201) {
          console.log('Signup success')
          open = false
        }
      })
      .catch((err) => console.log(err))
  }
</script>


<input type="checkbox" id="signup-modal" class="modal-toggle" bind:checked={open} />
<div class="modal">
  <div class="modal-box">
    <label for="signup-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <form on:submit={signup}>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        bind:value={email}
      />
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        bind:value={name}
      />
      <input
        id="password"
        name="password"
        type="text"
        placeholder="Password"
        bind:value={password}
      />
      <input
        id="confirmedPw"
        name="confirmedPw"
        type="text"
        placeholder="Confirm Password"
        bind:value={confirmedPw}
      />
      <button>Sign Up</button>
    </form>
  </div>
</div>


<style>
</style>

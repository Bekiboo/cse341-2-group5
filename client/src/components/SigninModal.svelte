<script>
  let json = {}

  let email
  let password

  let open

  let login = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    console.log(json)
    // fetch('http://localhost:3000/auth/login', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(json),
    // }).then((res) => {
    //   if (res.status == 201) {
    //     console.log('Login success');
    //   }
    // })
    open = false
  }
</script>

<!-- {#if signinModal} -->

<input type="checkbox" id="login-modal" class="modal-toggle" bind:checked={open} />
<div class="modal">
  <div class="modal-box">
    <label for="login-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <form on:submit={login}>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        bind:value={email}
      />
      <input
        id="password"
        name="password"
        type="text"
        placeholder="Password"
        bind:value={password}
      />
      <button>Login</button>
    </form>
  </div>
</div>

<style>
</style>

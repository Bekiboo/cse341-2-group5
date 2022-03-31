<script>
  let json = {}

  let email
  let name
  let password
  let confirmedPw

  let open

  let signUpError = false
  let missingInfo = false
  let passwordNotMatch = false

  let signup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    fetch('http://localhost:3000/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (!email || !name || !password || !confirmedPw) {
          console.log('Missing fields.')
          open = true
          signUpError = false
          missingInfo = true
          passwordNotMatch = false
        }
        else if (password != confirmedPw) {
          console.log('Passwords do not match.')
          open = true
          signUpError = false
          missingInfo = false
          passwordNotMatch = true
        }
        else if (res.status == 422) {
          console.log('account already exists')
          open = true
          signUpError = true
          missingInfo = false
          passwordNotMatch = false
        }
        else if (res.status == 201) {
          console.log('Signup success')
          signUpError = false
          missingInfo = false
          passwordNotMatch = false
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
    <form on:submit={signup} class="flex flex-col items-center">
      <input
      class="input input-bordered w-full max-w-xs mb-2"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        bind:value={email}
      />
      <input
      class="input input-bordered w-full max-w-xs mb-2"
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        bind:value={name}
      />
      <input
      class="input input-bordered w-full max-w-xs mb-2"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        bind:value={password}
      />
      <input
      class="input input-bordered w-full max-w-xs mb-2"
        id="confirmedPw"
        name="confirmedPw"
        type="password"
        placeholder="Confirm Password"
        bind:value={confirmedPw}
      />

      <!-- error handling -->
      {#if missingInfo}
        <p style="color: red; padding-bottom: 1rem; text-align: center;">Please complete all fields.</p>
        {#if !email}
          <style>
            #email {
              border: red solid 1px;
            }
          </style>
        {/if}
        {#if !name}
          <style>
            #name {
              border: red solid 1px;
            }
          </style>
        {/if}
        {#if !password}
          <style>
            #password {
              border: red solid 1px;
            }
          </style>
        {/if}
        {#if !confirmedPw}
          <style>
            #confirmedPw {
              border: red solid 1px;
            }
          </style>
        {/if}
      {/if}

      {#if passwordNotMatch}
        <p style="color: red; padding-bottom: 1rem; text-align: center;">Your passwords do not match. Please try again.</p>
        <style>
            #password, #confirmedPw {
              border: red solid 1px;
            }
          </style>
      {/if}

      {#if signUpError}
        <p style="color: red; padding-bottom: 1rem; text-align: center;">An account already exists for this email address. Please try to login.</p>
      {/if}
      <!-- end error handling -->

      <button class="btn">Sign Up</button>
    </form>
  </div>
</div>


<style>
</style>

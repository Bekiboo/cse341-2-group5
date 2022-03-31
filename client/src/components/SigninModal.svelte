<script>
  import { loggedIn, familyMembersIds } from '../stores/Writable'
  let json = {}

  let email
  let password

  let open

  let signInError = false
  let missingEmail = false
  let missingPassword = false

  let login = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json, {
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (!email) {
          console.log('Missing email.')
          open = true
          signInError = false
          missingPassword = false
          missingEmail = true
        }
        else if (!password) {
          console.log('Missing password.')
          open = true
          signInError = false
          missingPassword = true
          missingEmail = false
        }
        else if (res.status == 401) {
          console.log('User name or password was incorrect.')
          open = true
          missingPassword = false
          missingEmail = false
          signInError = true
        }
        else if (res.status == 200) {
          console.log('Login success')
          signInError = false
          missingEmail = false
          missingPassword = false
          return res.json()
        }
      })
      .then((resData) => {
        const token = resData.token
        const userId = resData.userId
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        familyMembersIds.set(resData.familyMembers)
        loggedIn.set(true)
      })
      .catch((err) => console.log(err))
    open = false
  }
</script>

<input
  type="checkbox"
  id="login-modal"
  class="modal-toggle"
  bind:checked={open}
/>
<div class="modal">
  <div class="modal-box">
    <label
      for="login-modal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <form on:submit={login} class="flex flex-col items-center">
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
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        bind:value={password}
      />

      <!-- error handling -->
      {#if missingEmail}
        <style>
          #email {
            border: red solid 1px;
          }
        </style>
        <p style="color: red; padding-bottom: 1rem; text-align: center;">Please enter an email address.</p>
      {/if}
      {#if missingPassword}
        <style>
          #password {
            border: red solid 1px;
          }
        </style>
        <p style="color: red; padding-bottom: 1rem; text-align: center;">Please enter a password.</p>
      {/if}
      {#if signInError}
        <p style="color: red; padding-bottom: 1rem; text-align: center;">The user name or password was incorrect. Please try again.</p>
      {/if}
      <!-- end error handling -->
    
      <button class="btn">Login</button>
    </form>
  </div>
</div>

<style>
</style>

<script>
  import { fade } from 'svelte/transition'
  export let signinModal

  let json = {}

  let email
  let password
  
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
  }
</script>

{#if signinModal}
  <div class="backdrop" on:click|self transition:fade={{ duration: 100 }}>
    <div class="modal">
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
{/if}

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
  }
  .modal {
    padding: 2rem;
    border-radius: 1rem;
    max-width: 16rem;
    margin: 20% auto;
    text-align: center;
    background: #f7f7f7;
  }
</style>

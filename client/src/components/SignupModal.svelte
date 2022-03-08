<script>
  import { fade } from 'svelte/transition'
  export let signupModal

  let json = {}

  let email
  let name
  let password
  let confirmedPw

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
    }).then((res) => {
      if (res.status == 201) {
        console.log('Signup success');
      }
    })
    .catch(err => console.log(err))
  }
</script>

{#if signupModal}
  <div class="backdrop" on:click|self transition:fade={{ duration: 100 }}>
    <div class="modal">
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

<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    function showSignupModal() {
        dispatch('signupModal')
    }
    function showSigninModal() {
        dispatch('signinModal')
    }
</script>

<header>
  <div class="auth">
      <p on:click|self={showSignupModal}>Sign Up</p>
      <p on:click|self={showSigninModal}>Login</p>
  </div>

  <div class="form">
      <label for="member">Family Member:</label>
      <select name="member" id="member">
        <option value="default" selected disabled>Member</option>
        <option value="joseph">Joseph</option>
        <option value="jacob">Jacob</option>
        <option value="nephi">Nephi</option>
        <option value="sam">Sam</option>
        <option value="lemuel">Lemuel</option>
        <option value="laman">Laman</option>
      </select>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  p {
      cursor: pointer;
      font-size: 1.2rem;
  }
  .auth {
      display: flex;
  }
  .auth > p {
    margin-right: 1.5rem;
  }
</style>

<!-- App.svelte -->
<script>
  import TodoList from './components/TodoList.svelte'
  import Header from './components/Header.svelte'
  import SignupModal from './components/SignupModal.svelte'
  import SigninModal from './components/SigninModal.svelte'

  let signupModal = false
  const toggleSignupModal = () => {
    signupModal = !signupModal
  }
  let signinModal = false
  const toggleSigninModal = () => {
    signinModal = !signinModal
  }
</script>

<SignupModal {signupModal} on:click={toggleSignupModal} />
<SigninModal {signinModal} on:click={toggleSigninModal} />

<div class="app-container">
  <Header
    on:signupModal={toggleSignupModal}
    on:signinModal={toggleSigninModal}
  />
  <TodoList />
</div>

<style>
  .app-container {
    margin: auto;
    min-height: 80vh;
    max-width: 32rem;
    background-color: #ff6666;
    color: #f7f7f7;
    box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);
    transform: translateY(4rem);
    z-index: 10;
  }
</style>

<script>
  import {
    loggedIn,
    Todos,
    familyMembersIds,
    memberTodosIds,
    memberId,
  } from '../stores/Writable'

  let logged

  loggedIn.subscribe((bool) => (logged = bool))

  function logout() {
    loggedIn.set(false)
    Todos.set([{}])
    familyMembersIds.set([])
    memberTodosIds.set([])
    memberId.set()
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
</script>

<header class="w-full navbar bg-base-300 flex justify-between">
  <img
    src="https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    alt="logo"
    class="mask mask-parallelogram-3 bg-emerald-300 h-16 ml-4"
  />
  <div class="flex-none">
    <ul class="menu menu-horizontal">
      <li><label for="signup-modal">Sign Up</label></li>
      {#if logged == true}
        <li on:click={logout}><label for="">Logout</label></li>
      {:else}
        <li><label for="login-modal">Login</label></li>
      {/if}
    </ul>
  </div>
</header>

<style>
</style>

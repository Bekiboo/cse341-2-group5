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
  <div
    class="mask mask-parallelogram-3 bg-cyan-300 h-16 ml-4 p-12 text-zinc-700 font-black"
  >Family <br> Todos</div>
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

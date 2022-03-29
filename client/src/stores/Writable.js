import { writable } from 'svelte/store'

export const Todos = writable([{}])
export let loggedIn = writable(false)
export const familyMembersIds = writable([])
export const memberTodosIds = writable([])
export let memberId = writable()
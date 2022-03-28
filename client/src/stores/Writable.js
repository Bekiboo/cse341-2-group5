import { writable } from 'svelte/store'

export const Todos = writable([{}])
export let loggedIn = writable(false)
export const familyMembersIds = writable([])
import { writable } from 'svelte/store'

export const Todos = writable([{}])
export let loggedIn = writable(false)
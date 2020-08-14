// import { debounce } from "lodash";

const storageId = 'oms/state'

function loadSate() {
  return window.sessionStorage.getItem(storageId)
}

function saveSate(mutation, state) {
  window.sessionStorage.setItem(storageId, JSON.stringify(state))
}

export default function sessionStoragePlugin(store) {
  let sessionState = loadSate()
  if (sessionState) {
    sessionState = JSON.parse(sessionState)
    store.replaceState(sessionState)
  }
  store.subscribe(saveSate)
}

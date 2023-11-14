export const showToast = (message) => {
  const event = new CustomEvent('showToast', { detail: { message } })

  document.dispatchEvent(event)
}
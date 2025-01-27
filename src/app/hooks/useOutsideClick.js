import { useEffect } from "react"

export default function useOutsideClick(onOutsideClick) {
  useEffect(() => {
    document.addEventListener('click', onOutsideClick)

    return () => {
      document.removeEventListener('click', onOutsideClick)
    }
  }, [onOutsideClick])
}
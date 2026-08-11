import { useEffect } from 'react'

export function useSprigInit() {
  useEffect(() => {
    (function (l: Document, e: string, a: string) {
      if (window.Sprig) return
      window.Sprig = function (...args: unknown[]) {
        S._queue.push(args)
      }
      const S: any = window.Sprig
      S.appId = a
      S._queue = []
      window.UserLeap = S
      const script = l.createElement('script')
      script.async = true
      script.src = `${e}?id=${a}`
      const firstScript = l.getElementsByTagName('script')[0]
      firstScript.parentNode?.insertBefore(script, firstScript)
    })(document, 'https://cdn.sprig.com/shim.js', import.meta.env.VITE_SPRIG_ENVIRONMENT_ID)
  }, [])
}

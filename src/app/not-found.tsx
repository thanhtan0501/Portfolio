'use client'
import '../styles/404.css'
import React, { useEffect } from 'react'

const EXEMPT_JIGGLES = [0, 1, 4, 6, 7]
const NotFound = () => {
  const getRandom = () => Math.floor(Math.random() * 200) - 100

  useEffect(() => {
    const load = () => {
      const LABEL = document.querySelector('[data-jiggle-label]') as HTMLElement
      const JIGGLERS = document.querySelector('[data-jigglers]') as HTMLElement
      const JIGGLE = document.querySelectorAll('[data-jiggle-404]')
      LABEL.innerHTML = `"${window.location.pathname}" not found`

      for (const i in JIGGLE) {
        const text = document.getElementById(`jiggle-404--${i}`)
        text?.style?.setProperty('--mx', String(getRandom()))
        text?.style?.setProperty('--my', String(getRandom()))
      }
      let jiggles = ''
      for (const letter of window.location.pathname.split('')) {
        jiggles += `<span aria-hidden="true" class=" text-surface-3 font-outline-2 font-bold" data-jiggle="true">${letter}</span>`
      }
      const temp = LABEL.parentNode as HTMLElement
      JIGGLERS.innerHTML = `${jiggles}<br>${temp.innerHTML}`
    }

    const update = ({ x, y }) => {
      document.documentElement.style.setProperty('--px', String((x / window.innerWidth - 0.5) * 2))
      document.documentElement.style.setProperty('--py', String((y / window.innerHeight - 0.5) * 2))
    }

    if (document.readyState === 'complete') {
      load()
    } else {
      window.addEventListener('load', load)
    }

    window.addEventListener('pointermove', update)

    return () => {
      window.removeEventListener('load', load)
      window.removeEventListener('pointermove', update)
    }
  }, [])

  return (
    <>
      <main className="w-main-content flex justify-center items-center grow max-w-full mv-0 mx-auto px-4 touch-auto">
        <div className="grid place-items-center leading-tight">
          <h1 aria-hidden="true" className="font-mono font-bold text-fluid-9">
            {'404'.split('').map((l, i) => {
              return (
                <span id={`jiggle-404--${i}`} key={i} data-jiggle-404>
                  {l}
                </span>
              )
            })}
          </h1>
          <p className="font-mono font-bold text-center text-fluid-4 mt-4">
            <span data-jigglers="true" aria-hidden="true">
              {'not found'.split('').map((l, i) =>
                l !== ' ' && EXEMPT_JIGGLES.indexOf(i) === -1 ? (
                  <span key={i} data-jiggle>
                    {l}
                  </span>
                ) : (
                  <span key={i}>{l}</span>
                ),
              )}
            </span>
            <span data-jiggle-label="true" className="sr-only">
              Not found
            </span>
          </p>
        </div>
      </main>
    </>
  )
}

export default NotFound

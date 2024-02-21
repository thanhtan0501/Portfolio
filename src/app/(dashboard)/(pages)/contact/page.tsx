'use client'
import { useEffect, useRef, useState } from 'react'
import { AstroBearIcon, MoonIcon } from '../../../../assets/icon'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import '../../../../styles/starts.css'

const Contact = () => {
  const formRef = useRef()
  const astroRef = useRef(null)
  const moonRef = useRef(null)

  const [starts, setStarts] = useState([])

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isError, setIsError] = useState({
    name: false,
    email: false,
    message: false,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStarts(
        prev =>
          (prev = new Array(30).fill(undefined).map(() => ({
            id: crypto.randomUUID(),
            x: gsap.utils.random(0, window.innerWidth),
            size: gsap.utils.random(1, 10, 1),
            speed: gsap.utils.random(5, 30, 0.1),
            delay: gsap.utils.random(-30, 0, 0.1),
            opacity: gsap.utils.random(0.1, 1),
          }))),
      )
    }
  }, [])

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { target } = e
    const { name, value } = target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const checkValidateInput = () => {
    let isValid = true
    for (let i in form) {
      if (!form[i] && isError.hasOwnProperty(i)) {
        setIsError(prev => ({ ...prev, [i]: true }))
        isValid = false
      }
    }
    return isValid
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const checkValid = checkValidateInput()
    if (checkValid) {
      setLoading(true)
      emailjs
        .send(
          'service_hi0h7ja',
          'template_u4lsacc',
          {
            from_name: form.name,
            from_email: form.email,
            to_name: 'Tan Thanh',
            message: form.message,
          },
          'oncPSwvmsGUNmOIC9',
        )
        .then(
          () => {
            setLoading(false)
            setForm({
              name: '',
              email: '',
              message: '',
            })
            alert('Thank you. I will get back to you as soon as possible.')
          },
          error => {
            setLoading(false)
            console.error(error)
            alert('Ahh, something went wrong. Please try again.')
          },
        )
    }
  }

  return (
    <div className="mt-6 min-h-screen flex items-center justify-end flex-col-reverse lg:flex-row lg:justify-between pt-20 gap-8 lg:pt-40">
      <div className="w-content max-w-[80%] lg:max-w-[55%] mv-0 mx-auto grid gap-2 py-4 px-6 bg-surface-2 rounded-lg shadow-lg">
        <form
          className="my-4 flex flex-col gap-y-4 justify-center text-center"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col items-start w-full">
            <span className="text-white font-bold mb-3 text-fluid-0">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className={`bg-surface-3 hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-2 transition-all py-4 px-6 !text-white placeholder:text-text-4 rounded-lg font-medium w-full ${
                isError.name && 'border-red-600 hover:border-red-600 placeholder:text-red-300'
              }`}
              onFocus={e => {
                const { name } = e.target
                if (isError[name]) {
                  setIsError({ ...isError, [name]: false })
                }
              }}
            />
          </label>
          <label className="flex flex-col items-start w-full">
            <span className="text-white font-medium mb-3 text-fluid-0">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className={`!bg-surface-3 hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-2 transition-all py-4 px-6 !text-white placeholder:text-text-4 rounded-lg font-medium w-full ${
                isError.email && 'border-red-600 hover:border-red-600 placeholder:text-red-300'
              }`}
              onFocus={e => {
                const { name } = e.target
                if (isError[name]) {
                  setIsError({ ...isError, [name]: false })
                }
              }}
            />
          </label>
          <label className="flex flex-col items-start w-full">
            <span className="text-white font-medium mb-3 text-fluid-0">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message..."
              className={`!bg-surface-3 hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-2 transition-all py-4 px-6 !text-white rounded-lg font-medium w-full resize-none placeholder:text-text-4 ${
                isError.message && 'border-red-600 hover:border-red-600 placeholder:text-red-300'
              }`}
              onFocus={e => {
                const { name } = e.target
                if (isError[name]) {
                  setIsError({ ...isError, [name]: false })
                }
              }}
            />
          </label>
          <button
            type="submit"
            className="hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-2 text-fluid--1 transition-all text-white bg-surface-3 px-8 py-3 w-fit font-bold shadow-md  rounded-xl "
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      <div className="stars">
        {starts.map(start => {
          return (
            <div
              className="star"
              key={start.id}
              style={{
                width: `calc(${start.size} * 1px)`,
                left: `calc(${start.x} * 1px)`,
                opacity: `calc(${start.opacity || 1} * 1px)`,
                animation: `float calc(${start.speed || 0} * 1s) calc(${
                  start.delay || 0
                } * 1s) linear reverse infinite`,
              }}
            ></div>
          )
        })}
      </div>
      <MoonIcon innerRef={moonRef} />
      <AstroBearIcon innerRef={astroRef} />
    </div>
  )
}

export default Contact

'use client'
import { useEffect, useRef, useState } from 'react'
import { AstroBearIcon, MoonIcon } from '../../../../assets/icon'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import '../../../../styles/stars.css'

const Contact = () => {
  const formRef = useRef()
  const astroRef = useRef(null)
  const moonRef = useRef(null)

  const [stars, setStars] = useState([])

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
      setStars(
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

    console.log(isError)

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
    <div className="mt-6 min-h-screen flex items-center justify-end flex-col-reverse lg:flex-row lg:justify-between pt-10 gap-8 lg:pt-40">
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
                isError.name && '!border-red-600 hover:!border-red-600 placeholder:!text-red-300'
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
                isError.email && '!border-red-600 hover:!border-red-600 placeholder:!text-red-300'
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
                isError.message && '!border-red-600 hover:!border-red-600 placeholder:!text-red-300'
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
        <div
          style={{
            top: `${gsap.utils.random(0, 100)}%`,
            animation: `horizontal calc(5 * 1s) calc(5 * 1s) linear reverse infinite`,
          }}
          className="astrobear"
        >
          <AstroBearIcon innerRef={astroRef} />
        </div>
        {stars.map(star => {
          return (
            <div
              className="star"
              key={star.id}
              style={{
                width: `calc(${star.size} * 1px)`,
                left: `calc(${star.x} * 1px)`,
                opacity: `calc(${star.opacity || 1} * 1px)`,
                animation: `float calc(${star.speed || 0} * 1s) calc(${
                  star.delay || 0
                } * 1s) linear reverse infinite`,
              }}
            ></div>
          )
        })}
      </div>
      <MoonIcon innerRef={moonRef} />
    </div>
  )
}

export default Contact

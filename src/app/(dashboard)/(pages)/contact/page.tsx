import React from 'react'

const Contact = () => {
  return (
    <div className="mt-8">
      <div className="w-content max-w-full mv-0 mx-auto grid gap-2 px-4">
        <form
          className="my-6 grid gap-y-2 justify-center text-center"
          // action="https://app.convertkit.com/forms/4960615/subscriptions"
          method="post"
        >
          <p>Keep up to date with my latest projects and adventures!</p>
          <div className="flex">
            <input
              className="p-2 px-4 flex-grow rounded-l-full"
              name="email_address"
              aria-label="Email Address"
              placeholder="Email Address"
              required
              type="email"
            />
            <button className="font-bold hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-4 rounded-r-full text-fluid--1 flex gap-x-1 items-center text-white bg-brand-fill px-3 py-1">
              Subscribe!
            </button>
          </div>
          <p className="text-fluid--2 text-center text-text-4">No spam. Unsubscribe any time.</p>
        </form>
      </div>
    </div>
  )
}

export default Contact

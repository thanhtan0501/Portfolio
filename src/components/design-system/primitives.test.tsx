import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Button } from './button/button'
import { Dialog } from './dialog/dialog'
import { IconButton } from './icon-button/icon-button'

describe('design-system primitives', () => {
  it('keeps disabled buttons native and non-interactive', () => {
    render(<Button disabled>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveProperty('disabled', true)
  })

  it('requires an accessible name for icon-only actions', () => {
    render(<IconButton label="Open media">+</IconButton>)

    expect(screen.getByRole('button', { name: 'Open media' })).toBeTruthy()
  })

  it('closes with cancel and restores focus to the trigger', () => {
    function DialogFixture() {
      const [open, setOpen] = useState(false)

      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Dialog open={open} onOpenChange={setOpen} title="Media preview">
            Preview
          </Dialog>
        </>
      )
    }

    render(<DialogFixture />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    trigger.focus()
    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveProperty('open', true)
    fireEvent(dialog, new Event('cancel', { bubbles: true, cancelable: true }))

    expect(dialog).toHaveProperty('open', false)
    expect(document.activeElement).toBe(trigger)
  })
})

'use client'

import { useState } from 'react'
import { Button } from '../button/button'
import { Dialog } from './dialog'

export function DialogShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Native dialog"
        description="Escape closes this surface and returns focus to its trigger."
      >
        <p className="type-body text-portfolio-text-secondary">
          The media-compatible dialog foundation uses the platform dialog element and no UI kit.
        </p>
      </Dialog>
    </>
  )
}

'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Button } from '../button/button'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      if (typeof dialog.showModal === 'function') {
        try {
          dialog.showModal()
        } catch {
          dialog.setAttribute('open', '')
        }
      } else {
        dialog.setAttribute('open', '')
      }

      queueMicrotask(() => {
        dialog.querySelector<HTMLElement>('[data-dialog-autofocus]')?.focus()
      })
    }

    if (!open && dialog.open) {
      if (typeof dialog.close === 'function') {
        try {
          dialog.close()
        } catch {
          dialog.removeAttribute('open')
        }
      } else {
        dialog.removeAttribute('open')
      }
      returnFocusRef.current?.focus()
    }
  }, [open])

  const close = () => onOpenChange(false)

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className="ds-dialog motion-interactive"
      onCancel={event => {
        event.preventDefault()
        close()
      }}
      onClick={event => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="grid gap-4 overflow-auto p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="type-heading">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="type-small mt-2 text-portfolio-text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            data-dialog-autofocus
            variant="ghost"
            aria-label="Close dialog"
            onClick={close}
            className="min-h-8 px-2"
          >
            ×
          </Button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

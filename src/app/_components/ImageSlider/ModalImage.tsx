import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
interface ModalImageProps {
  alt: string
  className?: string
  src: string
  width?: number
  height?: number
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  boxShadow: 24,
  border: 'none',
  outline: 'none',
}

const ModalImage = ({ alt, className, src, width = 1280, height = 1280 }: ModalImageProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Image
        alt={alt}
        className={`rounded-lg object-cover flex-1 overflow-hidden w-full max-h-full h-full object-center cursor-pointer ${className}`}
        loader={() => src}
        src={src}
        width={width}
        height={height}
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Image
              alt="Image feed"
              className={`rounded-lg object-cover flex-1 overflow-hidden w-full max-h-full h-full object-center`}
              loader={() => src}
              src={src}
              width={width}
              height={height}
              onClick={handleOpen}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ModalImage

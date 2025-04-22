import React, { ReactNode } from 'react'

type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: ReactNode
}

export function Button(props: ButtonProps) {
  const {
    onClick,
    type = 'button',
    className = 'button-primary',
    children,
  } = props

  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  )
}

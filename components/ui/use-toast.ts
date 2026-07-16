"use client"

import * as React from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastInput = Omit<ToastProps, "id">

type ToastContextType = {
  toasts: ToastProps[]
  toast: (input: ToastInput) => void
  dismiss: (id: string) => void
}

export const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback((input: ToastInput) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...input, id }])
    setTimeout(() => dismiss(id), 4000)
  }, [dismiss])

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, toast, dismiss } },
    children
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return { toast: ctx.toast }
}

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

const ToastContext = React.createContext<ToastContextType | null>(null)

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

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return { toast: ctx.toast }
}

export function Toaster() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {ctx.toasts.map((t) => (
        <div
          key={t.id}
          className={`border-4 border-black rounded-none p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
            t.variant === "destructive"
              ? "bg-red-50 text-red-900"
              : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="font-black uppercase text-sm tracking-widest">{t.title}</p>
              {t.description && (
                <p className="text-sm mt-1 font-medium">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => ctx.dismiss(t.id)}
              className="text-lg font-black leading-none hover:opacity-70 flex-shrink-0"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

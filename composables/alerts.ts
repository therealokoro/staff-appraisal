export type AlertStyle = "danger" | "success" | "warning" | "info"

export interface AlertOptions {
  timeout?: number | false
  title?: string | boolean
  closable?: boolean
}
export interface Alert extends AlertOptions {
  id: string
  message: string
  style: AlertStyle
}

import { nanoid } from "nanoid"

export const defaultOptions: AlertOptions = {
  timeout: 5000,
  title: "Info",
  closable: true
}

const notify = (message: string, style: AlertStyle, options?: AlertOptions) => {
  const alerts = useState<Alert[]>("alerts", () => [])

  options = { ...defaultOptions, ...options }

  const id = nanoid()

  alerts.value.unshift({
    id,
    message,
    ...options,
    style,
    title: options.title != false ? options.title || "Info" : false
  })

  if (options.timeout !== false) {
    setTimeout(() => {
      Alerts.remove(id)
    }, options.timeout)
  }
}

export const Alerts = {
  success: (message: string, options?: AlertOptions) => {
    notify(message, "success", {
      ...options,
      title: options?.title != false ? options?.title || "Success" : false
    })
  },

  error: (message: string, options?: AlertOptions) => {
    notify(message, "danger", {
      ...options,
      title: options?.title || "Error"
    })
  },

  warn: (message: string, options?: AlertOptions) => {
    notify(message, "warning", {
      ...options,
      title: options?.title != false ? options?.title || "Warning" : false
    })
  },

  info: (message: string, options?: AlertOptions) => {
    notify(message, "info", {
      ...options,
      title: options?.title != false ? options?.title || "Info" : false
    })
  },

  remove: (id: string) => {
    const alerts = useState<Alert[]>("alerts")
    const index = alerts.value.findIndex((item) => item.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }
}

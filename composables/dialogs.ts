import { nanoid } from "nanoid"
import type { Ref } from "vue"

type CallbackFunc = () => void

interface DialogOptions {
  confirmText?: string
  cancelText?: string

  style?: "success" | "danger" | "warning" | "primary"

  title?: string
  html?: boolean
  onCancel?: CallbackFunc
  onConfirm?: CallbackFunc
}

export interface Dialog extends DialogOptions {
  id: string
  message: string
  isShowing: Ref<boolean>
  cancel: CallbackFunc
  confirm: CallbackFunc
  onCancel: CallbackFunc
  onConfirm: CallbackFunc
}

export const useDialogs = createSharedComposable(() => {
  const dialog = ref<Dialog | null>(null)

  const showDialog = (
    message: string,
    options?: DialogOptions | CallbackFunc
  ) => {
    const { isRevealed, reveal, cancel, confirm, onCancel, onConfirm } =
      useConfirmDialog()

    const isShowing = ref(false)

    dialog.value = {
      id: nanoid(),
      message,
      isShowing: isShowing as unknown as boolean,
      cancel,
      confirm,

      // apply default options
      title: "Confirm Action",
      confirmText: "Yes",
      cancelText: "No",
      style: "danger",
      html: true,

      ...(typeof options == "function"
        ? {
            onCancel: () => false,
            onConfirm: options
          }
        : {
            onCancel: () => false,
            onConfirm: () => true,
            ...options
          })
    }

    watch(isRevealed, (value) => {
      isShowing.value = value
    })

    // show dialog
    reveal()

    onConfirm(() => dialog.value!.onConfirm())
    onCancel(() => dialog.value!.onCancel())
  }

  return { dialog, showDialog }
})

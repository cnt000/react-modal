import { useContext, useCallback, useRef, FunctionComponent } from 'react'
import { ModalContext } from './ModalContext'

export const useModal = <P>(component: FunctionComponent<P>) => {
  const context = useContext(ModalContext)

  const showModal = useCallback(
    (props: P) => {
      context.setModal({
        component,
        props: props || {},
      })
    },
    [context, component],
  ) as P extends Record<string, unknown> ? (props: P) => void : () => void

  const hideModal = useCallback(() => {
    context.removeModal?.()
  }, [context])

  return { showModal, hideModal }
}

export const useModalActions = () => {
  const context = useContext(ModalContext)
  return {
    hideModal: () => {
      context.removeModal?.()
    },
  }
}

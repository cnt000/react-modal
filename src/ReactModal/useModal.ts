import { useContext, useCallback, useRef, FunctionComponent } from 'react'
import { ModalContext } from './ModalContext'

export const useModal = <P>(
  component: FunctionComponent<P>,
): { showModal: (props?: P) => void; hideModal: () => void } => {
  const context = useContext(ModalContext)
  const contentRef = useRef(component)

  const showModal = useCallback((props: P = {} as P) => {
    context.setModal({
      component: contentRef.current as FunctionComponent<P>,
      props,
    })
  }, [])

  const hideModal = useCallback(() => {
    context.removeModal?.()
  }, [])

  return { showModal, hideModal }
}

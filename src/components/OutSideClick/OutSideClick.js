import React, { useCallback, useEffect, useRef } from 'react'

export default function Content({ onClose, className, children }) {
    const ref = useRef(null)
    const escapeListener = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }, [onClose])
    const clickListener = useCallback(
        (e) => {
            if (!(ref.current).contains(e.target)) {
                onClose() // using optional chaining here, change to onClose && onClose(), if required
            }
        },
        [onClose],
    )
    // Below is the 10 lines of code you need.
    useEffect(() => {
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener)
        document.addEventListener('keyup', escapeListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }
    }, [clickListener, escapeListener])
    return (
        <div
            ref={ref}
            className={className}
        >
            {children}
        </div>
    )
}
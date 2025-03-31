import type { ReactNode } from 'react'

function ListHeader({ children }: { readonly children: ReactNode }) {
    return <h3 className="text-xl font-bold">{children}</h3>
}

export default ListHeader

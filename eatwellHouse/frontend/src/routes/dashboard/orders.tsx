import { createFileRoute } from '@tanstack/react-router'
import Orders from '../../ui/pages/dashboard/Orders'

export const Route = createFileRoute('/dashboard/orders')({
  component: () => <Orders />,
})

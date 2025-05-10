import { createFileRoute } from '@tanstack/react-router'
import Accont from '../../ui/pages/dashboard/Accont'

export const Route = createFileRoute('/dashboard/account')({
  component: () => <Accont />,
})


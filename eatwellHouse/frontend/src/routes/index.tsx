import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../ui/pages/HomePage'


export const Route = createFileRoute('/')({
  component: () => <HomePage />,
})


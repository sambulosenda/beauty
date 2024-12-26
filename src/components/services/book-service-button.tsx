import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BookServiceButtonProps {
  serviceId: string
}

export function BookServiceButton({ serviceId }: BookServiceButtonProps) {
  return (
    <Link href={`/services/${serviceId}/book`} passHref legacyBehavior>
      <Button asChild size="lg" className="w-full md:w-auto">
        <a>Book Now</a>
      </Button>
    </Link>
  )
}


'use client';

import { useQuery } from '@tanstack/react-query';
import { BookingsList } from './bookings-list';
import { BookingsFilter } from './bookings-filter';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import type { BookingsResponse, Booking } from '@/types/bookings';

export function BookingsClient({
  initialStatus,
  initialPage,
}: {
  initialStatus?: string[];
  initialPage: number;
}) {
  const searchParams = useSearchParams();

  const status = searchParams.get('status')?.split(',') ?? initialStatus;
  const page = parseInt(searchParams.get('page') ?? String(initialPage), 10);
  const date = searchParams.get('date');
  const providerId = searchParams.get('providerId');

  const { data, isLoading, isError } = useQuery<BookingsResponse>({
    queryKey: ['bookings', { status, page, date, providerId }],
    queryFn: async () => {
      console.log('Fetching bookings...');
      const params = new URLSearchParams();
      if (status) params.set('status', status.join(','));
      if (page) params.set('page', String(page));
      if (date) params.set('date', date);
      if (providerId) params.set('providerId', providerId);
      
      const response = await fetch(`/api/bookings?${params}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      console.log('API Response:', result);
      return result;
    },
  });

  if (isLoading) return <div>Loading bookings</div>;
  if (isError) return <div>Error loading bookings. Please try again later.</div>;

  return (
    <>
      <BookingsFilter initialStatus={status} />
      <BookingsList 
        bookings={data?.bookings ?? []}
        currentPage={data?.currentPage ?? 1}
        totalPages={data?.totalPages ?? 1}
        statusFilter={status}
      />
    </>
  );
} 

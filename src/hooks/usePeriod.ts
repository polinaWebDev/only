import { useContext } from 'react';
import { PeriodContext } from '@/shared/provider/PeriodProvider';

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (!context) {
    throw new Error('usePeriod must be used within PeriodProvider');
  }
  return context;
};

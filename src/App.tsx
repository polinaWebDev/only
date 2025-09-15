import { PeriodProvider } from '@/shared/provider/PeriodProvider';
import { PeriodSwitchSection } from '@/components';
import "@/styles/index.scss";

export const App = () => {
  return (
    <main>
      <PeriodProvider>
        <PeriodSwitchSection />
      </PeriodProvider>
    </main>
  );
};

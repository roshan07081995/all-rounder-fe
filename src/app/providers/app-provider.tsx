import { ReduxProvider } from "./redux-provider";

import { QueryProvider } from "./query-provider";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}

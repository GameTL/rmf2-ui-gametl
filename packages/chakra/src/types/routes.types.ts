import type { JSX } from 'react';

export interface RoutesType {
  name: string;
  icon?: JSX.Element;
  /** Navigable URL. Omit for section parents (sidebar accordion only). */
  path?: string;
  children?: RoutesType[];
}

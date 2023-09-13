export interface CalendarEvent {
  date: number | string;
  type: string;
  duration: string;
  distance: string;
  userId: number;
}

export interface NavbarElementProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export interface ActivityButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (event: MouseEvent, label: string) => void;
  activeLabel: string;
}

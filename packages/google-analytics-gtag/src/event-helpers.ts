import { EventDefinition } from 'redux-beacon';

export const trackPageView = (
  eventDef: EventDefinition<{
    title?: string;
    location?: string;
    path?: string;
    [key: string]: any;
  }>,
  ...trackers: string[]
): EventDefinition => (action, prevState, nextState) => {
  const { title, location, path, ...params } = eventDef(
    action,
    prevState,
    nextState
  );

  return {
    ...params,
    type: 'page',
    trackingId: trackers,
    page_title: title,
    page_location: location,
    page_path: path,
  };
};

export const trackEvent = (
  eventDef: EventDefinition<{
    category: string;
    action: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { action: eventAction, category, label, value, ...params } = eventDef(
    action,
    prevState,
    nextState
  );

  return {
    ...params,
    type: 'event',
    action: eventAction,
    event_category: category,
    event_label: label,
    value,
  };
};

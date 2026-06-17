import { MeetingBranch } from '../types';

export interface CalendarEvent {
  title: string;
  date: string;
  location: string;
  frequency: string;
  attendees: string;
  description: string;
}

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    title: "Bart Nnaji Foundation Annual Meeting",
    date: "December 26th every year",
    location: "Prof Bart Nnaji Compound, Umuode",
    frequency: "Annual",
    attendees: "Youths, Community Scholars, and General Members",
    description: "Evaluates standard scholarship grants, identifies skills developments targets, and outlines philanthropic projects for the forthcoming year."
  },
  {
    title: "The Ultimate General Return (August / December Summit)",
    date: "December 28th every year",
    location: "Umuode Community Town Hall",
    frequency: "Annual Mandatory Summit",
    attendees: "All Umuode indigenes (Home and Diaspora)",
    description: "The primary assembly to review constitutional affairs, inspect physical developments, address security/agricultural plans, and celebrate the collective year’s triumphs."
  },
  {
    title: "General Town Union Planning Meetings",
    date: "First Saturday of Every Month",
    location: "Town Union Assembly Secretariat",
    frequency: "Monthly",
    attendees: "Igwe in Council, Town Union Executives, Family Representatives",
    description: "Tracks active projects, evaluates dispute resolutions, manages local treasury reports, and coordinates seasonal agricultural preparations."
  },
  {
    title: "Umuode August General Meeting",
    date: "Consecutive week of August",
    location: "Community Event Grounds",
    frequency: "Annual Women Assembly",
    attendees: "All Umuode women, home and abroad",
    description: "The highly influential August meeting focused on female empowerment, community health campaigns, education fundraising, and cultural dance development."
  }
];

export const BRANCHES_FEDERATION: MeetingBranch[] = [
  { name: "Abuja Branch", region: "North-Central (Federal Capital Territory)" },
  { name: "Lagos Branch", region: "South-West (Commercial Center)" },
  { name: "Enugu (Urban) Branch", region: "South-East (State Capital Hub)" },
  { name: "Ebonyi Branch", region: "South-East (Agricultural Axis)" },
  { name: "Yola Branch", region: "North-East (Adamawa Hub)" },
  { name: "Kano Branch", region: "North-West (Socio-Economic Axis)" },
  { name: "Kaduna Branch", region: "North-West (Industrial Center)" },
  { name: "Onitsha Branch", region: "South-East (River Commerce Hub)" },
  { name: "Aba Branch", region: "South-East (Abia State Commercial Hub)" }
];

export const GENERAL_RETURN_TEXT = `The Umuode General Return takes place on the 28th of December of every year at the community town hall. In this gathering, the community leaders and the people come together to discuss events that took place the previous year and plan on how to move the town forward for the coming year. It brings home all citizens living outside the town to connect, invest, and celebrate together.`;

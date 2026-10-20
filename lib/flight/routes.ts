// lib/flight/routes.ts
//
// Static content for the Flight Time Calculator page: the popular-routes table
// and the FAQ. The FAQ text is also what goes into the FAQPage JSON-LD, so every
// answer is written as a complete, self-contained answer.

import { SEED_AIRPORTS } from "./seed";
import { estimateFare, estimateFlightTime, formatDuration } from "./model";
import type { Airport } from "./airports";

export const POPULAR_PAIRS: [string, string][] = [
  ["JFK", "LHR"], ["LHR", "JFK"], ["JFK", "LAX"], ["LAX", "JFK"], ["LAX", "HNL"], ["ORD", "JFK"],
  ["ATL", "LAX"], ["SFO", "HND"], ["JFK", "CDG"], ["JFK", "FCO"], ["LAX", "LHR"], ["ORD", "LHR"],
  ["LAX", "MEX"], ["DEL", "BOM"], ["DEL", "LHR"], ["DEL", "JFK"], ["BOM", "DXB"], ["LHR", "DXB"],
  ["DXB", "SIN"], ["SIN", "SYD"], ["SYD", "LAX"], ["FRA", "JFK"],
];

const byCode = new Map<string, Airport>(SEED_AIRPORTS.map((a) => [a.iata, a]));

export interface PopularRoute {
  from: Airport;
  to: Airport;
  miles: number;
  km: number;
  time: string;
  fare: number;
}

export const POPULAR_ROUTES: PopularRoute[] = POPULAR_PAIRS.flatMap(([f, t]) => {
  const from = byCode.get(f);
  const to = byCode.get(t);
  if (!from || !to) return [];
  const ft = estimateFlightTime(from, to, "auto");
  const fare = estimateFare({ distanceMi: ft.distanceMi, fromCc: from.cc, toCc: to.cc, cabin: "economy" });
  return [{
    from,
    to,
    miles: Math.round(ft.distanceMi),
    km: Math.round(ft.distanceKm),
    time: formatDuration(ft.blockMin),
    fare: fare.typical,
  }];
});

export const BTS_URL = "https://www.bts.gov/newsroom/second-quarter-2026-average-air-fare-increased-20-first-quarter-2026";

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How is flight time calculated?",
    a: "We first measure the great-circle distance between the two airports (the shortest path over the Earth's surface). Gate-to-gate time is then a fixed allowance for taxiing, climb and descent (about 45 to 55 minutes for an airliner) plus the distance divided by the average cruise speed, adjusted for the jet stream. A narrow-body jet averages roughly 510 mph and a wide-body about 540 mph over the whole trip.",
  },
  {
    q: "Why is a flight from the US to Europe shorter than the return flight?",
    a: "The jet stream blows from west to east at cruising altitude, often at 50 to 150 mph. Eastbound flights ride that tailwind and westbound flights fight it. New York to London is typically around 6 hours 45 minutes, while London to New York is about 8 hours, even though the distance is the same.",
  },
  {
    q: "What is the difference between flight time and gate-to-gate (block) time?",
    a: "Flight time is the time in the air, from wheels up to wheels down. Block time is what the airline timetable shows: from leaving the gate to arriving at the gate, so it also includes taxiing and queues. Block time is usually 20 to 30 minutes longer than the time in the air.",
  },
  {
    q: "How accurate is this flight time and cost calculator?",
    a: "The distance is exact. The time is an estimate that we checked against about 35 well-known scheduled routes, where it averaged roughly 3 to 4 percent away from the timetable. Any single flight can differ by 10 percent or more because of the actual flight path, weather, air traffic control and the aircraft used, so treat the result as a planning figure and check your airline's timetable before you book.",
  },
  {
    q: "How much does a flight cost?",
    a: "It depends mostly on distance, season and how early you book. The US Bureau of Transportation Statistics reported an average domestic itinerary fare of $445 in the second quarter of 2026, made up of about $312 for one-way tickets and $549 for round trips, including taxes and required fees but not bag or seat fees. The calculator shows a low, typical and high range for your route, which is wider than a single average because the same seat can sell for very different prices.",
  },
  {
    q: "How much is a flight from New York to London?",
    a: "Our estimate for a one-way economy ticket between New York (JFK) and London (LHR) is about $260 on a cheap day booked early, around $420 typically, and $800 or more last minute or in peak season. A return ticket is usually about 1.75 times the one-way price. The flight takes about 6 hours 45 minutes eastbound and about 8 hours back to New York.",
  },
  {
    q: "How long is the flight from Delhi to London, and what does it cost?",
    a: "Delhi (DEL) to London Heathrow (LHR) is about 4,180 miles (6,730 km). The non-stop flight takes roughly 9 hours 30 minutes, and about 8 hours in the other direction thanks to the jet stream. A one-way economy ticket typically costs around $465 (about ₹44,000), with cheap fares near $290 and last-minute fares near $890.",
  },
  {
    q: "How much is a flight from Delhi to Mumbai?",
    a: "Delhi (DEL) to Mumbai (BOM) is about 707 miles (1,140 km) and takes roughly 2 hours 15 minutes gate to gate. A one-way economy ticket typically costs around ₹6,600 (about $70), from roughly ₹4,000 on a cheap day booked early to ₹12,000 or more at the last minute.",
  },
  {
    q: "When is the cheapest time to book a flight?",
    a: "For most routes, booking roughly one to three months before departure tends to give the lowest fares, and prices usually climb in the last two weeks. Flying midweek (Tuesday or Wednesday) or on Saturday is often cheaper than Friday or Sunday, and travel outside school holidays, summer and late December is cheaper. These are patterns, not guarantees; the low end of our estimate reflects a cheap day booked early.",
  },
  {
    q: "How do I find the airport nearest to me?",
    a: "Allow the \"Use my location\" button and the calculator lists the closest major airports to your device. Without it, the starting airport is guessed from the approximate location of your internet connection, which can be a different city from yours, so always check it. You can also type your city, an airport name or its three-letter code to see every airport that serves it.",
  },
  {
    q: "Does the calculator include the time zone change?",
    a: "Yes. It shows how many hours the destination is ahead of or behind the departure airport today, using each airport's own time zone and current daylight saving rules. For your local arrival time, add the flight time to your departure time and then add or subtract that difference.",
  },
  {
    q: "How long before departure should I get to the airport?",
    a: "Many airlines and airports suggest arriving about two hours before a domestic flight and about three hours before an international one. Allow more at very large airports, during holiday periods, or if you are checking bags. Add that, plus the trip to the airport and time to leave the arrival airport, to the flight time for a realistic door-to-door estimate.",
  },
  {
    q: "What is the longest non-stop passenger flight?",
    a: "The longest scheduled non-stop services connect Singapore and New York, about 9,500 miles (15,300 km) and roughly 18 to 19 hours in the air. Other ultra-long routes include Perth to London and Auckland to Doha, each over 17 hours.",
  },
  {
    q: "Can I use this for a private jet?",
    a: "Yes. Choose \"Private jet\" as the aircraft. Private jets have less taxi and queuing time, so the gate-to-gate figure is shorter, and the cost section switches from a per-seat fare to an estimated charter price for the whole aircraft based on flight hours.",
  },
  {
    q: "Does the calculator store my location or my searches?",
    a: "No. The routes you pick are not saved on our servers. The approximate location from your connection is used only in your browser to suggest an airport, and the precise location from the \"Use my location\" button never leaves your device.",
  },
];

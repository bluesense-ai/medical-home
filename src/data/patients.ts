export const patients = [
  { id: "1", name: "Dami Egbeyemi", date: "8/28/2024" },
  { id: "2", name: "John Smith", date: "8/28/2024" },
  { id: "3", name: "Jose Pena", date: "8/28/2024" },
  { id: "4", name: "Isabel Garcia", date: "8/28/2024" },
  // ... more patients
];

export type Patient = (typeof patients)[number];

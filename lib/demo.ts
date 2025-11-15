type DemoOfficer = {
  name: string;
  badgeId: string;
  department: string;
  designation: string;
  caseClosed: number;
  cyberResolved: number;
  feedbackScore: number;
  awarenessPrograms: number;
  emergencyResponses: number;
  totalScore: number;
};

const departments = ["Cyber Cell", "Crime Branch", "Traffic", "Women & Child", "Special Task Force"];
const designations = ["Inspector", "Sub-Inspector", "ASI", "DSP", "Head Constable"];

export function getDemoOfficers(count = 20): DemoOfficer[] {
  return Array.from({ length: count }).map((_, index) => {
    const caseClosed = Math.floor(Math.random() * 120);
    const cyberResolved = Math.floor(Math.random() * 80);
    const feedbackScore = Number((3 + Math.random() * 2).toFixed(1));
    const awarenessPrograms = Math.floor(Math.random() * 15);
    const emergencyResponses = Math.floor(Math.random() * 200);
    const totalScore =
      0.4 * caseClosed + 0.3 * cyberResolved + 0.2 * feedbackScore * 10 + 0.1 * awarenessPrograms;
    return {
      name: `Officer ${String.fromCharCode(65 + (index % 26))}${index}`,
      badgeId: `BDG${1000 + index}`,
      department: departments[index % departments.length],
      designation: designations[index % designations.length],
      caseClosed,
      cyberResolved,
      feedbackScore,
      awarenessPrograms,
      emergencyResponses,
      totalScore: Number(totalScore.toFixed(2))
    };
  });
}



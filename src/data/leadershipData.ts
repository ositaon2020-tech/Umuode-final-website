export interface LeadershipStructure {
  title: string;
  role: string;
  composition: string;
  keyResponsibilities: string[];
}

export const LEADERSHIP_ROLES: LeadershipStructure[] = [
  {
    title: "The Igwe (\"ODE OF UMUODE\")",
    role: "Central Traditional Ruler & Cabinet Sovereign",
    composition: "Head of the traditional cabinet, assisted by chiefs representing each of the 15 units.",
    keyResponsibilities: [
      "Stands as the spiritual and political ambassador of Umuode.",
      "Coordinates with local government authorities in Enugu State.",
      "Maintains the supreme peace and custom protection in the domain."
    ]
  },
  {
    title: "The Traditional Chiefs Cabinet",
    role: "Advisory & Custodians of Family Lineages",
    composition: "Fifteen (15) traditional chiefs selected equally from the fifteen family units in the community.",
    keyResponsibilities: [
      "Represents original family units during core assemblies.",
      "Bridges general town developments with local kindreds.",
      "Participates in setting rules and local laws."
    ]
  },
  {
    title: "The Council of Elders (Ndi-izhi)",
    role: "Spiritual Custodians & Breaking of Kolanut",
    composition: "Senior elders of each family, headed by Oka-Ibe, the absolute oldest man in Umuode.",
    keyResponsibilities: [
      "Breaking of the sacred Kolanut, invoking spiritual blessings from the earth.",
      "Acts as final arbiter on land disputes and custom violations.",
      "Guarantees structural continuity of Umuode traditional rites."
    ]
  },
  {
    title: "Umuode Women Organizations",
    role: "Socio-Economic Development & Welcoming Coexistence",
    composition: "Headed by two key Presidents/Chair Ladies:\n1. President, Umuode Women Organization (Umuode August General Meeting)\n2. President, Umuode Women Welfare Association (Home Branch).",
    keyResponsibilities: [
      "Directs the massive annual August Meeting for community development.",
      "Supervises home-welfare networks, health initiatives, and family support.",
      "Integrates women-led agricultural cooperatives."
    ]
  },
  {
    title: "The Town Union",
    role: "Highest Executive and Legislative Government",
    composition: "Elected cabinet selected on family bases, working in direct consultation with the Igwe, Council of Elders, and Women leaders.",
    keyResponsibilities: [
      "Serves as the supreme executive administrative agency of Umuode.",
      "Coordinates, manages, and supervises all other organs in the community.",
      "Deliberates and decides capital offenses (stealing yam, domestic battery, abuse, embezzlement, or select-royal nomination processes)."
    ]
  },
  {
    title: "Umuode Youths Association",
    role: "Enforcement Wing & Peace Protectors",
    composition: "All young men of the community who manage physical security and municipal works.",
    keyResponsibilities: [
      "Enforces the formal decisions and fines set down by the Town Union.",
      "Maintains order during festivals, funerals, and market days.",
      "Patrols key borders to ensure safety against regional conflicts."
    ]
  },
  {
    title: "Associations & Age Grades (\"Ogbo\")",
    role: "Socio-Interaction & Municipal Execution",
    composition: "Compulsory registration for all citizens aged 18 years and above, structured by generational age-brackets.",
    keyResponsibilities: [
      "Determines and coordinates appropriate funeral rites for deceased members.",
      "Initiates and executes physical village improvements (road clearing, water preservation, environment sanitation).",
      "Organizes localized sport tournaments, soccer matches, and interactive festivals to build strong youth alignments."
    ]
  }
];

export const JUDICIARY_DETAILS = {
  title: "Administration and Judiciary System of Umuode",
  summary: "Umuode people have resolved to be governed by a free-minded, independent ruler in accordance with the Traditional Rulers Edict of 1976 and the Law of 1991. The judiciary system enforces equity and structural rules fairly, penalizing misconduct under community laws.",
  offenses: [
    {
      crime: "Stealing of Yam",
      gravity: "Extremely Grave",
      tradicPunish: "Historically warranted forced hanging or heavy bans. Now treated with severe local fines, public banishment, and referral to state police."
    },
    {
      crime: "Husband Bashing / Wife Battering",
      gravity: "Grave Custom Offense",
      tradicPunish: "Offending spouse is heavily fined by the Town Union and Women Organization, along with public admonition and remedial community assignments."
    },
    {
      crime: "Elderly Abuse & Child Maltreatment",
      gravity: "High Defilement of Custom",
      tradicPunish: "Strict financial penalties paid to the Town Union, coupled with mandatory family reconciliatory trials."
    },
    {
      crime: "Fighting or Assault in Public",
      gravity: "Medium Offense",
      tradicPunish: "Both parties are summoned, and the instigator pays for any medical treatment plus custom fines to clear the soil."
    },
    {
      crime: "Embezzlement of communal development funds",
      gravity: "Capital Community Offense",
      tradicPunish: "Full recovery of assets, total replacement of leadership credentials, and blacklisting from local chieftaincy rights."
    }
  ]
};

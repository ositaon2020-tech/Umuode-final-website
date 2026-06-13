import { KindredGroup, MarriageStage, TraditionalMonth } from '../types';

export const COMPOSITE_UNITS: KindredGroup[] = [
  {
    name: "UMU NNAJI ANEBU",
    families: [
      "Umu Nnaji Anebu (Kindred center)",
      "Umu Ede Ngene Onwe (Ngene-Onwe lineage)",
      "Umu Nshionungwu (Ancestral lineage)"
    ]
  },
  {
    name: "UMUOKA",
    families: [
      "Umuoka (Primary branch)",
      "Umu Ekpa-Aniekpa",
      "Umu-Onu Nwakpa"
    ]
  },
  {
    name: "UMUCHIUBA",
    families: [
      "Umuchiuba (Primary branch)",
      "Umu Ani Nwaevu",
      "Umu-Obisi Ani"
    ]
  },
  {
    name: "UMU-ODEONAGA",
    families: [
      "Umu-Odeonaga (Primary branch)",
      "Umuede-Nwangene",
      "Umu-Eneagu"
    ]
  },
  {
    name: "UMUANEGU",
    families: [
      "Umu Anegu (Formally Umu Akpa)",
      "Umuorie Aneke",
      "Umu Inyaba Ede Nwani (Inyaba caretakers)"
    ]
  }
];

export const MONTHS_OF_YEAR: TraditionalMonth[] = [
  { id: 1, name: "INYABA", translation: "Month of the River Goddess & Renewal" },
  { id: 2, name: "ISA AFO", translation: "Cleansing / Year-planning season" },
  { id: 3, name: "ANI", translation: "Honoring the Earth Deity & Planting" },
  { id: 4, name: "UGWUAKPUAGU", translation: "The Sacred Hills / Protective season" },
  { id: 5, name: "IGBA NKWA", translation: "Warriors' drum beats & Maidens' dances" },
  { id: 6, name: "ISU AHO", translation: "Mid-year harvest clearing" },
  { id: 7, name: "ILA AHU", translation: "Refining properties & custom evaluations" },
  { id: 8, name: "AJU", translation: "Ancestral memorial food share & peace feasts" },
  { id: 9, name: "ONYIMONYI", translation: "Unity festivals" },
  { id: 10, name: "NGENE IJI", translation: "Sacred stream flow honoring" },
  { id: 11, name: "AKPU AGU OR INWUTA ANI", translation: "Warm season of social interactions" },
  { id: 12, name: "UGENE", translation: "Winter harmattan rest & reflections" }
];

export const MARRIAGE_STAGES: MarriageStage[] = [
  {
    phase: 1,
    name: "Iku Aka n'uzo (Introduction)",
    description: "The groom's family formally visits the bride's parents to knock on the door and declare their intention. Note: In this first stage, the bride is not given wine to look for her husband."
  },
  {
    phase: 2,
    name: "Afa (Consultation & Inquiry)",
    description: "Both families conduct discreet investigations regarding family background, values, and status. It ensures peaceful alliances."
  },
  {
    phase: 3,
    name: "Aziza (Reply & Acceptance)",
    description: "The bride's family provides their formal answer after internal consultations. The first three stages can be combined and performed at once. Under no circumstance does the bride look for her groom during public wine during these first three stages."
  },
  {
    phase: 4,
    name: "Ngo (Bride Price Agreement)",
    description: "Negotiation of the bride price, which remains strictly a warm discussion between the parents of the bride and the in-laws. It is an abomination to sell wedding provisions for profit, and anyone doing so faces strict local sanctions."
  },
  {
    phase: 5,
    name: "Mmanya Umunna (Extended Family Wine)",
    description: "The groom meets the entire kindred (Umunna). Here, the bride is formally given standard palm wine to search for her husband, kneeling to present it to him. If the bride's mother is also from Umuode, additional mother's wine ('mmanya ndi nne') is already incorporated into this stage; else, an additional provision is declared. The Town Union oversees this stage, and food is provided."
  },
  {
    phase: 6,
    name: "Mmanya Uno n'uno (Individual Household Wine)",
    description: "Private exchanges between direct family relations and immediate neighbors to cement household cordial ties. Completing stages 1 to 5 along with bride price payment legally instates the traditional marriage. Under any circumstance, missing item provisions can be substituted in cash, which is deposited strictly into the Town Union treasury."
  }
];

export const FESTIVALS = {
  newYam: {
    name: "New Yam Festival (Iri Ji)",
    dateRule: "First Sunday in September of every year (which must also be the Nkwo market day)",
    description: "A paramount annual celebration ushering in the harvest season. Feasting, thanksgiving to the Earth Deity (Ani), cultural dances, and exchange of freshly roasted yams occur. High priority is placed on agricultural prowess."
  },
  omaba: {
    name: "Omaba Masquerade Festival",
    dateRule: "Biennial (every two years)",
    description: "A colorful, major ancestral carnival representing the spiritual return of ancestors. Designated villages and groups perform ritual and artistic duties based on ancestral roles. No Umuode citizen is discriminated against from joining or participating in these sacred groups as long as basic initiaries are met."
  }
};

export const SHRINES = [
  "Ani (The core Earth Deity of growth and justice)",
  "Inyaba (The deity of the sacred river and spiritual purification)",
  "Ngene Iji (The water spirit of Eke market flow)",
  "Akpu Agu (Spirit of community strength)",
  "Ugwu Akpu Agu",
  "Ngenechi Okpa",
  "Omaba",
  "Ani Ugwu Ani",
  "Omeligwe (The celestial sky deity of thunder and blessing)"
];

export const TRADITIONAL_MUSIC = {
  igede: {
    name: "Igede Dance",
    description: "Pre-eminent, royal percussion-driven dance. There are only two recognized groups to play this: Igede Umuode and Igede Umuanegu.",
  },
  ikpa: {
    name: "Ikpa Dance",
    description: "Unified cultural warrior dance open to all citizens who desire to participate and fulfill the criteria for initiation.",
  }
};

export const MASQUERADES = [
  "Ezema", "Ugadovu", "Ori okpa", "Nfu ojii", "Utobo", 
  "Adani", "Oriefi", "Nneze ede", "Ndu izzi", "Orimoga", 
  "Nwanyi Ojii (The dark elegant female spirit)", "Okokoro", 
  "Njo uka na efe ka egbe (Fast flyer like the hawk)", 
  "Nne Ekpiri", "Eta new ani", "Ofu na eshi abugu onyi", 
  "Okoro Omaba (The young vibrant Omaba spirit)", 
  "Ogbodo nwa Adani (Venerable Omaba mask)",
  "Arifu", "Adama", "Awu", "Ikwoko", "Idunembaeze", 
  "Okpufu", "Achifu", "Agwu odo", "Ogbara", "Mma Umu Ekwukwo", "Atu"
];

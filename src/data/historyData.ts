import { TimelineEvent } from '../types';

export const INTRO_TEXT = `Umuode is a place that flows of milk and honey with a conducive weather condition. It is located in Nkanu East Local Government Area of Enugu State, sharing borders with Akpuoga Nike and Nchatancha Nike on the North, Akpugo and Akpawfu communities on the west, Ezza-Akpugo and Amaechi Idodo on the East and Amagunze on the South. The community represents a resilient and peace-loving people who have struggled against long-standing marginalization to achieve their self-determination and autonomy.`;

export const CONFLICT_THEORIES = [
  {
    stage: "Latent Conflict",
    definition: "No outright conflict exists initially, but there is potential for friction due to systemic disparities, subunit divergence of goals, or unequal structures.",
    customApp: "The structural imbalance created in old Oruku, where leadership rotation was unilaterally amended, and kindred representation was gerrymandered to disenfranchise Umuode."
  },
  {
    stage: "Perceived Conflict",
    definition: "The cognitive realization of incompatibilities, leading to a mental framing of divergence, exclusion, and systematic marginalization.",
    customApp: "Umuode's realization of systematic attempts to sideline them from chieftaincy rotation following the death of Igwe Nwatu Okenwa in 1981."
  },
  {
    stage: "Felt Conflict",
    definition: "Subunits develop emotional responses (resentment, suspicion), creating a polarized 'us' versus 'them' mentality where each side views the other with hostility.",
    customApp: "The tension following the forced constitutional revisions and the eruption of resentment, culminating in the sudden, targeted physical assault during the 1995 reception for Prof. Barth Nnaji."
  },
  {
    stage: "Manifest Conflict",
    definition: "The eruption of open aggression, active obstruction, and hostile acts designed to thwart the other group's goals, resulting in physical clashes and destruction.",
    customApp: "Decades of severe clashes (1995–2019), during which Umuode lived as refugees in neighboring lands. Key tragic incidents include the burning of farms, the 2010 shooting of Ikechukwu Ugwu, the assassination of Igwe Moses Ugwu (Ode 1) in 2012, and the 2019 bush ambushes of John Nshiegbunam and Ifeanyi Nshi."
  },
  {
    stage: "Conflict Aftermath",
    definition: "The state of affairs after the active conflict is pacified, which can either plant the seed for future episodes if unresolved, or lay the foundation for progressive coordination if solved through structural reforms.",
    customApp: "The structural resolution carved out by Enugu Governor Ifeanyi Ugwuanyi in 2019, recognizing separate autonomous communities (Umuode, Oruku, and Aguikpa Oruku), establishing an enduring separate peace."
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1910",
    title: "European Incursion",
    description: "The region was first visited by Europeans, initiating administrative interactions with Nkanuland.",
    type: "milestone"
  },
  {
    year: "1948",
    title: "Integration and Recognition",
    description: "Umuode Clan was formally integrated as an equal, self-governing clan within Oruku following the abolition of historical non-indigene custom boundaries.",
    type: "milestone"
  },
  {
    year: "1976",
    title: "Chieftaincy Agreement & Rotation Setup",
    description: "A formal rotation agreement was signed amongst the three major kindred families of Oruku: Umuchiani, Onogowo, and Umuode. Chief Nwatu Okenwa (Umuchiani) became the first traditional ruler Beneficiary.",
    type: "milestone"
  },
  {
    year: "1981",
    title: "Constitutional Dispute & Discord",
    description: "Following the death of Igwe Nwatu Okenwa, the rotation agreement was broken. The council of elders, backed by a faction, rejected the nominee from Onogowo.",
    type: "conflict"
  },
  {
    year: "1987",
    title: "Gerrymandering & Constitutional Revisions",
    description: "Under local administration influence, the rotation system was unilaterally discarded for a 'merit' system. Family units were gerrymandered, leaving Umuode with only 5 units despite representing 40% of the population.",
    type: "conflict"
  },
  {
    year: "1995",
    date: "October 9, 1995",
    title: "Targeted Reception Assault",
    description: "During a celebratory reception for world-renowned science pioneer, serving Minister of Science & Technology, Prof. Barth Nnaji, a massive violent attack was unleashed. Houses were looted, vandalized, and many fled.",
    type: "conflict"
  },
  {
    year: "1998",
    date: "June 1998",
    title: "Enugu State Autonomy Proclamation",
    description: "Umuode was granted formal status as an Autonomy Community by the Military Government of Enugu State. However, severe hostilities made returning extremely dangerous.",
    type: "resolution"
  },
  {
    year: "2007",
    date: "December 8, 2007",
    title: "The Great Refugee Return",
    description: "Fed up with years of displacement as refugees, Umuode citizens courageously trooped en-masse back to occupy the secure compound of Prof. Barth Nnaji’s building, starting the rebuilding of their community.",
    type: "development"
  },
  {
    year: "2010",
    date: "April 2, 2010",
    title: "Aggressions at Agu-Efi",
    description: "Oruku factions attacked Umuode residents. Ikechukwu Ugwu was shot and succumbed to blood loss; Abel Egbo was shot and wounded, prompting mobile police deployment.",
    type: "conflict"
  },
  {
    year: "2012",
    title: "Assassination of Igwe Moses Ugwu",
    description: "Igwe Moses Ugwu, 'Ode I of Umuode', was shot and killed outside his home by assailants disguised as military personnel. The community wept but held its ground.",
    type: "conflict"
  },
  {
    year: "2019",
    date: "Early 2019",
    title: "Bush Ambushes",
    description: "John Nshiegbunam and Ifeanyi Nshi were tragically ambushed and killed on the main link road, leading to escalating state-level intervention.",
    type: "conflict"
  },
  {
    year: "2019",
    date: "April 8, 2019",
    title: "Ugwuanyi Peace Accord",
    description: "Enugu Governor Rt. Hon Ifeanyi Ugwuanyi engineered a historic binding Peace MoU, physically surveying the borders and creating three distinct autonomous communities (Umuode, Oruku, and Aguikpa Oruku), permanently sealing coexistence.",
    type: "resolution"
  }
];

export const REF_HEROES = [
  {
    name: "Prof. Barth Okechukwu Nnaji",
    role: "Global Scientist & Community Liberator",
    contributions: [
      "Led the decades-long struggle for obtaining official autonomous status separating Umuode from Oruku.",
      "Personally negotiated and single-handedly funded the acquisition of the Agu-efi lands from the Akpugo community.",
      "Provided physical refuge inside his private estate compound, housing thousands of Umuode refugees returning from exile.",
      "Funded critical modern infrastructure after return, including electrical transformers, clean drinking water, telecommunications access, health assets, and road grading."
    ]
  },
  {
    name: "Hon. Justice Anthony Onovo",
    role: "Legal Advisor & Judiciary Pioneer",
    contributions: [
      "Provided vital constitutional, strategic legal guidance throughout the state panels and autonomous representations."
    ]
  },
  {
    name: "Warrant Officer Jacob Ani",
    role: "Security & Ground Coordinator",
    contributions: [
      "Supported logistics, peace-keeping security arrangements, and coordinate response networks during high-crisis conflicts."
    ]
  },
  {
    name: "Igwe Moses Ugwu (Ode I)",
    role: "First Crowned Monarch & Martyr",
    contributions: [
      "Served as the unifying spiritual and political crown of Umuode. Stood fearlessly in defense of his people, sacrificing his life in 2012."
    ]
  },
  {
    name: "Dr. Daniel Nweke & Chief Emmanuel Ogbu",
    role: "Community Organizers & Directors",
    contributions: [
      "Coordinated welfare campaigns, educational materials, and continuous community representation before governmental panels."
    ]
  },
  {
    name: "Hon. Emma Omaba",
    role: "Town Leader & Administrator",
    contributions: [
      "Served as caretaker chairman, fostering diplomatic engagement with state authorities and neighboring towns."
    ]
  }
];

export const GOVT_PANELS = [
  {
    name: "Dimoji Panel of Inquiry",
    leader: "Methodist Arch-Bishop Joshua Dimoji",
    recommendation: "If peaceful integration within Oruku failed, Oruku must be split. Selected Eziobodo or Obinagu villages for establishing Umuode community. Rejected by Oruku leadership."
  },
  {
    name: "State Caretaker Committee",
    leader: "Three-Clan Representative Committee",
    recommendation: "Appointed to execute Dimoji's integration options. Finding it frustrated, they concluded Oruku must immediately split into two separate town entities (Umuode and Oruku). Frustrated by Oruku."
  },
  {
    name: "Nyananyo Committee",
    leader: "Air Force Wing Commander Nyananyo",
    recommendation: "Surveyed local areas to find viable land for Umuode. Formally identified and recommended 'Agu-efi land', advising Umuode to negotiate directly with Akpugo land owners. Umuode paid the price; Oruku opposed."
  },
  {
    name: "Catholic Diocese Arbitration",
    leader: "Leadership of Enugu Catholic Church",
    recommendation: "Rejected the marshy, inhabitable 'Abari' land suggested by Oruku for Umuode, and endorsed relocation to the fertile upland fields of Agu-efi as the only humane path."
  }
];

export const CASTE_REJECTION_ARTICLE = {
  title: "We Are Not Slaves: Dismantling the Osu and Ohu Caste Ideal",
  content: `Among the most obsolete, outrageous, and devastating ancient traditions in some parts of Igboland is the 'Osu' and 'Ohu' caste system. Historically utilized as an ideology of class domination, it falsely claims certain families are disinherited or ritually excluded from normal communal associations based on ancestral ritual assignments or servitude.

  Umuode historically rejected this division utterly. The town's forefathers and leaders proved that Umuode is a deep-rooted, highly noble community:
  
  • Historical Interdependence: Orgbo Anichi of Umuode was once the absolute oldest man (Onyioha) in the entire Oruku region, proving that breaking of sacred kolanuts and core regional decisions rested directly with Umuode's leadership.
  • Culture of Success: Historically, non-indigene or caste stigmas were weaponized because early contacts with Western civil engineering, mercantile guilds, and formal schools enabled Umuode families to grow materially wealthier and highly educated. This success fueled jealousy, prompting neighbors to resurrect archaic diala-osu labels to suppress Umuode's socio-economic leadership.
  • Overcoming Division: In the modern era, our global achievements have exposed these discriminatory myths as human rights violations, equivalent to historical Western racism. As former British Prime Minister Tony Blair commented during Nelson Mandela's memorial, division based on birth is 'immoral and stupid'. We stand tall, united, and absolutely emancipated.`
};

export const ORUKU_ARTICLE_SUMMARY = {
  title: "The Historical Narrative of Oruku (Archival Context)",
  content: `To present an objective historical record, the portal archives the traditional Oruku perspective from local documentation:
  
  Oruku, containing a population of around ten thousand, comprises hamlets such as Ishienu, Ohuani, Ezi-obodo, Ameke, Obinagu, Uzam, and Aguikpa. Historically, Oruku traces its lineage to 'Onaga-Ifeji-Aba Nnamuchi'. The town was traditionally divided into Chiani (Umuchiani) and Igwejike (Umuigwejike) quarters, inhabiting 'Okpuhu' and managing the sacred Inyaba River crossings.
  
  According to their archives, Umuode settled as part of the community, and in 1948, following the official ending of the regional servant system, Umuode was integrated into the larger 'Ihu Nnam' quarter. Tension emerged after 1981 following the death of Igwe Nwatu Okenwa, who ruled under a three-clan rotational chieftaincy constitution. Factions changed the constitution from rotational succession to 'merit' standard, sparking legal wars, claims of land ownership, and eventual structural splits.
  
  Today, following the 2019 intervention by Governor Ifeanyi Ugwuanyi, this history has transitioned into structured coexistence, with each community managing its own autonomous boundaries and leadership stools.`
};

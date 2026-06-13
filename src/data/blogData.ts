export interface BlogPost {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Culture & Festivals' | 'History & Peace' | 'Ecological' | 'Welfare';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  isPinned?: boolean;
  likes: number;
}

export const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Annual Umuode Cultural Heritage Assembly: Celebrating Ancestry & Unity',
    category: 'Culture & Festivals',
    isPinned: true,
    excerpt: 'A comprehensive visual review of the vibrant displays, colourful native regalia, and ceremonial masquerades witnessed during the communal reunion celebration.',
    content: `Each December, Umuode lights up in an explosion of custom, rhythm, and pride. The 2025 Cultural Assembly proved to be one of our most successful events of the decade, attracting hundreds of expatriate sons and daughters from all over Europe, North America, and other major parts of Nigeria back to the ancestral soil of Enugu State.

His Royal Highness (HRH), the Igwe of Umuode, in collaboration with the Town Union Executive Cabinet, opened the morning ceremonies with a majestic, historic ritual of cleaning and breaking the kolanut, invoking the protective spirits of our founding ancestors. In his royal speech, the Igwe emphasized: "Umuode’s greatest wealth is its unwavering sense of community. By staying linked to our ancestral values, we safeguard our local development."

The event featured the royal court procession of titled high chiefs, stunning theatrical sequences of local age grades, and the famous, energetic traditional masquerade rituals. These performances are far more than amusement; they are sacred visual history lessons passed down across hundreds of generations.

This year's festival also marked the launch of our Community Youth Support foundation, gathering generous welfare donations to finance academic scholarships for dozens of ambitious Nkanu East school students. The day culminated in regional football tournament qualifiers at the civic stadium, leaving our people with high hopes for 2026.`,
    author: 'Chief Vincent Eke',
    authorRole: 'UTU Secretary General',
    date: 'December 28, 2025',
    readTime: '4 min read',
    likes: 84
  },
  {
    id: 'post-2',
    title: 'Water Security: How the Grid Project is Mitigating Rural Dry Seasons',
    category: 'Infrastructure',
    excerpt: 'An inside look at our modern solar-powered purification system, providing clean running water to hundreds of surrounding kindred kindred circles.',
    content: `Access to clean, reliable drinking water has historically been a seasonal struggle across parts of Nkanu East LGA during the hot, rainless dust period between November and late February. Today, thanks to a beautiful collaborative initiative, Umuode has achieved a historic infrastructure milestone.

Completed in April 2026, the custom Umuneke Solar Borehole Grid uses high-conductivity solar collector panels to pump pure fresh water from safe deep-ground water tables directly into three massive, elevated stainless steel reservoirs. These reservoirs are connected to strategic self-help neighborhood gravity taps across five major kindred zones.

"Instead of making arduous travels down to the low-lying river beds, our elderly mothers and school children can now access purified water right at their doorstep steps," reports the Chairman of the Local Projects Council.

Crucially, the water undergoes an eco-friendly carbon-filtration process on-site, entirely powered by our solar array. This self-sustaining green energy system ensures we are not reliant on unstable grid electricity, completely avoiding overhead operating expenditures. This successful prototype serves as an inspiring blueprint for surrounding Enugu State communities.`,
    author: 'Engr. Obi Nwatu',
    authorRole: 'Infrastructure Sub-Committee',
    date: 'April 14, 2026',
    readTime: '3 min read',
    likes: 62
  },
  {
    id: 'post-3',
    title: 'The Great Accord of 2002: Reflecting on Twenty-Four Years of Harmony',
    category: 'History & Peace',
    excerpt: 'An educational retrospective discussing our hard-earned autonomy and the foundational peace treaties that catalyzed modern development.',
    content: `The modern prosperity and harmony of Umuode Community did not emerge by coincidence; it was forged by brave elders who prioritized peace, restitution, and justice after a period of dispute.

Prior to 2002, our people sat in structural and political disputes within the larger region, limiting community infrastructure projects and hindering growth. On September 10, 2002, under governor-approved mediation, delegates from all major kindreds, youths, and state representatives signed the landmark "Umuode Peace Accord and Charter of Autonomy." This historical milestone led to our official crown recognition as a fully sovereign Autonomous Community within Enugu State.

Twenty-four years later, we reflect on how this treaty unlocked unprecedented growth, allowing the establishment of our custom written Constitution, local Town Union councils, and independent royal lineage selections.

"Peace is an active practice of justice," notes our resident historian. "By standardizing our kindred councils and respecting the judicial voice of our Supreme Council of Elders, we ensure that disputes never overflow into structural division. This historic compromise remains a pristine lesson in political maturity for local governance models across West Africa."`,
    author: 'Prof. J. C. Onodu',
    authorRole: 'Historical Archives Consultant',
    date: 'February 3, 2026',
    readTime: '5 min read',
    likes: 105
  },
  {
    id: 'post-4',
    title: 'The Ecology of Inyaba River: Revitalizing Sacred Wetlands & Flora',
    category: 'Ecological',
    excerpt: 'Exploring local efforts to maintain water safety and prohibit illegal deforestation in the sacred river basin.',
    content: `The Inyaba River represents more than a boundary watermark on a regional map. It is the life-support system of the Umuode valley.

In recent times, our sacred Inyaba River ecosystem has experienced subtle ecological strains due to unregulated sand harvesting and upstream agricultural runoff. In early 2026, the traditional cabinet launched the Inyaba Conservation Code to actively reverse these environmental pressures.

Under this legislative act, illegal logging of endemic trees at the immediate riverbank is strictly forbidden under fine penalty. These trees contain vital natural root grids that shield the bank soils from torrential rain erosion. Furthermore, the Council has designated absolute sanctuary points where the water is left entirely undisturbed, letting indigenous freshwater fish species nest and breed in safety.

This combination of customary ecological taboo and modern biological supervision highlights how traditional environmental stewardship can successfully work in concert with regional goals to conserve the beauty of Nkanu East.`,
    author: 'Adaobi Igwe',
    authorRole: 'Environmental Advocacy Officer',
    date: 'May 10, 2026',
    readTime: '3 min read',
    likes: 47
  }
];

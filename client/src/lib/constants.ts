export const KBE_BRANDING = {
  colors: {
    primary: 'hsl(210, 50%, 25%)',
    secondary: 'hsl(210, 30%, 35%)',
    accent: 'hsl(210, 20%, 45%)',
    light: 'hsl(210, 15%, 85%)',
    lighter: 'hsl(210, 10%, 95%)',
  },
  gradients: {
    hero: 'linear-gradient(135deg, hsl(210, 50%, 25%) 0%, hsl(210, 30%, 35%) 50%, hsl(210, 20%, 45%) 100%)',
    card: 'linear-gradient(to bottom right, hsl(0, 0%, 100%) 0%, hsl(210, 10%, 98%) 100%)',
  }
};

export const EXAM_GRADES = [
  {
    id: 'grade-1',
    title: 'Grade I',
    classes: 'Classes V, VI & VII',
    price: 270,
    description: 'Foundation level to spark curiosity and basic scientific understanding.',
    color: 'slate'
  },
  {
    id: 'grade-2', 
    title: 'Grade II',
    classes: 'Classes VIII, IX & X',
    price: 360,
    description: 'Intermediate level to deepen scientific knowledge and analytical thinking.',
    color: 'gray'
  },
  {
    id: 'grade-3',
    title: 'Grade III', 
    classes: 'Classes XI & XII+',
    price: 360,
    description: 'Advanced level for future scientists and researchers.',
    color: 'zinc'
  }
];

export const AWARDS = [
  {
    position: '1st',
    prize: 'Einstein\'s Gold Medal + Rank Certificate',
    badge: 'Gold Medal Winner',
    scholarship: 'Advanced Qualifying E-Certificate',
    specialReward: 'Top 3 qualify for ISRO/NASA visits',
    color: 'amber',
    level: 'Taluka Level'
  },
  {
    position: '2nd',
    prize: 'Einstein\'s Silver Medal + Rank Certificate', 
    badge: 'Silver Medal Winner',
    scholarship: 'Advanced Qualifying E-Certificate',
    specialReward: 'Top 3 qualify for ISRO/NASA visits',
    color: 'slate',
    level: 'Taluka Level'
  },
  {
    position: '3rd',
    prize: 'Einstein\'s Bronze Medal + Rank Certificate',
    badge: 'Bronze Medal Winner', 
    scholarship: 'Advanced Qualifying E-Certificate',
    specialReward: 'Top 3 qualify for ISRO/NASA visits',
    color: 'gray',
    level: 'Taluka Level'
  }
];

export const LEVEL_AWARDS = [
  {
    level: "KBE Mains (Taluka Level)",
    description: "First three place winners from each category get Einstein's medals with rank certificates at their authorized exam centre",
    prizes: [
      "Einstein's Gold Medal + Rank Certificate",
      "Einstein's Silver Medal + Rank Certificate", 
      "Einstein's Bronze Medal + Rank Certificate"
    ],
    qualification: "40% candidates get Advanced Qualifying E-Certificate under special code of conduct from KBE control board",
    icon: "medal",
    color: "from-blue-500 to-blue-600"
  },
  {
    level: "KBE Advanced (District Level)",
    description: "First three place winners from each category get precious ISRO visit and space training experience",
    prizes: [
      "ISRO Visit + Space Training Experience",
      "Flight Experience Mumbai to Bengaluru",
      "Special Felicitation at ISRO with Einstein's Medals, Certificates and Success Bands"
    ],
    qualification: "40% candidates get Super Advanced Qualifying E-Certificate",
    details: {
      participants: "9 candidates + 9 mentors (18 total)",
      itinerary: [
        "One day stay and travelling in Mumbai",
        "Flight experience Mumbai to Bengaluru", 
        "2D/N stay and travelling in Bengaluru",
        "Special felicitation at ISRO with officials"
      ]
    },
    icon: "rocket",
    color: "from-purple-500 to-purple-600"
  },
  {
    level: "KBE Super Advanced (State Level)",
    description: "First three place winners get privileged NASA (USA) visit and space training experience",
    prizes: [
      "NASA (USA) Visit + Space Training Experience",
      "Round flight journey Mumbai/Delhi to USA",
      "7D/N stay in USA with NASA centre visit"
    ],
    qualification: "Elite level recognition and international exposure",
    details: {
      participants: "Top 3 winners + mentors",
      itinerary: [
        "USA visa process assistance",
        "Round flight journey from Mumbai/Delhi to USA",
        "7 Days/Nights stay in USA",
        "NASA centre visit and different places tour"
      ],
      note: "Candidates should make passports with help of mentors, parents or KBE control board"
    },
    icon: "globe",
    color: "from-amber-500 to-orange-600"
  }
];

export const SPECIAL_AWARDS = [
  {
    title: "Einstein Excellence Award",
    description: "For exceptional performance across all levels",
    prize: "Special Recognition + Educational Scholarship",
    criteria: "Outstanding performers in each category"
  },
  {
    title: "Space Explorer Award", 
    description: "For dedication to space science learning",
    prize: "Advanced Space Training Programs",
    criteria: "Best performers in space science topics"
  },
  {
    title: "International Recognition Award",
    description: "For representing KBE at global platforms",
    prize: "International Science Conference Participation",
    criteria: "NASA visit qualifiers and exceptional achievers"
  }
];

export const TOUR_BENEFITS = [
  {
    facility: "ISRO Space Centre",
    activities: ["Satellite Control Room Visit", "Rocket Assembly Viewing", "Interaction with Scientists", "Space Mission Briefing"],
    duration: "3 Days",
    includes: "Accommodation + Meals + Transportation"
  },
  {
    facility: "NASA Space Center",
    activities: ["Mission Control Tour", "Astronaut Training Simulation", "Space Technology Demonstrations", "Expert Lectures"],
    duration: "5 Days", 
    includes: "International Travel + Full Board + Guided Tours"
  }
];

export const EINSTEIN_QUOTES = [
  {
    quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
    author: "Albert Einstein"
  },
  {
    quote: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
    author: "Albert Einstein"
  },
  {
    quote: "Try not to become a person of success, but rather try to become a person of value.",
    author: "Albert Einstein"
  }
];

export const CONTACT_INFO = {
  address: "Block.01, N Post Office, Shivaji Nagar, (PB) Nashik",
  phone: "95294 99075",
  email: "info@kbe-competition.com",
  hours: "Mon - Sat: 9am to 5pm IST"
};

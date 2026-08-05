export interface Testimonial {
  text: string;
  image: string;
  name: string;
  handle: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "EAD is a real gem! I attended the roadshow last year and it completely changed the way I look at starting up. I can only recommend it!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Patrick Martin",
    handle: "@pmartin_tech",
    date: "Jan 18, 2026",
  },
  {
    text: "I pitch at LSM every year, and it's awesome! I met our lead seed investor right at the Kolkata edition. Essential for early stage founders! :)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bruce Murphy",
    handle: "@bmurphy_dev",
    date: "Jan 18, 2026",
  },
  {
    text: "The mentorship sessions during EAD were top notch. Connected with founders who gave us direct actionable feedback on our business model.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Crystal Perkins",
    handle: "@crystal_p",
    date: "Jan 18, 2026",
  },
  {
    text: "Showcasing at Local Startups Meet opened doors to ₹25L in seed capital. The E-Cell IIT Kharagpur team organized a truly seamless event!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Thomas Cruz",
    handle: "@tcruz_ai",
    date: "Jan 18, 2026",
  },
  {
    text: "I use EAD insights every day for our startup strategy! I track all our regional growth milestones thanks to the network we built there.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Gregory Wallace",
    handle: "@greg_wallace",
    date: "Jan 18, 2026",
  },
  {
    text: "EAD is a game changer for tier-2/3 cities! It brought ecosystem opportunities right to our campus when no one else was visiting.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Megan Walters",
    handle: "@megan_walters",
    date: "Jan 18, 2026",
  },
  {
    text: "E-Cell IIT Kharagpur's drives are unparalleled. The speed-mentoring format gave us instant term sheet reviews from tier-1 angel networks.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Andrew Cook",
    handle: "@acook_vc",
    date: "Jan 18, 2026",
  },
  {
    text: "The energy at EAD city roadshows is electrifying! Over 1,000+ enthusiastic students in a single hall ready to innovate.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Jenkins",
    handle: "@sarah_j",
    date: "Jan 18, 2026",
  },
];

export const firstColumn = testimonials.slice(0, 4);
export const secondColumn = testimonials.slice(4, 8);

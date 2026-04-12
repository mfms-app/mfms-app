import { type } from "@react-native-firebase/app/dist/module/internal/web/firebaseFirestorePipelines";

// Action Types
const LOAD_SCHEDULE = 'Schedule/LOAD_SCHEDULE';
const TOGGLE_SESSION = 'Schedule/TOGGLE_SESSION';

const defaultState = {
  schedule: [],
  selectedSessions: [],
  isLoading: false,
};

const schedule = [
  {
    id: 15,
    startTime: new Date('2026-04-17T08:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T09:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Check-In Begins',
    location: '',
  },
  {
    id: 1,
    startTime: new Date('2026-04-17T09:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Ali Gropper', title: 'MFMS Co-Founder, Celebrity Wardrobe Stylist & Co-Founder, Danielle & Alix' },
      { name: 'Wade Bassock', title: 'Co-President of MFMS' },
      { name: 'Ryan Sweeney', title: 'Co-President of MFMS' },
    ],
    title: 'Opening Remarks',
    location: 'Robertson Auditorium',
  },
  {
    id: 2,
    startTime: new Date('2026-04-17T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T10:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Steve Shiffman', title: 'Strategic Advisor, Coach, & Former CEO of Calvin Klein'},
      { name: 'Ken Pilot', title: 'Founder of Ken Pilot Ventures'}
    ],
    title: 'Culture, Commerce & Calvin Klein: From the Mind of a CEO',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'Hear Steve talk about his experience as the former CEO of Calvin Klein and what he is doing now.'
  },
  {
    id: 3,
    startTime: new Date('2026-04-17T10:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T10:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Kenneth Himmel', title: 'President of Related Ross', link:'' },
      { name: 'Webber Hudson', title: 'Executive Vice President, Retail Leasing and Asset Management Related Ross' }
    ],
    title: 'Retail Renaissance: The Evolution of Luxury Experiences',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'From the demolition of massive department store giants to the rise of the "lifestyle center," the physical retail landscape is undergoing a radical transformation. This panel tracks the 25-year evolution of the industry, exploring why traditional department stores have declined while high-performing "A-malls" thrive through reinvention. Panelists will discuss a shift where restaurants serve as the new anchors and developers merge retail, dining, and leisure into cohesive ecosystems, defining what makes a modern destination successful in the future of commerce.'
  },
  {
    id: 4,
    startTime: new Date('2026-04-17T10:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T10:55:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Fashion Forward Showcase Video',
    location: 'Robertson Auditorium',
  },
  {
    id: 5,
    startTime: new Date('2026-04-17T11:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T11:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Madison Woolley', title: 'Founder & Designer of 23rd & Madison; Co-Founder & Creative Director of PURR Studio and Weddings by PURR' },
      { name: 'Sasha Mutchnik', title: 'Senior Director of Social for GQ Magazine' },
      { name: 'Haley Polkes', title: 'Director of Brand & PR at The Center Brands' },
      { name: 'Nic Byrom', title: 'Creative Director, OOTD' },
      { name: 'Marcus Collins', title: 'Marketing Professor at the University of Michigan, and Co-Host of From the Culture Podcast' }
    ],
    title: 'Brand Storytelling: Content To Connection',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'This panel will explore how brands can use social media to build a cohesive, 360-degree brand vision that connects across every consumer touchpoint. Panelists will discuss how platforms can serve as powerful tools for storytelling, authenticity, and community-building, moving beyond simple promotion to create meaningful relationships with audiences. The conversation will also highlight strategies for aligning brand voice, visuals, and values across channels to drive trust, engagement, and lasting consumer buy-in.'
  },
  {
    id: 6,
    startTime: new Date('2026-04-17T11:35:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T12:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Brandon Williams', title: 'Creative Director + Celebrity Stylist, Hudson Jeans' },
      { name: 'Ali Gropper', title: 'MFMS Co-Founder, Celebrity Wardrobe Stylist & Co-Founder, Danielle & Alix' },
    ],
    title: 'Beyond the Basics: The Art of Styling Menswear',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'Menswear operates across vastly different scales, from founder-led startups to globally recognized brands. This panel will explore how fashion serves as a powerful tool for men’s self-expression, confidence, and identity. Panelists will discuss maintaining authenticity, navigating scale, and the role of media in shaping streetwear’s future.'
  },
  {
    id: 7,
    startTime: new Date('2026-04-17T12:15:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T13:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Ross Catering', title: '' }
    ],
    title: 'Lunch',
    location: 'To Be Announced',
  },
  {
    id: 8,
    startTime: new Date('2026-04-17T13:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T14:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Grace Drettman', title: 'Global Partnerships & Media Measurement Lead at Google'},
      { name: 'Olivia Landau', title: 'Founder & CEO of The Clear Cut' },
      { name: 'Kate Davidson Hudson', title: 'Founder + CEO of Vêtir' },
      { name: 'Uma Chalik', title: 'Investor, Torch Capital'}
    ],
    title: 'Agentic Commerce: Enhancing Consumer Experience with AI',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'Agentic commerce represents a shift from reactive shopping to proactive, AI-driven experiences where technology anticipates consumer needs, personalizes discovery, and streamlines decision-making. This panel will explore how AI agents, data, and automation are reshaping commerce across the luxury and retail sectors. Panelists will discuss real-world applications, brand implications, and what this evolution means for both consumers and businesses.'
  },
  {
    id: 9,
    startTime: new Date('2026-04-17T14:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T15:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Networking Hour (starts at 2:20 pm)',
    location: '',
    description: 'Networking block; mingle and connect with attendees and speakers.',
  },
  {
    id: 10,
    startTime: new Date('2026-04-17T15:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T16:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Melissa Mash', title: 'Co-founder and CEO of Dagne Dover'},
    ],
    title: 'Fireside: Equity Through Entrepreneurship: Disrupting The Industry',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'This panel will spotlight how meaningful change happens when intention meets action. The conversation will explore equity as a business imperative, the role of mentorship and access, and how “good deeds” can drive lasting cultural and industry transformation.'
  },
  {
    id: 11,
    startTime: new Date('2026-04-17T16:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Danielle Guizio', title: 'CEO + Designer of Guizio' },
      { name: 'Francesca Aiello', title: 'Founder and Chief Executive Officer of Frankies Bikinis' },
      { name: 'Elena Bonvicini', title: 'Founder and Creative Director of EB Denim' },
      { name: 'Jessica Williams', title: 'Head of Brand Marketing & Partnerships of Shopify' }
    ],
    title: 'Vision to Venture: Young Founders in Fashion',
    location: 'Robertson Auditorium',
    type: 'panel',
    description: 'From viral launches to long-term brand equity, this panel, sponsored by Shopify, brings together young entrepreneurs who have transformed personal vision into category-defining fashion brands. Panelists will share the realities of building, scaling, and sustaining cult followings early in their careers, including taking early risks, maintaining creative control, and navigating rapid growth in a highly competitive industry.'
  },
  {
    id: 12,
    startTime: new Date('2026-04-17T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T17:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'FFS ANNOUNCEMENT',
    location: '',
    description: 'Fashion Forward Showcase announcement.',
  },
  {
    id: 13,
    startTime: new Date('2026-04-17T17:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T17:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Mani Carnes', title: 'COO of MFMS' }
    ],
    title: 'Closing Remarks',
    location: 'Robertson Auditorium',
  },
];

export function loadSchedule() {
  return {
    type: LOAD_SCHEDULE,
    schedule: schedule,
  };
}

export default function ScheduleReducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule.map((s) => {
          const startDateTimeISO = s.startDateTimeISO || null;
          const endDateTimeISO = s.endDateTimeISO || null;
          const startTime =
            s.startTime ||
            (startDateTimeISO
              ? new Date(startDateTimeISO).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
              : '');
          const endTime =
            s.endTime ||
            (endDateTimeISO
              ? new Date(endDateTimeISO).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
              : '');

          return {
            ...s,
            startDateTimeISO,
            endDateTimeISO,
            startTime,
            endTime,
            description: s.description || '',
          };
        }),
        isLoading: false,
      };
    case TOGGLE_SESSION:
      return {
        ...state,
        selectedSessions: state.selectedSessions.includes(action.sessionId)
          ? state.selectedSessions.filter(id => id !== action.sessionId)
          : [...state.selectedSessions, action.sessionId],
      };
    default:
      return state;
  }
} 
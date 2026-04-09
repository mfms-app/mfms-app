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
    description: 'Arrive, pick up your badge, and get settled before the summit begins.',
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
    title: 'Keynote: Steve Shiffman',
    location: 'Robertson Auditorium',
  },
  {
    id: 3,
    startTime: new Date('2026-04-17T10:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2026-04-17T10:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: [
      { name: 'Kenneth Himmel', title: 'President of Related Ross', link:'' },
      { name: 'Webber Hudson', title: 'Executive Vice President, Retail Leasing and Asset Management Related Ross' }
    ],
    title: 'Fireside: Building The Foundation: The Business of Luxury Real Estate & Fashion',
    location: 'Robertson Auditorium',
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
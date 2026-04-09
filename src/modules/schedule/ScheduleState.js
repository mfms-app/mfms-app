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
    startDateTimeISO: '2026-03-28T08:30:00-04:00',
    endDateTimeISO: '2026-03-28T09:20:00-04:00',
    speakers: '',
    title: 'Check-In Begins',
    location: '',
    description: 'Arrive, pick up your badge, and get settled before the summit begins.',
  },
  {
    id: 1,
    startDateTimeISO: '2026-03-28T09:20:00-04:00',
    endDateTimeISO: '2026-03-28T09:30:00-04:00',
    speakers: 'Ali Gropper',
    title: 'Introduction to the summit',
    location: '',
    description: 'Welcome remarks and overview of the day.',
  },
  {
    id: 2,
    startDateTimeISO: '2026-03-28T09:30:00-04:00',
    endDateTimeISO: '2026-03-28T09:40:00-04:00',
    speakers: 'Wade Bassock | MFMS Co-President; Ryan Sweeney | MFMS Co-President',
    title: 'Day Introduction: Co-Presidents (RW)',
    location: '',
    description: 'Kickoff and context for the summit program.',
  },
  {
    id: 3,
    startDateTimeISO: '2026-03-28T09:40:00-04:00',
    endDateTimeISO: '2026-03-28T10:20:00-04:00',
    speakers: 'Steve Shiffman & Ken Pilot',
    title: 'Culture, Commerce & Calvin Klein: Inside the Mind of a CEO',
    location: '',
    description: 'A conversation on leadership, brand building, and navigating cultural change.',
  },
  {
    id: 4,
    startDateTimeISO: '2026-03-28T10:20:00-04:00',
    endDateTimeISO: '2026-03-28T10:50:00-04:00',
    speakers: 'Kenneth Himmel & Webber Hudson',
    title: 'Fireside: Building The Foundation: The Business of Luxury Real Estate & Fashion',
    location: '',
    description: 'A fireside chat on building enduring businesses and brands.',
  },
  {
    id: 5,
    startDateTimeISO: '2026-03-28T10:50:00-04:00',
    endDateTimeISO: '2026-03-28T10:55:00-04:00',
    speakers: '',
    title: 'FFS Video',
    location: '',
    description: 'Fashion Forward Showcase video segment.',
  },
  {
    id: 6,
    startDateTimeISO: '2026-03-28T10:55:00-04:00',
    endDateTimeISO: '2026-03-28T11:35:00-04:00',
    speakers: 'Madison Woolley, Sasha Mutchnik, Haley Polkes, Nic Byrom, Marcus Collins',
    title: 'Brand Storytelling: Content To Connection',
    location: '',
    description: 'How brands build trust and community through narrative and content.',
  },
  {
    id: 7,
    startDateTimeISO: '2026-03-28T11:35:00-04:00',
    endDateTimeISO: '2026-03-28T12:15:00-04:00',
    speakers: 'Ali Gropper & Brandon Williams',
    title: 'Beyond the Basics: The Art of Styling Menswear',
    location: '',
    description: 'A practical session on the fundamentals and finesse of menswear styling.',
  },
  {
    id: 8,
    startDateTimeISO: '2026-03-28T12:15:00-04:00',
    endDateTimeISO: '2026-03-28T13:10:00-04:00',
    speakers: '',
    title: 'Lunch',
    location: '',
    description: 'Lunch break.',
  },
  {
    id: 9,
    startDateTimeISO: '2026-03-28T13:10:00-04:00',
    endDateTimeISO: '2026-03-28T14:00:00-04:00',
    speakers: 'Grace Drettmann, Olivia Landau, Kate Davidson Hudson, Uma Chalik',
    title: 'Agentic Commerce: Enhancing Consumer Experience with AI',
    location: '',
    description: 'How AI agents are reshaping discovery, service, and the customer journey.',
  },
  {
    id: 10,
    startDateTimeISO: '2026-03-28T14:00:00-04:00',
    endDateTimeISO: '2026-03-28T15:20:00-04:00',
    speakers: '',
    title: 'Networking Hour (starts at 2:20 pm)',
    location: '',
    description: 'Networking block; mingle and connect with attendees and speakers.',
  },
  {
    id: 11,
    startDateTimeISO: '2026-03-28T15:20:00-04:00',
    endDateTimeISO: '2026-03-28T16:00:00-04:00',
    speakers: 'Melissa Mash',
    title: 'Equity Through Entrepreneurship: Disrupting The Industry',
    location: '',
    description: 'Building equitable businesses and changing the industry from within.',
  },
  {
    id: 12,
    startDateTimeISO: '2026-03-28T16:00:00-04:00',
    endDateTimeISO: '2026-03-28T16:50:00-04:00',
    speakers: 'Danielle Guizio, Francesca Aiello, Elena Bonvicini, Jessica Williams',
    title: 'Vision to Venture: Young Founders in Fashion',
    location: '',
    description: 'Founders share how they built brands from early ideas to real ventures.',
  },
  {
    id: 13,
    startDateTimeISO: '2026-03-28T16:50:00-04:00',
    endDateTimeISO: '2026-03-28T17:00:00-04:00',
    speakers: '',
    title: 'FFS ANNOUNCEMENT',
    location: '',
    description: 'Fashion Forward Showcase announcement.',
  },
  {
    id: 14,
    startDateTimeISO: '2026-03-28T17:00:00-04:00',
    endDateTimeISO: '2026-03-28T17:10:00-04:00',
    speakers: 'Mani Carnes | MFMS COO',
    title: 'Closing Remarks: COO (M)',
    location: '',
    description: 'Wrap-up and closing remarks.',
  },
];

// Helper function to format speakers text with line breaks
const formatSpeakers = (speakersText) => {
  if (!speakersText) return '';
  
  // Replace commas with line breaks
  return speakersText.split(',').map(speaker => speaker.trim()).join('\n');
};


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
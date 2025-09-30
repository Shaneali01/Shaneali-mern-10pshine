//  export const mockNotes = [
//     {
//       id: 1,
//       title: "Project Requirements",
//       content: `# Project Requirements - Notes Management Application

// ## Core Features
// - **User Authentication**: Secure login and registration system
// - **CRUD Operations**: Create, Read, Update, Delete notes
// - **Search Functionality**: Full-text search across all notes
// - **Categorization**: Organize notes by categories (Work, Personal, Learning)
// - **Tagging System**: Multiple tags per note for better organization

// ## Technical Requirements
// - **Frontend**: React with modern hooks and component architecture
// - **Backend**: RESTful API with proper error handling
// - **Database**: Efficient storage and retrieval of user notes
// - **Security**: Input validation and user data protection

// ## User Experience Goals
// - Intuitive and clean interface design
// - Fast loading and responsive interactions
// - Mobile-friendly responsive design
// - Keyboard shortcuts for power users

// ## Implementation Timeline
// - Phase 1: Basic CRUD operations (Week 1-2)
// - Phase 2: Search and filtering (Week 3)
// - Phase 3: UI polish and mobile optimization (Week 4)

// This comprehensive notes application will serve as a central hub for user productivity and information management.`,
//       category: "work",
//       createdAt: "2024-09-25",
//       updatedAt: "2024-09-26",
//       isPinned: true,
//       tags: ["project", "requirements", "planning"]
//     },
//     {
//       id: 2,
//       title: "Meeting Notes - Team Sync",
//       content: `# Team Sync Meeting - September 24, 2024

// ## Attendees
// - Sarah (Project Manager)
// - Mike (Backend Developer)  
// - Lisa (UI/UX Designer)
// - Alex (Frontend Developer - me)

// ## Key Discussion Points

// ### Q4 Planning
// - **Timeline Review**: All major milestones on track
// - **Resource Allocation**: Additional designer joining next month
// - **Budget Updates**: Within allocated budget, no concerns

// ### Technical Updates
// - Backend API completion: 85% done
// - Frontend components: 70% complete
// - Testing framework setup: In progress
// - Documentation: Needs improvement

// ### Action Items
// 1. **Mike**: Complete user authentication endpoints by Friday
// 2. **Lisa**: Finalize mobile wireframes by Wednesday  
// 3. **Alex**: Implement note editing interface by Monday
// 4. **Sarah**: Schedule client demo for next week

// ### Blockers & Concerns
// - Third-party integration delayed by vendor
// - Need clarification on data export requirements
// - Performance testing environment setup pending

// ## Next Meeting
// **Date**: October 1, 2024  
// **Time**: 10:00 AM  
// **Location**: Conference Room B / Virtual`,
//       category: "work",
//       createdAt: "2024-09-24",
//       updatedAt: "2024-09-24",
//       isPinned: false,
//       tags: ["meeting", "team", "planning", "q4"]
//     },
//     {
//       id: 3,
//       title: "Learning React Hooks",
//       content: `# React Hooks Deep Dive

// ## Core Hooks

// ### useState
// The most fundamental hook for managing component state.
// \`\`\`javascript
// const [count, setCount] = useState(0);
// const [name, setName] = useState('');
// \`\`\`

// ### useEffect
// For side effects, data fetching, and lifecycle management.
// \`\`\`javascript
// useEffect(() => {
//   // Effect logic here
//   return () => {
//     // Cleanup logic
//   };
// }, [dependencies]);
// \`\`\`

// ### useContext
// For consuming context without nesting.
// \`\`\`javascript
// const theme = useContext(ThemeContext);
// \`\`\`

// ## Advanced Hooks

// ### useReducer
// For complex state logic, similar to Redux.
// \`\`\`javascript
// const [state, dispatch] = useReducer(reducer, initialState);
// \`\`\`

// ### useMemo & useCallback
// Performance optimization hooks.
// \`\`\`javascript
// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
// \`\`\`

// ## Custom Hooks
// Create reusable logic by extracting component logic into custom hooks.`,
//       category: "learning",
//       createdAt: "2024-09-23",
//       updatedAt: "2024-09-25",
//       isPinned: true,
//       tags: ["react", "hooks", "learning", "javascript", "frontend"]
//     },
//     {
//       id: 4,
//       title: "Book Ideas & Reading List",
//       content: `# 2024 Reading List

// ## Currently Reading 📖
// - **"Clean Code"** by Robert C. Martin
//   - Progress: Chapter 7/17
//   - Key takeaways: Functions should be small, do one thing well

// ## Next Up 📚
// 1. **"The Pragmatic Programmer"** by David Thomas
// 2. **"System Design Interview"** by Alex Xu  
// 3. **"Atomic Habits"** by James Clear

// ## Technical Books 💻
// - **"You Don't Know JS"** series by Kyle Simpson
// - **"Designing Data-Intensive Applications"** by Martin Kleppmann  
// - **"Clean Architecture"** by Robert C. Martin
// - **"Refactoring"** by Martin Fowler

// ## Reading Goals
// - **Target**: 24 books this year (2 per month)
// - **Current**: 14 books completed
// - **Behind by**: 4 books (need to catch up!)`,
//       category: "personal",
//       createdAt: "2024-09-22",
//       updatedAt: "2024-09-22",
//       isPinned: false,
//       tags: ["books", "reading", "learning", "goals", "personal-development"]
//     },
//     {
//       id: 5,
//       title: "API Documentation - NoteFlow Backend",
//       content: `# NoteFlow API Documentation

// ## Base URL
// \`https://api.noteflow.com/v1\`

// ## Authentication
// All API requests require authentication using Bearer tokens.

// \`\`\`
// Authorization: Bearer <your_token_here>
// \`\`\`

// ## Endpoints

// ### User Authentication

// #### POST /auth/login
// Login with email and password.

// **Request Body:**
// \`\`\`json
// {
//   "email": "user@example.com",
//   "password": "securepassword"
// }
// \`\`\`

// #### POST /auth/register
// Create a new user account.

// ### Notes Management

// #### GET /notes
// Retrieve all notes for authenticated user.

// #### POST /notes
// Create a new note.

// #### GET /notes/:id
// Retrieve a specific note by ID.

// #### PUT /notes/:id
// Update an existing note.

// #### DELETE /notes/:id
// Delete a note permanently.`,
//       category: "work",
//       createdAt: "2024-09-21",
//       updatedAt: "2024-09-24",
//       isPinned: false,
//       tags: ["api", "documentation", "backend", "reference"]
//     }
//   ];
  export const mockNotes=[{
      id: 4,
      title: "Book Ideas & Reading List",
      content: `# 2024 Reading List

## Currently Reading 📖
- **"Clean Code"** by Robert C. Martin
  - Progress: Chapter 7/17
  - Key takeaways: Functions should be small, do one thing well

## Next Up 📚
1. **"The Pragmatic Programmer"** by David Thomas
2. **"System Design Interview"** by Alex Xu  
3. **"Atomic Habits"** by James Clear

## Technical Books 💻
- **"You Don't Know JS"** series by Kyle Simpson
- **"Designing Data-Intensive Applications"** by Martin Kleppmann  
- **"Clean Architecture"** by Robert C. Martin
- **"Refactoring"** by Martin Fowler

## Reading Goals
- **Target**: 24 books this year (2 per month)
- **Current**: 14 books completed
- **Behind by**: 4 books (need to catch up!)`,
      category: "personal",
      createdAt: "2024-09-22",
      updatedAt: "2024-09-22",
      isPinned: false,
      tags: ["books", "reading", "learning", "goals", "personal-development"]
    },
    {
      id: 5,
      title: "API Documentation - NoteFlow Backend",
      content: `# NoteFlow API Documentation

## Base URL
\`https://api.noteflow.com/v1\`

## Authentication
All API requests require authentication using Bearer tokens.

\`\`\`
Authorization: Bearer <your_token_here>
\`\`\`

## Endpoints

### User Authentication

#### POST /auth/login
Login with email and password.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

#### POST /auth/register
Create a new user account.

### Notes Management

#### GET /notes
Retrieve all notes for authenticated user.

#### POST /notes
Create a new note.

#### GET /notes/:id
Retrieve a specific note by ID.

#### PUT /notes/:id
Update an existing note.

#### DELETE /notes/:id
Delete a note permanently.`,
      category: "work",
      createdAt: "2024-09-21",
      updatedAt: "2024-09-24",
      isPinned: false,
      tags: ["api", "documentation", "backend", "reference"]
    }]
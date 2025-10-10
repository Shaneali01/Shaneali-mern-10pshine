export const mockNotes = [
  {
    id: 1,
    title: "Project Meeting Notes",
    content: `<h1>Q4 Planning Meeting</h1><p>Discussed the following key points for the upcoming quarter:</p><ul><li>Launch new feature by end of October</li><li>Increase team capacity by 20%</li><li>Focus on user experience improvements</li></ul><p><strong>Action items:</strong> Review design mockups and schedule follow-up meeting with stakeholders.</p><p><em>Next meeting scheduled for next Monday at 2 PM.</em></p>`,
    category: "work",
    tags: ["meeting", "planning", "q4", "important"],
    isPinned: true,
    updatedAt: "2025-10-05T14:30:00.000Z"
  },
  {
    id: 2,
    title: "Learning React Hooks",
    content: `<h2>Understanding useState Hook</h2><p>The <code>useState</code> hook is fundamental for adding state to functional components in React.</p><h3>Key Concepts:</h3><ol><li>Always call hooks at the top level of your component</li><li>Don't call hooks inside loops, conditions, or nested functions</li><li>State updates are asynchronous</li></ol><p><strong>Example usage:</strong></p><pre><code>const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);</code></pre><p><em>Remember: Multiple useState calls are completely fine!</em></p>`,
    category: "learning",
    tags: ["react", "hooks", "javascript", "frontend"],
    isPinned: false,
    updatedAt: "2025-10-04T09:15:00.000Z"
  },
  {
    id: 3,
    title: "Weekend Plans",
    content: `<h2>This Weekend's Goals</h2><p>Things I want to accomplish:</p><ul><li>Visit the farmer's market early morning</li><li>Finish reading <strong>"Atomic Habits"</strong> - currently on chapter 8</li><li>Go for a morning jog in the park</li><li>Try cooking that new pasta recipe I saved</li><li>Call mom and catch up</li></ul><p>Also need to check out <a href="https://example.com/productivity">this article</a> about productivity tips.</p><p><em>Don't forget to relax too! 😊</em></p>`,
    category: "personal",
    tags: ["weekend", "goals", "lifestyle"],
    isPinned: false,
    updatedAt: "2025-10-03T18:45:00.000Z"
  },
  {
    id: 4,
    title: "Code Review Feedback - PR #234",
    content: `<h2>Pull Request Review</h2><p><strong>Overall Assessment:</strong> Great work on the implementation! The code is clean and well-structured.</p><h3>Suggestions for Improvement:</h3><ul><li>Add proper error handling for API calls in <code>fetchUserData()</code></li><li>Consider extracting the validation logic into a separate utility file</li><li>Update unit tests to cover the new edge cases</li><li>Add JSDoc comments for the main functions</li></ul><p><em>Status: Approved with minor changes requested</em></p><p>Once these small changes are made, we're good to merge! 🚀</p>`,
    category: "work",
    tags: ["code-review", "development", "feedback"],
    isPinned: false,
    updatedAt: "2025-10-02T11:20:00.000Z"
  },
  {
    id: 5,
    title: "Database Design Ideas",
    content: `<h1>New Feature Database Schema</h1><p>Planning the database structure for the upcoming notification system.</p><h2>Tables Required:</h2><ol><li><strong>notifications</strong> - Main notification table</li><li><strong>user_preferences</strong> - User notification settings</li><li><strong>notification_types</strong> - Types of notifications</li></ol><h3>Key Relationships:</h3><ul><li>Users can have multiple notifications (one-to-many)</li><li>Each notification has one type (many-to-one)</li><li>Users have one preference setting (one-to-one)</li></ul><p><code>CREATE TABLE notifications (id, user_id, type_id, message, created_at)</code></p><p><em>Need to discuss indexing strategy with the team.</em></p>`,
    category: "work",
    tags: ["database", "design", "planning"],
    isPinned: true,
    updatedAt: "2025-10-01T16:00:00.000Z"
  },
  {
    id: 6,
    title: "Book Notes: Atomic Habits",
    content: `<h2>Chapter 5: The Best Way to Start a New Habit</h2><p><strong>Main Idea:</strong> Implementation intentions - a plan you make beforehand about when and where to act.</p><h3>Key Takeaways:</h3><ul><li>Use the formula: <em>"I will [BEHAVIOR] at [TIME] in [LOCATION]"</em></li><li>Habit stacking: attaching new habits to existing ones</li><li>Make it obvious, attractive, easy, and satisfying</li></ul><p><strong>Personal Application:</strong></p><ol><li>I will exercise at 6 AM in my bedroom</li><li>After I pour my coffee, I will meditate for 5 minutes</li><li>When I close my laptop, I will write in my journal</li></ol><p><em>Small changes lead to remarkable results!</em></p>`,
    category: "learning",
    tags: ["books", "habits", "self-improvement", "notes"],
    isPinned: false,
    updatedAt: "2025-09-30T20:30:00.000Z"
  },
  {
    id: 7,
    title: "Grocery Shopping List",
    content: `<h2>Weekly Grocery List</h2><h3>Vegetables & Fruits:</h3><ul><li>Tomatoes</li><li>Spinach</li><li>Bananas</li><li>Apples (organic)</li><li>Avocados</li></ul><h3>Pantry Items:</h3><ul><li>Olive oil</li><li>Pasta</li><li>Rice (basmati)</li><li>Canned beans</li></ul><h3>Dairy & Proteins:</h3><ul><li>Greek yogurt</li><li>Eggs (dozen)</li><li>Chicken breast</li><li>Cheese (cheddar)</li></ul><p><strong>Don't forget:</strong> Reusable bags! 🛍️</p><p><em>Budget: Try to keep it under $150</em></p>`,
    category: "personal",
    tags: ["shopping", "grocery", "food"],
    isPinned: false,
    updatedAt: "2025-09-29T10:15:00.000Z"
  },
  {
    id: 8,
    title: "JavaScript Tips & Tricks",
    content: `<h1>Useful JavaScript Patterns</h1><h2>1. Array Destructuring</h2><pre><code>const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // [3, 4, 5]</code></pre><h2>2. Optional Chaining</h2><pre><code>const userName = user?.profile?.name ?? 'Guest';</code></pre><h2>3. Template Literals</h2><pre><code>const greeting = \`Hello, \${name}! Today is \${day}.\`;</code></pre><h3>Key Benefits:</h3><ul><li>Cleaner, more readable code</li><li>Reduces bugs and errors</li><li>Better performance in many cases</li></ul><p><strong>Pro tip:</strong> Use these patterns consistently across your codebase!</p>`,
    category: "learning",
    tags: ["javascript", "coding", "tips", "webdev"],
    isPinned: false,
    updatedAt: "2025-09-28T14:45:00.000Z"
  }
  
];
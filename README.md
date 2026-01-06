COURSEMATCH

CourseMatch is a university course recommendation platform that helps students identify which courses they actually qualify for and guides them toward the best-fit academic 
choices using a combination of deterministic admission logic and AI-driven recommendations.



PROBLEM STATEMENT

Many students struggle to choose the right university course due to a combination of structural admission rules and lack of personalized guidance.

Universities primarily evaluate students based on qualification criteria such as APS scores, matric endorsements, and subject prerequisites.
While this determines whether a student is eligible for a course, it does not assess whether the course is suitable for the student as an individual.

As a result, students face several challenges:

1 Limited understanding of APS calculations, matric endorsements, and subject prerequisite requirements
2 Complex and often inconsistent admission criteria across different universities
3 Course choices driven by popularity, pressure, or perceived status rather than personal strengths and goals
4 Late realization that they either do not qualify for a chosen course or are poorly matched to it

These challenges frequently lead to rejection, academic underperformance, dissatisfaction, or course switching after enrollment



SOLUTION OVERVIEW

CourseMatch addresses this problem through a structured and intelligent decision-support workflow that separates academic eligibility from personal suitability.

1 Students enter their Grade 12 subjects and final marks
2 The system automatically computes key academic information, including:
  -APS score
  -Matric endorsement
  -Subject and mark profiles

When a student selects a specific university, CourseMatch applies deterministic, university-specific qualification rules to:

1 Validate endorsement requirements
2 Check subject prerequisites and minimum marks
3 Filter only the courses the student formally qualifies for

Students then provide personal details such as aspirations, interests, strengths, and weaknesses etc

An AI-driven recommendation layer evaluates the qualified courses:
1 Assigns suitability scores
2 Explains which options best align with the student’s personal profile

This approach ensures that students make realistic, compliant, and personalized academic decisions, without violating institutional admission requirements.



CORE FEATURES

Academic Qualification Filtering (Deterministic Logic)
 -APS-based course filtering
 -Automatic matric endorsement computation and validation
 -Subject prerequisite verification
 -Minimum mark enforcement per subject
 -University-specific qualification rules applied per institution

Ensures students only see courses they formally qualify for, based on institutional admission criteria
This layer is entirely rule-based and independent of AI or conversational interfaces.

AI-Guided Course Recommendations
Operates only on courses the student qualifies for and ranks qualified courses using:
 -Student aspirations and long-term goals
 -Academic and personal strengths and weaknesses
 -Personal interests and preferences

Generates suitability scores for each course
Provides clear explanations behind each recommendation
Supports confident, informed, and realistic course selection
The AI layer enhances decision-making but does not override academic qualification rules.

Conversational Assistant (Rasa Chatbot – Optional Support)

Provides customer-support-style assistance
Answers admission, course, and platform-related questions
Assists students during navigation and data entry
Improves accessibility and overall user experience
Operates independently of the core qualification and recommendation logic
Students can fully use CourseMatch without the chatbot; the assistant serves as a support and guidance layer, not a requirement.



TARGET USERS

-High school learners seeking university admission
-University students considering a course change
-Gap-year or stay-at-home individuals planning to enroll
-Career switchers entering higher education



SYSTEM ARCHITECTURE (High-Level)

User → Web Interface / Chatbot
     → Qualification Engine (Deterministic Rules)
     → AI Recommendation Layer
     → Course Ranking & Explanations
     → User
The system cleanly separates rule-based admission logic from AI-driven guidance, ensuring accuracy and transparency.


TECH STACK

Frontend: HTML, CSS, JavaScript, React.js
Backend: Express.js, Node.js, JavaScript, Python, N8N
Chatbot:  Rasa (NLU & dialogue management)
Databas: MySql



FUTURE IMPROVEMENTS & ROADMAP

Planned improvements focus on system robustness, accuracy, scalability, and maintainability:

1 Expanded University Rule Engine
  -Model additional universities using a standardized, configurable rule engine to support varying APS calculations, 
   endorsement rules, subject prerequisites, and minimum mark requirements.

2 Rule Configuration & Validation Layer
   -Introduce schema-based validation and configuration files to manage university admission rules more safely and consistently.

3 Improved AI Recommendation Quality
   -Enhance suitability scoring by refining feature weighting, improving prompt structure, and incorporating more contextual
    student attributes for clearer and more consistent explanations.

4 Hybrid Recommendation Logic
   -Combine deterministic scoring with AI-based reasoning to improve transparency, explainability, and reproducibility of recommendations.

5 Performance Optimization
   -Optimize filtering and scoring pipelines to handle larger datasets as university and course coverage increases.

6 Improved Error Handling & Data Validation
   -Strengthen input validation, edge-case handling, and user feedback for invalid or incomplete academic data.

7 System Modularity & Maintainability
   -Further decouple qualification logic, recommendation logic, and user interaction layers to improve testability and long-term maintainability.

8 Automated Testing
  -Add unit and integration tests for qualification rules, APS calculations, and recommendation outputs to ensure correctness as the system evolves.



PROJECT STATUS

Status: Prototype / MVP
Focus: Academic qualification accuracy + AI guidance
Stage: Actively evolving



AUTHOR

Developed by Lekoloane Nape Percy
Computer Science Graduate

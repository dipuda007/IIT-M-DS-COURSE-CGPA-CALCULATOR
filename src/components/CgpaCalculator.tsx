
import React, { useState, useMemo } from 'react';
import { COURSES } from '../constants/courseData';
import { Grade, GRADE_POINTS } from '../types/index';

type CourseGrades = { [courseName: string]: Grade };

const motivationalMessages: Record<string, string[]> = {
    '0-4': ["Let's get those numbers up!", "Every expert was once a beginner.", "The journey of a thousand miles begins with a single step."],
    '4-5': ["Bro, you are cooked.", "Houston, we have a problem.", "It's not over until it's over. Keep fighting!"],
    '5-6': ["Girls don't like boys under 6ft, you think they're gonna like your under 6 grades?", "A 6 is within reach, push for it!", "You're on the verge of a comeback."],
    '6-7': ["Improve your grades and enter Thala's region for a reason.", "Good, but why settle for good when great is an option?", "You're building a solid foundation."],
    '7-8': ["You are close to achieving the great 8, put your efforts in and reach there!", "Thala for a reason! Almost at an 8!", "Consistency is key. You're doing great!"],
    '8-9': ["You're already great, just a little bit more and you will become the greatest.", "Excellent work! The 9.0 club is waiting.", "You're in the big leagues now!"],
    '9-10': ["I don't know what you are doing here, btw congrats in advance on becoming a CEO.", "Are you even real? Incredible!", "Just here to verify your genius? Carry on."],
};

const getMotivationalMessage = (cgpa: number): string => {
    let range: string;
    if (cgpa > 0 && cgpa < 4) range = '0-4';
    else if (cgpa >= 4 && cgpa < 5) range = '4-5';
    else if (cgpa >= 5 && cgpa < 6) range = '5-6';
    else if (cgpa >= 6 && cgpa < 7) range = '6-7';
    else if (cgpa >= 7 && cgpa < 8) range = '7-8';
    else if (cgpa >= 8 && cgpa < 9) range = '8-9';
    else if (cgpa >= 9 && cgpa <= 10) range = '9-10';
    else return '';

    const messages = motivationalMessages[range];
    return messages[Math.floor(Math.random() * messages.length)];
};


const CgpaCalculator: React.FC = () => {
  const [grades, setGrades] = useState<CourseGrades>({});

  const handleGradeChange = (courseName: string, grade: string) => {
    if (grade === '') {
      const newGrades = { ...grades };
      delete newGrades[courseName];
      setGrades(newGrades);
    } else {
      setGrades((prev) => ({
        ...prev,
        [courseName]: grade as Grade,
      }));
    }
  };

  const { cgpa, totalCredits } = useMemo(() => {
    const selectedCourseNames = Object.keys(grades);
    if (selectedCourseNames.length === 0) {
      return { cgpa: '0.00', totalCredits: 0 };
    }

    let totalWeightedPoints = 0;
    let currentTotalCredits = 0;

    selectedCourseNames.forEach(courseName => {
      const course = COURSES.find(c => c.name === courseName);
      const grade = grades[courseName];

      if (course && grade) {
        const gradePoint = GRADE_POINTS[grade];
        totalWeightedPoints += gradePoint * course.credits;
        currentTotalCredits += course.credits;
      }
    });
    
    const calculatedCgpa = currentTotalCredits > 0 
      ? (totalWeightedPoints / currentTotalCredits).toFixed(2) 
      : '0.00';
    
    return { cgpa: calculatedCgpa, totalCredits: currentTotalCredits };
  }, [grades]);
  
  const coursesByLevel = useMemo(() => {
      const grouped: { [level: string]: typeof COURSES } = {};
      COURSES.forEach(course => {
          if (!grouped[course.level]) {
              grouped[course.level] = [];
          }
          grouped[course.level].push(course);
      });
      return grouped;
  }, []);

  const motivationalMessage = useMemo(() => {
    if (totalCredits === 0) return '';
    return getMotivationalMessage(parseFloat(cgpa));
  }, [cgpa, totalCredits]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Your CGPA</h2>
            <p className="text-gray-400">Select your grades below to calculate.</p>
        </div>
        <div className="text-center">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                {cgpa}
            </div>
            <p className="text-gray-400 text-sm mt-1">{totalCredits} credits selected</p>
            <p className="text-gray-400 text-xs mt-2 min-h-[16px] italic">
                {motivationalMessage}
            </p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(coursesByLevel).map(([level, courses]) => (
            <div key={level}>
                <h3 className="text-xl font-semibold text-purple-400 mb-3 border-b-2 border-purple-800 pb-2">{level} Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course.name} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                    <label htmlFor={course.name} className="text-gray-300 text-sm">
                        {course.name}
                    </label>
                    <select
                        id={course.name}
                        value={grades[course.name] || ''}
                        onChange={(e) => handleGradeChange(course.name, e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-purple-500 w-20"
                    >
                        <option value="">N/A</option>
                        {Object.keys(GRADE_POINTS).map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                        ))}
                    </select>
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CgpaCalculator;
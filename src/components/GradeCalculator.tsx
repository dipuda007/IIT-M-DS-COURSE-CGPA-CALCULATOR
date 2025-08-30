import React, { useState, useMemo, useCallback } from 'react';
import { COURSES } from '../constants/courseData';
import { AssessmentComponent, Scores, Grade, GRADE_MIN_SCORES } from '../types/index';

const GradeCalculator: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'Foundation' | 'Diploma' | 'Degree'>('Foundation');

  const coursesForSelectedLevel = useMemo(
    () => COURSES.filter((c) => c.level === selectedLevel && c.hasEndTerm),
    [selectedLevel]
  );

  const [selectedCourseName, setSelectedCourseName] = useState<string>(
    () => coursesForSelectedLevel[0]?.name || ''
  );
  
  const [scores, setScores] = useState<Scores>({});
  const [targetGrade, setTargetGrade] = useState<Grade>('B');
  const [result, setResult] = useState<string | number | null>(null);

  
  const selectedCourse = useMemo(
    () => COURSES.find((c) => c.name === selectedCourseName),
    [selectedCourseName]
  );

  const handleLevelChange = useCallback((newLevel: 'Foundation' | 'Diploma' | 'Degree') => {
    setSelectedLevel(newLevel);
    const firstCourseInNewLevel = COURSES.find(c => c.level === newLevel && c.hasEndTerm);
    setSelectedCourseName(firstCourseInNewLevel?.name || '');
    setScores({});
    setResult(null);
  }, []);

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseName(event.target.value);
    setScores({});
    setResult(null);
  };

  const handleScoreChange = (component: keyof typeof AssessmentComponent, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value);
    setScores((prev) => ({
      ...prev,
      [component]: isNaN(numericValue) ? 0 : Math.max(0, Math.min(100, numericValue)),
    }));
  };

  const calculateRequiredScore = useCallback(() => {
    if (!selectedCourse) return;

    const targetScore = GRADE_MIN_SCORES[targetGrade];
    let requiredET = -1;

    for (let etScore = 0; etScore <= 100; etScore += 0.1) {
      const currentScores = { ...scores, ET: etScore, F: etScore }; // F and ET are aliases for end term
      const totalScore = selectedCourse.calculateTotal(currentScores);
      if (totalScore >= targetScore) {
        requiredET = etScore;
        break;
      }
    }

    if (requiredET !== -1) {
      setResult(Math.ceil(requiredET));
    } else {
      setResult('Impossible to achieve this grade.');
    }
  }, [selectedCourse, scores, targetGrade]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border border-gray-700">
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-300 mb-2">
          Select Level
        </label>
        <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 border border-gray-700">
          {(['Foundation', 'Diploma', 'Degree'] as const).map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`w-full py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                selectedLevel === level
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="course-select" className="block text-lg font-medium text-gray-300 mb-2">
          Select Course
        </label>
        <select
          id="course-select"
          value={selectedCourseName}
          onChange={handleCourseChange}
          className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={coursesForSelectedLevel.length === 0}
        >
          {coursesForSelectedLevel.length === 0 && <option>No courses with End Term Exam</option>}
          {coursesForSelectedLevel.map((course) => (
            <option key={course.name} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {selectedCourse.components.map((component) => (
              <div key={component}>
                <label htmlFor={component} className="block text-sm font-medium text-gray-400 mb-1">
                  {AssessmentComponent[component]}
                </label>
                <input
                  type="number"
                  id={component}
                  value={scores[component] || ''}
                  onChange={(e) => handleScoreChange(component, e.target.value)}
                  placeholder="Enter score (0-100)"
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                  max="100"
                />
              </div>
            ))}
            <div>
              <label htmlFor="target-grade" className="block text-sm font-medium text-gray-400 mb-1">
                Target Grade
              </label>
              <select
                id="target-grade"
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value as Grade)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Object.keys(GRADE_MIN_SCORES).map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateRequiredScore}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Calculate End Term Score
          </button>
        </>
      )}

      {result !== null && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg text-center border border-gray-600">
          <h3 className="text-xl font-semibold text-gray-300">Result</h3>
          {typeof result === 'number' ? (
            <p className="text-3xl font-bold text-green-400 mt-2">
              You need at least <span className="text-4xl">{result}</span> in the End Term Exam to get a '{targetGrade}' grade.
            </p>
          ) : (
            <p className="text-3xl font-bold text-red-400 mt-2">{result}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;

// components/calculators/GPACalculator.tsx
"use client";

import { useState } from "react";
import ResultBox from "@/components/common/ResultBox";

const GRADE_POINTS: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0,
};

const FAQ_DATA = [
    { q: "What is GPA and how is it calculated?", a: "GPA (Grade Point Average) is calculated by dividing total grade points earned by total credit hours attempted. Grade points = Grade value × Credit hours. Example: A (4.0) in 3-credit course = 12 grade points." },
    { q: "What is a good GPA?", a: "Generally: 3.5-4.0 = Excellent, 3.0-3.4 = Good, 2.5-2.9 = Average, Below 2.5 = Needs improvement. Ivy League graduate schools often expect 3.5+." },
    { q: "How to calculate GPA from percentage?", a: "Convert percentage to grade points using your institution's scale. Common scale: 90-100% = A (4.0), 80-89% = B (3.0), 70-79% = C (2.0), etc. Our calculator supports direct grade entry." },
];

export default function GPACalculator() {
    const [courses, setCourses] = useState([{ grade: "A", credits: "3" }]);
    const [result, setResult] = useState<any>(null);

    const addCourse = () => setCourses([...courses, { grade: "A", credits: "3" }]);
    const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));
    const updateCourse = (index: number, field: string, value: string) => {
        const updated = [...courses];
        updated[index] = { ...updated[index], [field]: value };
        setCourses(updated);
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const credits = parseFloat(course.credits);
            const gradePoint = GRADE_POINTS[course.grade] || 0;
            if (!isNaN(credits) && credits > 0) {
                totalPoints += gradePoint * credits;
                totalCredits += credits;
            }
        });

        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        let letterGrade = "";
        if (gpa >= 3.5) letterGrade = "A/A+";
        else if (gpa >= 3.0) letterGrade = "B+";
        else if (gpa >= 2.5) letterGrade = "B";
        else if (gpa >= 2.0) letterGrade = "C";
        else if (gpa >= 1.5) letterGrade = "D";
        else letterGrade = "F";

        setResult({ gpa: gpa.toFixed(2), letterGrade, totalCredits, totalPoints: totalPoints.toFixed(2) });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-semibold">Course Details</h3>
                    <button onClick={addCourse} className="px-3 py-1 text-sm bg-blue-500 rounded-lg hover:bg-blue-600">+ Add Course</button>
                </div>
                <div className="p-6 space-y-3">
                    {courses.map((course, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <select value={course.grade} onChange={(e) => updateCourse(i, "grade", e.target.value)} className="flex-1 px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm">
                                {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <div className="relative w-24">
                                <input type="number" placeholder="3" value={course.credits} onChange={(e) => updateCourse(i, "credits", e.target.value)} className="w-full px-3 py-2 bg-[#0f1525] border border-gray-700 rounded-lg text-white text-sm" />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">cr</span>
                            </div>
                            {courses.length > 1 && <button onClick={() => removeCourse(i)} className="px-2 py-2 text-red-400 hover:text-red-300">✕</button>}
                        </div>
                    ))}
                    <button onClick={calculate} className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold">Calculate GPA →</button>
                </div>
            </div>

            <ResultBox title="Your GPA" isEmpty={!result} emptyIcon="📚" emptyText="Add courses and calculate GPA" mainResult={result ? { label: "Cumulative GPA", value: result.gpa, color: "text-purple-400" } : undefined} extraRows={result ? [{ label: "Letter Grade", value: result.letterGrade }, { label: "Total Credits", value: result.totalCredits }, { label: "Total Grade Points", value: result.totalPoints }] : undefined} />
        </div>
    );
}
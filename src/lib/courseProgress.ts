'use server';
import { promises as fs } from 'fs';
import path from 'path';
import { Course, CourseProgress, User } from './types/course';

const usersFilePath = path.join(process.cwd(), 'src/lib/data/users.json');

export async function getUsers(): Promise<User[]> {
  try {
    const fileContent = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
  }
}

export async function getCourseProgress(userEmail: string): Promise<CourseProgress> {
  const users = await getUsers();
  const user = users.find(u => u.email === userEmail);
  return user?.courseProgress || {};
}

export async function updateCourseProgress(
  userEmail: string, 
  courseId: string, 
  videoId: string, 
  isCompleted: boolean
): Promise<void> {
  const users = await getUsers();
  const userIndex = users.findIndex(u => u.email === userEmail);
  
  if (userIndex === -1) return;
  
  if (!users[userIndex].courseProgress) {
    users[userIndex].courseProgress = {};
  }
  
  if (!users[userIndex].courseProgress[courseId]) {
    users[userIndex].courseProgress[courseId] = {
      completedVideos: [],
      progressPercentage: 0,
      lastAccessed: new Date().toISOString()
    };
  }
  
  const courseProgress = users[userIndex].courseProgress[courseId];
  
  if (isCompleted) {
    if (!courseProgress.completedVideos.includes(videoId)) {
      courseProgress.completedVideos.push(videoId);
    }
  } else {
    courseProgress.completedVideos = courseProgress.completedVideos.filter(id => id !== videoId);
  }
  
  // Calculate progress percentage
  const courses = await getCourses();
  const course = courses.find(c => c.id === courseId);
  if (course) {
    courseProgress.progressPercentage = Math.round(
      (courseProgress.completedVideos.length / course.totalVideos) * 100
    );
  }
  
  courseProgress.lastAccessed = new Date().toISOString();
  
  await saveUsers(users);
}

export async function getCourses(): Promise<Course[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/lesson.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading courses file:', error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find(course => course.id === courseId) || null;
}

export async function getCoursesByCategory(category: string): Promise<Course[]> {
  const courses = await getCourses();
  return courses.filter(course => course.category === category);
}

export async function calculateCourseProgress(course: Course, completedVideos: string[]): Promise<number> {
  return Math.round((completedVideos.length / course.totalVideos) * 100);
}

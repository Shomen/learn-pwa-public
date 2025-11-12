export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  videourl: string;
}

export interface Course {
  id: string;
  coursename: string;
  heading: string;
  description: string;
  videourl: string;
  category: string;
  package: string;
  duration: string;
  totalVideos: number;
  videos: Video[];
}

export interface CourseProgress {
  [courseId: string]: {
    completedVideos: string[];
    progressPercentage: number;
    lastAccessed: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  courseProgress: CourseProgress;
}

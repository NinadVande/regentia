/**
 * Learning Service for Regentia Health & Research LMS
 * Provides mock service functions that manipulate user-isolated course progress
 * using localStorage under `learning_{email}` keys.
 * Designed to easily transition to API calls to a Spring Boot backend.
 */

export interface LearningCourse {
  id: string;
  title: string;
  description: string;
  purchaseDate: string;
  status: 'Active' | 'Completed';
  progress: number; // 0 to 100
  duration: string;
  instructor: string;
  iconName: string;
}

export interface LearningStats {
  totalEnrolled: number;
  activeCourses: number;
  completedCourses: number;
  averageProgress: number;
}

// Simulated network latency (600ms)
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export const learningService = {
  /**
   * Fetch courses purchased by the user.
   * Format: localstorage key learning_email
   */
  async getCourses(email: string): Promise<LearningCourse[]> {
    await delay(500);
    if (!email) return [];
    
    const key = `learning_${email.toLowerCase().trim()}`;
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    try {
      return JSON.parse(data) as LearningCourse[];
    } catch (e) {
      console.error('Failed to parse learning courses', e);
      return [];
    }
  },

  /**
   * Enroll a user in a course (triggered on successful purchase/verification).
   * Ensures no duplicates.
   */
  async enrollCourse(
    email: string,
    courseData: {
      id: string;
      title: string;
      description: string;
      duration?: string;
      instructor?: string;
      iconName?: string;
    }
  ): Promise<boolean> {
    await delay(600);
    if (!email) return false;
    
    const key = `learning_${email.toLowerCase().trim()}`;
    const currentCourses = await this.getCourses(email);
    
    // Check if duplicate
    const exists = currentCourses.some(c => c.id === courseData.id || c.title.toLowerCase() === courseData.title.toLowerCase());
    if (exists) {
      return false; // Already enrolled
    }

    const newCourse: LearningCourse = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      purchaseDate: new Date().toISOString(),
      status: 'Active',
      progress: 0,
      duration: courseData.duration || '8 weeks',
      instructor: courseData.instructor || 'Dr. Harshwardhan Ramteke',
      iconName: courseData.iconName || 'BookOpen'
    };

    const updated = [...currentCourses, newCourse];
    localStorage.setItem(key, JSON.stringify(updated));
    return true;
  },

  /**
   * Retrieve statistics for the user dashboard.
   */
  async getStats(email: string): Promise<LearningStats> {
    const courses = await this.getCourses(email);
    if (courses.length === 0) {
      return {
        totalEnrolled: 0,
        activeCourses: 0,
        completedCourses: 0,
        averageProgress: 0
      };
    }

    const active = courses.filter(c => c.status === 'Active').length;
    const completed = courses.filter(c => c.status === 'Completed').length;
    const totalProgress = courses.reduce((sum, c) => sum + c.progress, 0);

    return {
      totalEnrolled: courses.length,
      activeCourses: active,
      completedCourses: completed,
      averageProgress: Math.round(totalProgress / courses.length)
    };
  }
};

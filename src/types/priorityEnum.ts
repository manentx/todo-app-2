export enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

/**
 * Associates a number to a priority
 * @param priority 
 * @returns 
 */
export function getPriorityNumber(priority: Priority): number {
  switch(priority) {
    case Priority.HIGH:
      return 2;
    case Priority.MEDIUM:
      return 1;
    case Priority.LOW:
      return 0;
  }
}

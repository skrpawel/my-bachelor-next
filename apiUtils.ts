import axios from "axios";

interface CalendarEvent {
  date: number | string;
  type: string;
  duration: string;
  distance: string;
  userId: number;
}

export const postWorkout = async (workoutData: CalendarEvent) => {
  try {
    const response = await axios.post("/api/workout/add", workoutData);
    return response.data;
  } catch (error) {
    console.error("Error posting workout:", error);
    return "";
  }
};

export const updateWorkout = async (id: string, workoutData: CalendarEvent) => {
  try {
    const response = await axios.put(
      `/api/workout/update?id=${id}`,
      workoutData
    );

    return response.data;
  } catch (error) {
    console.error("Error posting workout:", error);
    return "";
  }
};

export const deleteWorkout = async (workoutId: number) => {
  try {
    await axios.delete("/api/workout/remove", {
      params: { id: workoutId },
    });
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
};

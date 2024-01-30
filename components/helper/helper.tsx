export const calculatePace = (distance: string, duration: string) => {
  const time = duration.split(":");
  const hours = parseInt(time[0]) || 0;
  const minutes = parseInt(time[1]) || 0;
  const seconds = parseInt(time[2]) || 0;

  // Calculate total time in minutes.
  const totalTimeInMinutes = hours * 60 + minutes + seconds / 60;

  // Handle case where distance is zero or not a number.
  const distanceFloat = parseFloat(distance);
  if (isNaN(distanceFloat) || distanceFloat === 0) {
    return "Invalid distance";
  }

  // Calculate pace.
  const pacePerUnit = totalTimeInMinutes / distanceFloat;

  // Convert pace to minutes and seconds.
  const paceMinutes = Math.floor(pacePerUnit);
  const paceSeconds = Math.round((pacePerUnit - paceMinutes) * 60);

  // Format the result.
  const formattedSeconds = paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds;
  return `${paceMinutes}:${formattedSeconds}`;
};

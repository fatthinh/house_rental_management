// import { Payment } from "@/types/type";

// export const sortRides = (rides: Ride[]): Ride[] => {
//   const result = rides.sort((a, b) => {
//     const dateA = new Date(`${a.created_at}T${a.ride_time}`);
//     const dateB = new Date(`${b.created_at}T${b.ride_time}`);
//     return dateB.getTime() - dateA.getTime();
//   });

//   return result.reverse();
// };

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
}

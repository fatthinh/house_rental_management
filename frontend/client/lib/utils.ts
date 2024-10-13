// import { Payment } from "@/types/type";

// export const sortRides = (rides: Ride[]): Ride[] => {
//   const result = rides.sort((a, b) => {
//     const dateA = new Date(`${a.created_at}T${a.ride_time}`);
//     const dateB = new Date(`${b.created_at}T${b.ride_time}`);
//     return dateB.getTime() - dateA.getTime();
//   });

//   return result.reverse();
// };

// export function formatTime(minutes: number): string {
//   const formattedMinutes = +minutes?.toFixed(0) || 0;

//   if (formattedMinutes < 60) {
//     return `${minutes} min`;
//   } else {
//     const hours = Math.floor(formattedMinutes / 60);
//     const remainingMinutes = formattedMinutes % 60;
//     return `${hours}h ${remainingMinutes}m`;
//   }
// }

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   const day = date.getDate();
//   const year = date.getFullYear();
//   const month = date.getMonth();

//   return `${day < 10 ? "0" + day : day}/${
//     month < 10 ? "0" + month : month
//   }/${year}`;
// }

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("en-GB");
  return `${time} - ${formattedDate}`;
};

export const timeDifference = (timestamp: string | Date): string => {
  const now: Date = new Date();
  const past: Date = new Date(timestamp);

  const diffInSeconds: number = Math.floor(
    (now.getTime() - past.getTime()) / 1000
  );
  const diffInMinutes: number = Math.floor(diffInSeconds / 60);
  const diffInHours: number = Math.floor(diffInMinutes / 60);
  const diffInDays: number = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ`;
  } else {
    return `${diffInDays} ngày`;
  }
};

// interface AdSlotProps {
//   format?: "horizontal" | "vertical" | "rectangle";
//   className?: string;
// }

// export default function AdSlot({ format = "horizontal", className = "" }: AdSlotProps) {
//   const dimensions = {
//     horizontal: "w-full h-[90px]",
//     vertical: "w-[300px] h-[250px]",
//     rectangle: "w-full h-[280px]",
//   };

//   return (
//     <div className={`${dimensions[format]} ${className}`}>
//       <div className="w-full h-full bg-[#151c30] border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
//         {/* <span className="text-xs text-gray-500 tracking-wider">[ Advertisement – Google AdSense ]</span> */}
//       </div>
//     </div>
//   );
// }
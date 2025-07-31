import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-white">
        <div className="w-10 h-10 border-4 border-white border-dashed rounded-full animate-spin" />
        <p className="text-lg font-semibold">Fetching places...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;

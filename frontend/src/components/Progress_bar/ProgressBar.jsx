import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
const ProgressBar = ({ isMediaUplaoding, progress }) => {
  const [showProgress, setshowProgress] = useState(false);
  const [animatedProgress, setanimatedProgress] = useState(0);

  useEffect(() => {
    if (isMediaUplaoding) {
      setshowProgress(true);
      setanimatedProgress(progress);
    } else {
      const timer = setTimeout(() => {
        setshowProgress(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMediaUplaoding, progress]);

  if (!showProgress) return null;
  return (
    <div className="w-full mt-3 rounded-md h-2 bg-gray-200 mb-4 relative overflow-hidden">
      <motion.div
        className="bg-blue-300 h-2  rounded-md "
        initial={{ width: 0 }}
        animate={{
          width: `${animatedProgress}%`,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        {progress >= 100 && isMediaUplaoding && (
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 opacity-50"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
